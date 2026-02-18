import { useEffect, useState } from 'react';
import { CreateUserForm } from '../components/CreateUserForm';
import { getUsersMethod, deleteUserMethod } from '../services/users-service';
import type { User } from '../services/users-service';
import { Loader2, Trash2, Shield, User as UserIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

const UsersSection = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const data = await getUsersMethod();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Error al cargar usuarios');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: number, email: string) => {
    if (
      !window.confirm(
        `¿Estás seguro de que deseas eliminar al usuario ${email}?`
      )
    )
      return;

    try {
      await deleteUserMethod(id);
      toast.success('Usuario eliminado');
      fetchUsers();
    } catch {
      toast.error('Error al eliminar usuario');
    }
  };

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
          <CreateUserForm onSuccess={fetchUsers} />
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
            <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <h3 className="font-bold text-slate-900 text-lg">
                Directorio de Usuarios
              </h3>
              <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold uppercase tracking-wider">
                Total: {users.length}
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {loading ? (
                <div className="p-12 flex justify-center">
                  <Loader2 className="animate-spin text-indigo-600" />
                </div>
              ) : users.length === 0 ? (
                <div className="px-8 py-10 text-center">
                  <p className="text-sm text-slate-400 italic">
                    No hay usuarios registrados.
                  </p>
                </div>
              ) : (
                users.map((u) => (
                  <div
                    key={u.id}
                    className="px-8 py-6 flex items-center justify-between hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold border-2 border-white shadow-sm capitalize">
                        {u.email[0]}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          {u.email}
                        </p>
                        <p className="text-xs text-slate-400">
                          ID: {u.id} •{' '}
                          {formatDistanceToNow(new Date(u.createdAt), {
                            addSuffix: true,
                            locale: es,
                          })}
                        </p>
                        <p className="text-[10px] text-indigo-400 font-medium mt-1">
                          Último acceso:{' '}
                          {u.lastLogin
                            ? formatDistanceToNow(new Date(u.lastLogin), {
                                addSuffix: true,
                                locale: es,
                              })
                            : 'Nunca'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span
                        className={`px-3 py-1 text-[10px] font-bold uppercase rounded-lg border ${
                          u.role === 'admin'
                            ? 'bg-rose-50 text-rose-600 border-rose-100'
                            : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                        } flex items-center gap-1`}
                      >
                        {u.role === 'admin' ? (
                          <Shield size={10} />
                        ) : (
                          <UserIcon size={10} />
                        )}
                        {u.role}
                      </span>
                      <button
                        onClick={() => handleDelete(u.id, u.email)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-8 text-white shadow-xl shadow-indigo-100">
            <h4 className="font-bold text-xl mb-2 flex items-center">
              <Shield className="w-6 h-6 mr-2" />
              Control de Accesos (RBAC)
            </h4>
            <p className="text-indigo-100 text-sm mb-4 leading-relaxed">
              Como administrador, tienes el control total sobre quién accede a
              los datos estratégicos. Los cambios de roles se aplican al
              instante.
            </p>
            <div className="flex space-x-3">
              <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase">
                Auditoría Habilitada
              </span>
              <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase">
                Seguridad SSL/TLS
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersSection;
