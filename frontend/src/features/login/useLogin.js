import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { useUsers } from '../../contexts/userContext';
import toast from 'react-hot-toast';

async function loginApi(email, password) {
  try {
    const res = await fetch('/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    // Throw error for 500 status code
    if (res?.status === 500)
      throw new Error('Something went wrong, please try again later');

    const data = await res.json();

    // Manually throwing error for bad requests for React Query
    if (data.status === 'fail') throw new Error(data.message);

    return data;
  } catch (err) {
    // Manually throwing error for bad requests for React Query
    throw new Error(err.message);
  }
}

export function useLogin() {
  const { dispatch } = useUsers();
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationKey: ['user'],
    mutationFn: ({ email, password }) => {
      return loginApi(email, password);
    },

    onSuccess: data => {
      console.log(data.data.user);
      dispatch({ type: 'loggedIn', payload: data.data.user });
      navigate('/dashboard');
    },

    onError: error => {
      return toast.error(`${error.message}`);
    },
  });

  return { login, isPending };
}
