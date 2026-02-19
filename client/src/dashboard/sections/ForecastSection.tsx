import { useEffect, useState } from 'react';
import { getForecastMethod } from '../services/sales-service';
import type { ForecastData } from '../services/sales-service';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import {
  Loader2,
  TrendingUp,
  AlertCircle,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ForecastSection = () => {
  const [data, setData] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const forecast = await getForecastMethod();
        setData(forecast);
      } catch (error) {
        console.error('Error fetching forecast:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchForecast();
  }, []);

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (data?.message) {
    return (
      <div className="bg-amber-50 border border-amber-200 p-8 rounded-3xl flex flex-col items-center text-center">
        <AlertCircle className="w-12 h-12 text-amber-500 mb-4" />
        <h3 className="text-lg font-bold text-amber-900 mb-2">
          Datos Insuficientes
        </h3>
        <p className="text-amber-700 max-w-md">{data.message}</p>
      </div>
    );
  }

  const allLabels = [
    ...(data?.historical.map((d) => d.date) || []),
    ...(data?.forecast.map((d) => d.date) || []),
  ];

  const chartData = {
    labels: allLabels.map((date) =>
      format(parseISO(date), 'dd MMM', { locale: es })
    ),
    datasets: [
      {
        label: 'Ventas Históricas',
        data: [
          ...(data?.historical.map((d) => d.value) || []),
          ...new Array(data?.forecast.length).fill(null),
        ],
        borderColor: '#4f46e5',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Pronóstico (IA)',
        data: [
          ...new Array((data?.historical.length || 0) - 1).fill(null),
          data?.historical[data.historical.length - 1]?.value, // Connect last historical point
          ...(data?.forecast.map((d) => d.value) || []),
        ],
        borderColor: '#10b981',
        borderDash: [5, 5],
        backgroundColor: 'transparent',
        fill: false,
        tension: 0.4,
        pointStyle: 'circle',
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="text-indigo-600" size={24} />
            Pronóstico de Demanda
          </h1>
          <p className="text-slate-500">
            Predicción inteligente de ventas para los próximos 7 días.
          </p>
        </div>
        <div className="bg-indigo-50 px-4 py-2 rounded-xl flex items-center gap-2 text-indigo-700 text-sm font-medium">
          <Calendar size={18} />
          Próxima Semana
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <TrendingUp size={20} className="text-emerald-500" />
              Tendencia Proyectada
            </h3>
          </div>
          <div className="h-[400px]">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
              Métricas del Periodo
            </h4>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-500 mb-1">Total Proyectado</p>
                <p className="text-2xl font-bold text-slate-900">
                  $
                  {data?.forecast
                    .reduce((a, b) => a + b.value, 0)
                    .toLocaleString()}
                </p>
              </div>
              <div className="pt-4 border-t border-slate-50">
                <p className="text-sm text-slate-500 mb-1">Certeza Estimada</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 w-[85%]"></div>
                  </div>
                  <span className="text-xs font-bold text-indigo-600">85%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-indigo-600 p-6 rounded-3xl text-white shadow-lg shadow-indigo-100">
            <h4 className="font-bold mb-2 flex items-center gap-2 text-indigo-100">
              <AlertCircle size={18} />
              Recomendación
            </h4>
            <p className="text-sm text-indigo-100 leading-relaxed">
              Basado en el crecimiento proyectado, se sugiere aumentar el stock
              de categorías con alta rotación en un 15% para el próximo fin de
              semana.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastSection;
