import UserIcon from '@/assets/login/user.svg?react';
import EmailIcon from '@/assets/login/mail.svg?react';
import { useState, useTransition } from 'react';
import { useLogin } from '../hooks/useLogin';

interface IFormLogin {
  email: string;
  password: string;
}
const initialState: IFormLogin = {
  email: '',
  password: '',
};

const FormLogin = () => {
  const [form, setForm] = useState<IFormLogin>(initialState);
  const [isPending, startTransition] = useTransition();

  const { loginUser } = useLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      await loginUser(form.email, form.password);
      setForm(initialState);
    });
  };

  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <section
        className="hidden md:flex items-center justify-center bg-no-repeat bg-center bg-contain"
        style={{ backgroundImage: 'url(/cover-login.jpg)' }}
      />
      <section className="flex flex-col items-center justify-center">
        <h3>icono de la empresa</h3>
        <h1 className="text-4xl font-bold">Hola 👋</h1>
        <h2 className="text-lg mb-6">¡Bienvenido de nuevo!</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center mt-4 space-y-6 max-w-md w-full px-4"
        >
          <div className="border-2 p-2 rounded-lg w-full flex items-center justify-between">
            <label htmlFor="email"></label>
            <input
              className="py-2 px-3 focus:outline-none flex-1"
              type="email"
              name="email"
              placeholder="Ingresa tu email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <UserIcon className="m-2" />
          </div>
          <div className="border-2 p-2 rounded-lg w-full flex items-center justify-between">
            <label htmlFor="password"></label>
            <input
              className="py-2 px-3 focus:outline-none flex-1"
              type="password"
              name="password"
              placeholder="Ingresa tu contraseña"
              value={form.password}
              onChange={handleChange}
              required
            />
            <EmailIcon className="m-2" />
          </div>
          <button
            type="submit"
            className="border-2 bg-blue-500 w-full text-white px-3 py-4 mt-4 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors"
            disabled={isPending}
          >
            Iniciar Sesión
          </button>
        </form>
      </section>
    </main>
  );
};

export default FormLogin;
