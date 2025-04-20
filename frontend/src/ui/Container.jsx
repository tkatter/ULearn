import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: 40px, 1fr, 40px;
  /* justify-content: stretch; */
`;

Container.defaultProps = {
  type: 'horizontal',
};

export default Container;
