import styled, { css } from 'styled-components';

const alignment = {
  centered: css`
    align-items: center;
    justify-content: center;
  `,
  jusCenter: css`
    justify-content: center;
  `,
  gap: css`
    gap: 1rem;
  `,
  jusEnd: css`
    justify-content: flex-end;
  `,
};

const Row = styled.div`
  display: flex;

  ${props =>
    props.$type === 'horizontal' &&
    css`
      justify-content: space-between;
      /* gap: 1.6rem; */
      align-items: center;
    `}
  ${props =>
    props.$type === 'vertical' &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
    
  ${props => (props.$align ? alignment[props.$align] : alignment[props.$align])}
`;

Row.defaultProps = {
  $type: 'horizontal',
};

export default Row;
