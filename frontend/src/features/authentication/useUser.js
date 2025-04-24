import { useQuery } from '@tanstack/react-query';
import { getCurrentUserApi } from '../../services/getCurrentUserApi';

export function useUser() {
  const {
    data: user,
    error,
    isPending,
    isFetching,
  } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUserApi,
    retry: false,
  });

  // console.log('User', user, 'Error', error);
  return {
    user,
    isPending,
    isAuthenticated: user?.isAuthenticated,
    isFetching,
    error,
  };
}
