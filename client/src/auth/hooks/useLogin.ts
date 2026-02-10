import { AxiosError } from 'axios';
import { loginMethod } from '../services/auth-service';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const useLogin = () => {
  const navigate = useNavigate();
  const loginUser = async (email: string, password: string) => {
    try {
      await loginMethod(email, password);
      navigate('/dashboard');
    } catch (error) {
      if (error instanceof AxiosError)
        toast.error(error.response?.data.message);
    }
  };

  return { loginUser };
};
