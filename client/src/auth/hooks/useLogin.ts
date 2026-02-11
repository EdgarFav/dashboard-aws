import { AxiosError } from 'axios';
import { loginMethod } from '../services/auth-service';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useAuth } from '../context/AuthContext';

export const useLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const loginUser = async (email: string, password: string) => {
    try {
      const response = await loginMethod(email, password);
      const { user, access_token } = response.data;

      login(user, access_token);
      navigate('/dashboard');
    } catch (error) {
      if (error instanceof AxiosError)
        toast.error(error.response?.data.message);
    }
  };

  return { loginUser };
};
