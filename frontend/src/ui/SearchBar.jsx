import styled from 'styled-components';

const StyledSearch = styled.input`
  border: 2px solid #0b956c;
  border-radius: 25px;
  box-shadow: var(--shadow-sm);
  padding: 0.8rem 1.2rem;
  width: 50%;
  justify-self: center;
`;

function SearchBar() {
  return <StyledSearch type="search" placeholder="Search for sets..." />;
}

export default SearchBar;
