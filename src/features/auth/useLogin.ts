import { loginApi } from '@/api/auth/login';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useLogin() {
  const { mutate: login, isPending } = useMutation({
    mutationFn: (passcode: string) => loginApi(passcode),
    onSuccess: () => {
      toast.success('Logged in successfully');
    },
    onError: err => toast.error(err.message),
  });

  return { login, isPending };
}
