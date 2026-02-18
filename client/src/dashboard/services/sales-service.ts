import { apiClient } from '../../config/axios-config';

export interface Sale {
  id: number;
  productName: string;
  amount: number;
  category: string;
  date: string;
  customerEmail: string;
}

export interface SalesStats {
  totalRevenue: number;
  totalSales: number;
  categories: Record<string, number>;
  recentSales: Sale[];
}

export const getSalesMethod = async (): Promise<Sale[]> => {
  const response = await apiClient.get<Sale[]>('sales');
  return response.data;
};

export const getSalesStatsMethod = async (): Promise<SalesStats> => {
  const response = await apiClient.get<SalesStats>('sales/stats');
  return response.data;
};

export interface AnalyticsData {
  revenueByDay: { date: string; value: number }[];
  topProducts: { name: string; revenue: number }[];
  metrics: {
    totalRevenue: number;
    totalTransactions: number;
    averageOrderValue: number;
  };
}

export const getAnalyticsMethod = async (): Promise<AnalyticsData> => {
  const response = await apiClient.get<AnalyticsData>('sales/analytics');
  return response.data;
};
