import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SalesService } from './sales.service';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(
    private readonly usersService: UsersService,
    private readonly salesService: SalesService,
  ) {}

  async onApplicationBootstrap() {
    await this.seedUsers();
    await this.seedSales();
  }

  private async seedUsers() {
    const users = await this.usersService.findAll();
    if (users.length > 0) {
      console.log('Users already seeded.');
      return;
    }

    console.log('Seeding users...');
    await this.usersService.create('admin@example.com', 'admin123', 'admin');
    await this.usersService.create('user@example.com', 'user123', 'user');
    console.log('Users seeded successfully!');
  }

  private async seedSales() {
    const sales = await this.salesService.findAll();
    if (sales.length > 0) {
      console.log('Sales already seeded.');
      return;
    }

    console.log('Seeding sales...');
    const salesData = [
      {
        productName: 'Laptop XPS',
        amount: 1500.0,
        category: 'Electronics',
        customerEmail: 'customer1@gmail.com',
      },
      {
        productName: 'Monitor 4K',
        amount: 450.0,
        category: 'Electronics',
        customerEmail: 'customer2@gmail.com',
      },
      {
        productName: 'Gaming Chair',
        amount: 300.0,
        category: 'Furniture',
        customerEmail: 'customer3@gmail.com',
      },
      {
        productName: 'Keyboard Mech',
        amount: 120.0,
        category: 'Electronics',
        customerEmail: 'customer4@gmail.com',
      },
      {
        productName: 'Desk Lamp',
        amount: 45.0,
        category: 'Furniture',
        customerEmail: 'customer1@gmail.com',
      },
      {
        productName: 'Headphones',
        amount: 200.0,
        category: 'Electronics',
        customerEmail: 'customer5@gmail.com',
      },
      {
        productName: 'Office Chair',
        amount: 250.0,
        category: 'Furniture',
        customerEmail: 'customer2@gmail.com',
      },
      {
        productName: 'Smartphone Pro',
        amount: 999.99,
        category: 'Electronics',
        customerEmail: 'customer3@gmail.com',
      },
      {
        productName: 'Smart Watch',
        amount: 199.0,
        category: 'Electronics',
        customerEmail: 'customer4@gmail.com',
      },
      {
        productName: 'Bookshelf',
        amount: 150.0,
        category: 'Furniture',
        customerEmail: 'customer5@gmail.com',
      },
    ];

    for (const data of salesData) {
      await this.salesService.create(data);
    }
    console.log('Sales seeded successfully!');
  }
}
