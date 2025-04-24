import { useQuery } from '@tanstack/react-query';
import { getCurrentUserApi } from '../../services/getCurrentUserApi';

export function useUser() {
  const { data: user, isPending } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUserApi,
  });

  return { user, isPending, isAuthenticated: user?.isAuthenticated };
}
