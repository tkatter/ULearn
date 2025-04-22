import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import { UserProvider } from '../contexts/userContext';
import Header from './Header';
import Sidebar from './Sidebar';

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 26rem;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-200);
  padding: 4rem 4.8rem 6.4rem;

  grid-column: 1;
  grid-row: 2 / -1;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <UserProvider>
        <Header />
        <Sidebar />
        <Main>
          <Outlet />
        </Main>
      </UserProvider>
    </StyledAppLayout>
  );
}

export default AppLayout;
