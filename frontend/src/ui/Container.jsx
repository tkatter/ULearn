import styled, { css } from 'styled-components';

const bgColors = {
  white: css`
    background-color: #fff;
  `,
};

const borders = {
  primary: css`
    border: 2px solid #6c89fb;
    border-radius: 6px;
  `,
};

const types = {
  flexColumn: css`
    display: flex;
    flex-direction: column;
  `,
  flexCentered: css`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  grid4x: css`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  `,
  grid2x: css`
    display: grid;
    grid-template-columns: 1fr 1fr;
  `,
};

const Container = styled.div`
  ${props => types[props.type]}
  ${props => (props.bgColor ? bgColors[props.bgColor] : '')}
  ${props => (props.border ? borders[props.border] : '')}
  ${props =>
    props.padding
      ? css`
          padding: ${props.padding};
        `
      : ''}
`;

export default Container;
