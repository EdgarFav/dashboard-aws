import UserIcon from '@/assets/login/user.svg?react';
import EmailIcon from '@/assets/login/mail.svg?react';

const Login = () => {
  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <section
        className="hidden md:flex items-center justify-center bg-no-repeat bg-center bg-contain"
        style={{ backgroundImage: `url(/login/cover-login.jpg)` }}
      />
      <section className="flex flex-col items-center justify-center">
        <h3>icono de la empresa</h3>
        <h1 className="text-4xl font-bold">Hola 👋</h1>
        <h2 className="text-lg mb-6">¡Bienvenido de nuevo!</h2>
        <form className="flex flex-col items-center mt-4 space-y-6 max-w-md w-full px-4">
          <div className="border-2 p-2 rounded-lg w-full flex items-center justify-between">
            <label htmlFor="email"></label>
            <input
              className="py-2 px-3 focus:outline-none flex-1"
              type="email"
              name="email"
              placeholder="Ingresa tu email"
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
              required
            />
            <EmailIcon className="m-2" />
          </div>
          <button
            type="submit"
            className="border-2 bg-blue-500 w-full text-white px-3 py-4 mt-4 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors"
          >
            Iniciar Sesión
          </button>
        </form>
      </section>
    </main>
  );
};

export default Login;
