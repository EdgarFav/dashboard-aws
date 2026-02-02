import cover from '@assets/login/cover-login.jpg';
import UserIcon from '@assets/login/user.svg?react';
import EmailIcon from '@assets/login/mail.svg?react';

const Login = () => {
  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <section
        className="hidden md:flex items-center justify-center bg-no-repeat bg-center bg-contain"
        style={{ backgroundImage: `url(${cover})` }}
      />
      <section className="flex flex-col items-center justify-center">
        <h3>icono de la empresa</h3>
        <h1 className="text-4xl font-bold">Hola 👋</h1>
        <h2 className="text-lg mb-6">¡Bienvenido de nuevo!</h2>
        <form className="flex flex-col items-center mt-4 space-y-6 max-w-md w-full px-4">
          <div className="border rounded-lg w-full">
            <label htmlFor="email"></label>
            <input
              className="py-2 px-3 focus:outline-none"
              type="email"
              name="email"
              placeholder="Ingresa tu email"
              required
            />
            <UserIcon />
          </div>
          <div className="border rounded-lg w-full">
            <label htmlFor="password"></label>
            <input
              className="py-2 px-3 focus:outline-none"
              type="password"
              name="password"
              placeholder="Ingresa tu contraseña"
              required
            />
            <EmailIcon />
          </div>
          <button
            type="submit"
            className="bg-blue-500 w-full text-white px-4 py-2 mt-4 rounded-lg"
          >
            Iniciar Sesión
          </button>
        </form>
      </section>
    </main>
  );
};

export default Login;
