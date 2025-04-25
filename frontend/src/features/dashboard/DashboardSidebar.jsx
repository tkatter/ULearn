import styled from 'styled-components';
import Menus from '../../ui/Menus';
import Heading from '../../ui/Heading';

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-400);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);

  grid-column: 1;
  grid-row: 2 / -1;
`;

function DashboardSidebar() {
  return (
    <StyledSidebar>
      <Heading as="h2">Sidebar</Heading>
    </StyledSidebar>
  );
}

export default DashboardSidebar;
