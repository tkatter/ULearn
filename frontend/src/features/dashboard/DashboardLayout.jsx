import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-200);
  padding: 4rem 4.8rem 6.4rem;

  grid-column: 2;
  grid-row: 2 / -1;
`;

function DashboardLayout() {
  return (
    <StyledAppLayout>
      <DashboardHeader />
      <DashboardSidebar />
      <Main>
        <Outlet />
      </Main>
    </StyledAppLayout>
  );
}

export default DashboardLayout;
