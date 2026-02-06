import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import { AuthProvider } from './auth/AuthProvider.tsx';

//Creamos el router de la aplicacion para la navegacion entre paginas
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
    ],
  },
]);

//Envolvemos la aplicacion con el AuthProvider para manejar la autenticacion global
//Envolvemos la aplicacion con el RouterProvider para habilitar el ruteo con RouterProvider
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
