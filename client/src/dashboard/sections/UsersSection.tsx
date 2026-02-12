import { CreateUserForm } from '../components/CreateUserForm';

const UsersSection = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Gestión de Usuarios
        </h1>
        <p className="text-slate-500">
          Administra los accesos y roles de tu equipo de inteligencia de
          negocios.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <CreateUserForm />
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
            <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <h3 className="font-bold text-slate-900 text-lg">
                Directorio de Usuarios
              </h3>
              <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold uppercase tracking-wider">
                Total: 1
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {/* This will eventually be mapped from the backend */}
              <div className="px-8 py-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold border-2 border-white shadow-sm">
                    A
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      admin@empresa.com
                    </p>
                    <p className="text-xs text-slate-400">Creado hace 2 días</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase rounded-lg border border-emerald-100">
                    Activo
                  </span>
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase rounded-lg">
                    Admin
                  </span>
                </div>
              </div>

              {/* Empty state placeholder for future users */}
              <div className="px-8 py-10 text-center">
                <p className="text-sm text-slate-400 italic">
                  Los nuevos usuarios registrados aparecerán aquí.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-8 text-white shadow-xl shadow-indigo-100">
            <h4 className="font-bold text-xl mb-2 flex items-center">
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Control de Accesos (RBAC)
            </h4>
            <p className="text-indigo-100 text-sm mb-4 leading-relaxed">
              Como administrador, tienes el control total sobre quién accede a
              los datos estratégicos. Próximamente podrás asignar permisos
              granulares por región y categoría de producto.
            </p>
            <div className="flex space-x-3">
              <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase">
                Auditoría Habilitada
              </span>
              <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase">
                Encriptación AES-256
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersSection;
