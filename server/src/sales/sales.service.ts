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
}
