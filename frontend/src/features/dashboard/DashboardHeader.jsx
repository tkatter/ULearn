import styled from 'styled-components';

import CompanyTitle from '../../ui/CompanyTitle';
import SearchBar from '../../ui/SearchBar';
import DashNav from './DashNav';

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  /* background-color: #0b956c; */
  padding: 0.5rem 3.2rem;
  border-bottom: 1px solid var(--color-grey-100);

  grid-column: 1 / -1;
  grid-row: 1;

  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 0 3.2rem;
  align-items: center;
  justify-content: center;
`;

function DashboardHeader() {
  return (
    <StyledHeader>
      <CompanyTitle />
      <SearchBar />
      <DashNav />
    </StyledHeader>
  );
}
export default DashboardHeader;
