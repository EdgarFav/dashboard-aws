import { useState } from 'react';
import { createUserMethod } from '../services/users-service';
import { useAuth } from '../../auth/context/AuthContext';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import {
  UserPlus,
  Mail,
  Lock,
  UserCog,
  Loader2,
  ChevronRight,
} from 'lucide-react';

interface CreateUserFormProps {
  onSuccess?: () => void;
}

export const CreateUserForm = ({ onSuccess }: CreateUserFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setIsLoading(true);
    try {
      await createUserMethod(email, password, role);
      toast.success('Usuario creado exitosamente');
      setEmail('');
      setPassword('');
      setRole('user');
      if (onSuccess) onSuccess();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || 'Error al crear usuario');
      } else {
        toast.error('Ocurrió un error inesperado');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 max-w-md w-full animate-in fade-in duration-500">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
          <UserPlus size={24} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            {' '}
            Registrar Usuario{' '}
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            {' '}
            Crea cuentas para tu equipo{' '}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 ml-1 flex items-center gap-2">
            <Mail size={14} className="text-slate-400" /> Email
          </label>
          <input
            type="email"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-900 placeholder:text-slate-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ejemplo@empresa.com"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 ml-1 flex items-center gap-2">
            <Lock size={14} className="text-slate-400" /> Contraseña
          </label>
          <input
            type="password"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-900 placeholder:text-slate-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 ml-1 flex items-center gap-2">
            <UserCog size={14} className="text-slate-400" /> Rol del Sistema
          </label>
          <div className="flex gap-2">
            {['user', 'admin'].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold uppercase transition-all border ${
                  role === r
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100'
                    : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-indigo-200'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed group flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              <span>Procesando...</span>
            </>
          ) : (
            <>
              <span>Crear Usuario</span>
              <ChevronRight
                className="group-hover:translate-x-1 transition-transform"
                size={20}
              />
            </>
          )}
        </button>
      </form>
    </div>
  );
};
