import styled from 'styled-components';
import Spinner from '../../ui/Spinner';
import { useUser } from './useUser';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useUsers } from '../../contexts/userContext';

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const queryClient = useQueryClient();
  const { dispatch } = useUsers();

  // Load authenticated user
  const { error, user, isPending, isAuthenticated, isFetching } = useUser();

  const navigate = useNavigate();

  // If there is NO authenticated user, redirect to /login
  useEffect(
    function () {
      if (error) toast.error(error.message);

      if (!isAuthenticated && !isPending && !isFetching) {
        queryClient.clear();
        navigate('/login');
      } else {
        dispatch({ type: 'loggedIn', payload: user });
      }
    },

    [
      dispatch,
      user,
      error,
      queryClient,
      isAuthenticated,
      navigate,
      isPending,
      isFetching,
    ]
  );

  // While loading, show spinner
  if (isPending) {
    return (
      <FullPage>
        <Spinner />;
      </FullPage>
    );
  }

  // If there IS a user, render the app

  return children;
}

export default ProtectedRoute;
