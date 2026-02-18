import { useEffect, useState } from 'react';
import { getAnalyticsMethod } from '../services/sales-service';
import type { AnalyticsData } from '../services/sales-service';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import {
  Loader2,
  DollarSign,
  ShoppingCart,
  BarChart3,
  TrendingUp,
} from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const AnalyticsSection = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const analytics = await getAnalyticsMethod();
        setData(analytics);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
      </div>
    );
  }

  const lineData = {
    labels: data?.revenueByDay.map((d) => d.date) || [],
    datasets: [
      {
        fill: true,
        label: 'Ingresos Diarios',
        data: data?.revenueByDay.map((d) => d.value) || [],
        borderColor: '#4f46e5',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const barData = {
    labels: data?.topProducts.map((p) => p.name) || [],
    datasets: [
      {
        label: 'Ingresos por Producto',
        data: data?.topProducts.map((p) => p.revenue) || [],
        backgroundColor: '#10b981',
        borderRadius: 8,
      },
    ],
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Análisis Detallado
        </h1>
        <p className="text-slate-500">
          Insights profundos sobre el rendimiento del negocio.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-4 text-indigo-600 mb-2">
            <DollarSign size={20} />
            <span className="text-sm font-medium text-slate-500">
              Ticket Promedio (AOV)
            </span>
          </div>
          <p className="text-2xl font-bold text-slate-900">
            ${data?.metrics.averageOrderValue.toFixed(2)}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-4 text-emerald-600 mb-2">
            <ShoppingCart size={20} />
            <span className="text-sm font-medium text-slate-500">
              Transacciones
            </span>
          </div>
          <p className="text-2xl font-bold text-slate-900">
            {data?.metrics.totalTransactions}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-4 text-amber-600 mb-2">
            <TrendingUp size={20} />
            <span className="text-sm font-medium text-slate-500">
              Ingreso Total
            </span>
          </div>
          <p className="text-2xl font-bold text-slate-900">
            ${data?.metrics.totalRevenue.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
            <BarChart3 size={20} className="text-indigo-600" />
            Evolución de Ingresos
          </h3>
          <div className="h-[350px]">
            <Line data={lineData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-emerald-600" />
            Top 5 Productos por Ingresos
          </h3>
          <div className="h-[350px]">
            <Bar
              data={barData}
              options={{ maintainAspectRatio: false, indexAxis: 'y' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSection;
