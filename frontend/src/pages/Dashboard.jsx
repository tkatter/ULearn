import Heading from '../ui/Heading';
import Row from '../ui/Row';
import Whitespace from '../ui/Whitespace';
import SetsTable from '../features/dashboard/SetsTable';
import { useMutationState, useQuery } from '@tanstack/react-query';
import { useUsers } from '../contexts/userContext';

async function getUser(userId) {
  try {
    const res = await fetch(`/api/v1/users/${userId}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('ERroR: ', error);
  }
}

function Dashboard() {
  const { dispatch, isLoggedIn } = useUsers();
  const currentUser = useMutationState({
    filters: ['user'],
  });

  const candidateId =
    currentUser[currentUser.length - 1]?.data?.data?.user?._id;

  const {
    isPending,
    data: res,
    error,
  } = useQuery({
    queryKey: ['activeUser'],
    queryFn: () => getUser(candidateId),
  });
  if (res?.data?.user) {
    dispatch({ type: 'loggedIn', payload: res.data.user });
  }

  return (
    <>
      <Row $type="horizontal">
        <Heading as="h1">Dashboard</Heading>
      </Row>
      <Whitespace height="3.2rem;" />
      {isPending && isLoggedIn && (
        <Row $type="vertical">
          <SetsTable />
        </Row>
      )}
    </>
  );
}

export default Dashboard;
