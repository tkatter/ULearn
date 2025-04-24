import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logoutApi } from '../../../services/logoutApi';
import { useNavigate } from 'react-router-dom';

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      localStorage.removeItem('user');
      localStorage.removeItem('session');
      queryClient.removeQueries(['user']);
      navigate('/login', { replace: true });
    },
  });

  return { logout, isPending };
}
