import styled from 'styled-components';

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-400);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);

  grid-column: 2;
  grid-row: 2 / -1;
`;

function Sidebar() {
  return (
    <StyledSidebar>
      <p>Sidebar</p>
    </StyledSidebar>
  );
}

export default Sidebar;
