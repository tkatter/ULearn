import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledTitle = styled.h1`
  /* color: #fff; */
  color: #0b956c;
  font-size: 3rem;
  font-weight: 700;
  letter-spacing: 1.5px;
`;

function CompanyTitle() {
  return (
    <>
      <NavLink to="/home">
        <StyledTitle>ULearn.io</StyledTitle>
      </NavLink>
    </>
  );
}

export default CompanyTitle;
