import styled from 'styled-components';

const Column = styled.div`
  ${props => `background-color: ${props._$bgColor}`}

  justify-self: center;
  grid-column: 1;
  align-self: center;
`;

// Column.defaultProps = {
//   type: 'horizontal',
// };

export default Column;
