import styled, { css } from 'styled-components';

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    letter-spacing: 1.2px;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.8rem;
    letter-spacing: 1.3px;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    color: var(--color-grey-0);
    border: 2px solid var(--color-grey-200);
    background-color: #0b956c;

    &:hover {
      background-color: #0a8560;
    }
  `,
  secondary: css`
    color: var(--color-grey-0);
    background: #6c89fb;

    &:hover {
      background-color: #566ec9;
    }
  `,
  tertiary: css`
    color: var(--color-grey-700);
    background: var(--color-grey-0);
    border: 2px solid var(--color-grey-200);

    &:hover {
      color: var(--color-grey-0);
      background-color: #6c89fb;
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
};

const Button = styled.button`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);

  ${props => sizes[props.size]}
  ${props => variations[props.variation]}
`;

export default Button;
