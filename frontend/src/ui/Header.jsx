import styled from 'styled-components';

import MainNav from './MainNav';
import CompanyTitle from './CompanyTitle';
import SearchBar from './SearchBar';
import { useUsers } from '../contexts/userContext';

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  /* background-color: #0b956c; */
  padding: 1rem 3.2rem;
  border-bottom: 1px solid var(--color-grey-100);

  grid-column: 1 / -1;

  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 0 3.2rem;
  align-items: center;
  justify-content: center;
`;

function Header() {
  const { isLoggedIn } = useUsers();

  return (
    <StyledHeader>
      <CompanyTitle />
      <SearchBar />
      {isLoggedIn && <MainNav />}
    </StyledHeader>
  );
}
export default Header;
