import styled from 'styled-components';

const Whitespace = styled.div`
  ${props => (props.height ? `height: ${props.height}` : '')}
  ${props => (props.width ? `width: ${props.width}` : '')}
`;

export default Whitespace;
