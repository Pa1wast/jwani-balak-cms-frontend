import { loginApi } from '@/api/auth/login';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export function useLogin() {
  const navigate = useNavigate();
  const { mutate: login, isPending } = useMutation({
    mutationFn: (passcode: string) => loginApi(passcode),
    onSuccess: () => {
      toast.success('Logged in successfully');
      navigate('/', { replace: true });
    },
    onError: err => toast.error(err.message),
  });

  return { login, isPending };
}
