import { HiOutlinePencilSquare, HiEllipsisVertical } from 'react-icons/hi2';
import styled from 'styled-components';
import Row from '../../ui/Row';

const StyledButton = styled.button`
  background-color: inherit;
  border: inherit;

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-grey-400);
    transition: color 0.3s;
  }

  &:focus,
  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: #0b956c;
    border: none;
    background-color: #fff;
    /* color: var(--color-brand-600); */
  }
`;

function EditSetBtn() {
  return (
    <Row $type="horizontal" $align="gap">
      <StyledButton>
        <HiOutlinePencilSquare />
      </StyledButton>
      <StyledButton>
        <HiEllipsisVertical />
      </StyledButton>
    </Row>
  );
}
export default EditSetBtn;
