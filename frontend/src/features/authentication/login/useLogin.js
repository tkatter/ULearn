import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { loginApi } from '../../../services/loginApi';
// import { useUsers } from '../../../contexts/userContext';

export function useLogin() {
  // const { dispatch } = useUsers();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => {
      return loginApi(email, password);
    },

    onSuccess: data => {
      // Set data to localStorage
      localStorage.setItem('session', JSON.stringify(data.session));
      localStorage.setItem('user', JSON.stringify(data.data.user));

      // Set data in UserContext state
      // dispatch({ type: 'loggedIn', payload: data.data.user });

      // Add logged in user to React Query 'user' cache
      queryClient.setQueryData(['user'], data.data.user);
      // On success, redirect user to dashboard page
      navigate('/dashboard', { replace: true });
    },

    onError: error => {
      return toast.error(`${error.message}`);
    },
  });

  return { login, isPending };
}
