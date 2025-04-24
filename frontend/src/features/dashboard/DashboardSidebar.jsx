import styled from 'styled-components';

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
      <p>Sidebar</p>
    </StyledSidebar>
  );
}

export default DashboardSidebar;
