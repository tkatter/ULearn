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
      <StyledTitle>ULearn.io</StyledTitle>
    </>
  );
}

export default CompanyTitle;
