import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './entities/sale.entity';
import { parse } from 'csv-parse/sync';

interface SaleRecord {
  productName: string;
  amount: string;
  category: string;
  customerEmail?: string;
  date?: string;
}

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private salesRepository: Repository<Sale>,
  ) {}

  // ... (findAll, getStats, create, getAnalytics methods remain same)

  async uploadFromCsv(fileBuffer: Buffer): Promise<{ count: number }> {
    try {
      const records: SaleRecord[] = parse(fileBuffer, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
      });

      const sales = records.map((record) => {
        if (!record.productName || !record.amount || !record.category) {
          throw new BadRequestException(
            'Formato de CSV inválido: faltan campos obligatorios',
          );
        }
        return this.salesRepository.create({
          productName: record.productName,
          amount: parseFloat(record.amount),
          category: record.category,
          customerEmail: record.customerEmail || undefined,
          date: record.date ? new Date(record.date) : new Date(),
        });
      });

      await this.salesRepository.save(sales);
      return { count: sales.length };
    } catch (error: any) {
      if (error instanceof BadRequestException) throw error;
      throw new BadRequestException(
        'Error al procesar el archivo CSV: ' + error.message,
      );
    }
  }

  async findAll(): Promise<Sale[]> {
    return this.salesRepository.find({
      order: { date: 'DESC' },
    });
  }

  async getStats() {
    const sales = await this.salesRepository.find();
    const totalRevenue = sales.reduce(
      (sum, sale) => sum + Number(sale.amount),
      0,
    );
    const totalSales = sales.length;

    // Group by category
    const categories: Record<string, number> = {};
    sales.forEach((sale) => {
      categories[sale.category] =
        (categories[sale.category] || 0) + Number(sale.amount);
    });

    return {
      totalRevenue,
      totalSales,
      categories,
      recentSales: sales.slice(0, 5),
    };
  }

  async create(saleData: Partial<Sale>): Promise<Sale> {
    const sale = this.salesRepository.create(saleData);
    return this.salesRepository.save(sale);
  }

  async getAnalytics() {
    const sales = await this.salesRepository.find({
      order: { date: 'ASC' },
    });

    // 1. Time Series Data (Daily Revenue)
    const timeSeries: Record<string, number> = {};
    sales.forEach((sale) => {
      const dateStr = new Date(sale.date).toISOString().split('T')[0];
      timeSeries[dateStr] = (timeSeries[dateStr] || 0) + Number(sale.amount);
    });

    // 2. Top Products by Revenue
    const productStats: Record<string, number> = {};
    sales.forEach((sale) => {
      productStats[sale.productName] =
        (productStats[sale.productName] || 0) + Number(sale.amount);
    });
    const topProducts = Object.entries(productStats)
      .map(([name, revenue]) => ({ name, revenue }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    // 3. Metrics
    const totalRevenue = sales.reduce((sum, s) => sum + Number(s.amount), 0);
    const totalTransactions = sales.length;
    const averageOrderValue =
      totalTransactions > 0 ? totalRevenue / totalTransactions : 0;

    return {
      revenueByDay: Object.entries(timeSeries).map(([date, value]) => ({
        date,
        value,
      })),
      topProducts,
      metrics: {
        totalRevenue,
        totalTransactions,
        averageOrderValue,
      },
    };
  }
}
