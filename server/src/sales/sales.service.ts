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

  private getWhereClause(userId: number, userRole: string) {
    return userRole === 'admin' ? {} : { uploadedById: userId };
  }

  async uploadFromCsv(
    fileBuffer: Buffer,
    uploadedById: number,
  ): Promise<{ count: number }> {
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
          uploadedById,
        });
      });

      await this.salesRepository.save(sales);
      return { count: sales.length };
    } catch (error: unknown) {
      if (error instanceof BadRequestException) throw error;
      const message =
        error instanceof Error ? error.message : 'Error desconocido';
      throw new BadRequestException(
        'Error al procesar el archivo CSV: ' + message,
      );
    }
  }

  async findAll(userId: number, userRole: string): Promise<Sale[]> {
    const where = this.getWhereClause(userId, userRole);
    return this.salesRepository.find({
      where,
      order: { date: 'DESC' },
    });
  }

  async getStats(userId: number, userRole: string) {
    const where = this.getWhereClause(userId, userRole);
    const sales = await this.salesRepository.find({
      where,
    });
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

  async create(saleData: Partial<Sale>, uploadedById: number): Promise<Sale> {
    const sale = this.salesRepository.create({
      ...saleData,
      uploadedById,
    });
    return this.salesRepository.save(sale);
  }

  async getAnalytics(userId: number, userRole: string) {
    const where = this.getWhereClause(userId, userRole);
    const sales = await this.salesRepository.find({
      where,
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

  async getForecast(userId: number, userRole: string) {
    const where = this.getWhereClause(userId, userRole);
    const sales = await this.salesRepository.find({
      where,
      order: { date: 'ASC' },
    });

    if (sales.length < 5) {
      return {
        forecast: [],
        message:
          'Se requieren al menos 5 registros de venta para generar un pronóstico confiable.',
      };
    }

    // 1. Group by day
    const dailyData: Record<string, number> = {};
    sales.forEach((sale) => {
      const dateStr = new Date(sale.date).toISOString().split('T')[0];
      dailyData[dateStr] = (dailyData[dateStr] || 0) + Number(sale.amount);
    });

    const sortedDates = Object.keys(dailyData).sort();
    const values = sortedDates.map((date) => dailyData[date]);

    // 2. Simple Moving Average (SMA) for next 7 points
    const windowSize = Math.min(values.length, 7);
    const forecast: { date: string; value: number }[] = [];
    const lastDate = new Date(sortedDates[sortedDates.length - 1]);

    for (let i = 1; i <= 7; i++) {
      const lastNValues = values.slice(-windowSize);
      const average = lastNValues.reduce((a, b) => a + b, 0) / windowSize;

      const nextDate = new Date(lastDate);
      nextDate.setDate(lastDate.getDate() + i);

      forecast.push({
        date: nextDate.toISOString().split('T')[0],
        value: Math.round(average * 100) / 100,
      });

      // Update values to include the new prediction for recursive forecasting (optional)
      values.push(average);
    }

    return {
      historical: sortedDates.map((date) => ({ date, value: dailyData[date] })),
      forecast,
    };
  }
}
