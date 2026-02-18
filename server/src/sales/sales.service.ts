import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './entities/sale.entity';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private salesRepository: Repository<Sale>,
  ) {}

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
