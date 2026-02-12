import { StatCard } from '../components/StatCard';
import { useAuth } from '../../auth/context/AuthContext';

const OverviewSection = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Bienvenido de nuevo, {user?.email?.split('@')[0]}
        </h1>
        <p className="text-slate-500">
          Aquí tienes un resumen de la demanda actual y proyecciones.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Ventas totales"
          value="$128,430"
          trend="12.5%"
          trendUp={true}
          color="indigo"
          icon={
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
        />
        <StatCard
          title="Precisión Forecast"
          value="94.2%"
          trend="2.1%"
          trendUp={true}
          color="emerald"
          icon={
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
        />
        <StatCard
          title="SKUs Activos"
          value="1,204"
          trend="0.4%"
          trendUp={false}
          color="amber"
          icon={
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          }
        />
        <StatCard
          title="Alertas Stock"
          value="18"
          trend="5"
          trendUp={false}
          color="rose"
          icon={
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          }
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm min-h-[300px] flex flex-col items-center justify-center text-slate-400">
          <p>Gráfico de Tendencias (Placeholder)</p>
          <div className="mt-4 flex space-x-2">
            {[40, 70, 45, 90, 65, 80].map((h, i) => (
              <div
                key={i}
                className="w-8 bg-indigo-100 rounded-t-md"
                style={{ height: `${h}px` }}
              ></div>
            ))}
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm min-h-[300px] flex flex-col items-center justify-center text-slate-400">
          <p>Distribución por Categoría (Placeholder)</p>
          <div className="mt-4 w-32 h-32 rounded-full border-8 border-indigo-50 border-t-indigo-500 animate-spin-slow"></div>
        </div>
      </div>
    </div>
  );
};

export default OverviewSection;
