import styled from 'styled-components';
import Spinner from '../../ui/Spinner';
import { useUser } from './useUser';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  // Load authenticated user
  const { user, isPending, isAuthenticated } = useUser();

  const navigate = useNavigate();

  // If there is NO authenticated user, redirect to /login
  useEffect(
    function () {
      if (!isAuthenticated && !isPending) {
        navigate('/login');
      } else {
        localStorage.setItem('user', JSON.stringify(user));
      }
    },
    [user, isAuthenticated, navigate, isPending]
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
