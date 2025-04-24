import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { logoutApi } from '../../../services/logoutApi';
import { useUsers } from '../../../contexts/userContext';

export function useLogout() {
  const { dispatch } = useUsers();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      localStorage.removeItem('user');
      localStorage.removeItem('session');
      queryClient.removeQueries(['user']);
      dispatch({ type: 'loggedOut' });
      navigate('/home', { replace: true });
    },
    onError: error => {
      return toast.error(`${error.message}`);
    },
  });

  return { logout, isPending };
}
