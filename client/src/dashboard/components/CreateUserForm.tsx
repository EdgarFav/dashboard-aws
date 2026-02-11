import { useState } from 'react';
import { createUserMethod } from '../services/users-service';
import { useAuth } from '../../auth/context/AuthContext';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

export const CreateUserForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setIsLoading(true);
    try {
      await createUserMethod(email, password);
      toast.success('Usuario creado exitosamente');
      setEmail('');
      setPassword('');
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
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 max-w-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Crear Nuevo Usuario
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="correo@ejemplo.com"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contraseña
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 pointer-events-auto cursor-pointer"
        >
          {isLoading ? 'Creando...' : 'Registrar Usuario'}
        </button>
      </form>
    </div>
  );
};
