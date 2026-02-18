import { useEffect, useState } from 'react';
import { StatCard } from '../components/StatCard';
import { useAuth } from '../../auth/context/AuthContext';
import { getSalesStatsMethod } from '../services/sales-service';
import type { SalesStats, Sale } from '../services/sales-service';
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
  ArcElement,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  TrendingUp,
  ShoppingBag,
  Package,
  AlertCircle,
  Loader2,
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
  ArcElement
);

const OverviewSection = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<SalesStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getSalesStatsMethod();
        setStats(data);
      } catch (error) {
        console.error('Error fetching sales stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
      </div>
    );
  }

  const lineData = {
    labels:
      stats?.recentSales
        .map((s: Sale) => new Date(s.date).toLocaleDateString())
        .reverse() || [],
    datasets: [
      {
        label: 'Ventas Recientes',
        data: stats?.recentSales.map((s: Sale) => s.amount).reverse() || [],
        fill: false,
        borderColor: '#4f46e5',
        tension: 0.4,
      },
    ],
  };

  const doughnutData = {
    labels: Object.keys(stats?.categories || {}),
    datasets: [
      {
        data: Object.values(stats?.categories || {}),
        backgroundColor: [
          'rgba(79, 70, 229, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(244, 63, 94, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Bienvenido de nuevo, {user?.email?.split('@')[0]}
        </h1>
        <p className="text-slate-500">
          Este es el resumen operativo basado en datos reales del servidor.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Ingresos Totales"
          value={`$${stats?.totalRevenue.toLocaleString()}`}
          trend="Live"
          trendUp={true}
          color="indigo"
          icon={<TrendingUp size={24} />}
        />
        <StatCard
          title="Ventas Totales"
          value={stats?.totalSales.toString() || '0'}
          trend="+2"
          trendUp={true}
          color="emerald"
          icon={<ShoppingBag size={24} />}
        />
        <StatCard
          title="SKUs Activos"
          value="10"
          trend="Estable"
          trendUp={true}
          color="amber"
          icon={<Package size={24} />}
        />
        <StatCard
          title="Alertas Activas"
          value="0"
          trend="Ok"
          trendUp={true}
          color="rose"
          icon={<AlertCircle size={24} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-indigo-600" />
            Tendencia de Ventas
          </h3>
          <div className="h-[300px]">
            <Line data={lineData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
            <ShoppingBag size={20} className="text-emerald-600" />
            Distribución por Categoría
          </h3>
          <div className="h-[300px] flex justify-center">
            <Doughnut
              data={doughnutData}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewSection;
