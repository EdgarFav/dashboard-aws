import { useAuth } from '../../auth/context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const lastLoginFormatted = user?.lastLogin
    ? new Date(user.lastLogin).toLocaleString()
    : 'Primer acceso';

  return (
    <header className="h-20 bg-white border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center space-x-4">
        <div>
          <h2 className="text-sm font-medium text-slate-400">
            Panel de Control /{' '}
            <span className="text-slate-900 font-bold">SmartForecast</span>
          </h2>
          {user?.lastLogin && (
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-0.5">
              Último acceso:{' '}
              <span className="text-slate-500">{lastLoginFormatted}</span>
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-6">
        {/* Notifications Placeholder */}
        <button className="relative p-2 text-slate-400 hover:text-indigo-600 transition-colors">
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-8 w-px bg-slate-100"></div>

        <div className="flex items-center space-x-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-900">
              {user?.email?.split('@')[0]}
            </p>
            <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded text-[10px] font-bold uppercase tracking-tighter">
              {user?.role}
            </span>
          </div>
          <div className="group relative">
            <button className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-100 border-2 border-white">
              {user?.email?.[0].toUpperCase()}
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
              <div className="px-4 py-2 border-b border-slate-50 mb-1">
                <p className="text-xs text-slate-400 font-medium">
                  Sesión iniciada como
                </p>
                <p className="text-sm font-bold text-slate-900 truncate">
                  {user?.email}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-rose-600 flex items-center space-x-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span className="font-medium">Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
