import { useAuth } from '../../auth/context/AuthContext';
import { CreateUserForm } from './CreateUserForm';
import { useNavigate } from 'react-router-dom';

function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Dashboard Gerencial
          </h1>
          <p className="text-sm text-gray-500">Bienvenido, {user?.email}</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold uppercase">
            {user?.role}
          </span>
          <button
            onClick={handleLogout}
            className="text-gray-600 hover:text-red-600 transition-colors font-medium px-4 py-2 rounded-lg border border-gray-200 hover:border-red-200"
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Vista General
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <p className="text-gray-500 text-sm">Ventas Totales</p>
                <p className="text-2xl font-bold">$0.00</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <p className="text-gray-500 text-sm">Nuevos Clientes</p>
                <p className="text-2xl font-bold">0</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <p className="text-gray-500 text-sm">Proyectos Activos</p>
                <p className="text-2xl font-bold">0</p>
              </div>
            </div>
          </section>

          {/* Admin specific content */}
          {user?.role === 'admin' && (
            <section className="pt-8 border-t border-gray-200">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-700 mb-4">
                    Gestión de Usuarios
                  </h2>
                  <p className="text-gray-500 mb-6">
                    Como administrador, puedes registrar nuevos usuarios tipo
                    'user' para que tengan acceso al dashboard.
                  </p>
                  <CreateUserForm />
                </div>
                <div className="flex-1 bg-blue-50 p-6 rounded-xl border border-blue-100">
                  <h4 className="font-semibold text-blue-800 mb-2">
                    Panel de Control Admin
                  </h4>
                  <ul className="text-blue-700 text-sm space-y-2 list-disc list-inside">
                    <li>Configuración del sistema</li>
                    <li>Auditoría de logs</li>
                    <li>Permisos avanzados</li>
                  </ul>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
