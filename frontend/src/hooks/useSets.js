import { useQuery } from '@tanstack/react-query';

async function getSets() {
  try {
    const res = await fetch('/api/v1/sets');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    throw new Error('There was a problem fetching the sets');
  }
}

export function useSets() {
  const {
    isPending,
    data: res,
    error,
  } = useQuery({
    queryKey: ['sets'],
    queryFn: getSets,
  });

  return { isPending, res, error };
}
