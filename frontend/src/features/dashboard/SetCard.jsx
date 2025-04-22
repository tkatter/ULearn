import styled from 'styled-components';
import Container from '../../ui/Container';
import Heading from '../../ui/Heading';
import Row from '../../ui/Row';
import SetBtns from './SetBtns';

const StyledContainer = styled(Container)`
  justify-content: space-between;
`;

const StyledInfo = styled.div`
  span {
    font-size: 1.4rem;
    font-style: italic;
    text-transform: capitalize;
    font-weight: 500;
  }

  span:last-child {
    font-style: normal;
    font-weight: 600;
    font-size: 1.6rem;
  }

  p {
    font-size: 1.6rem;
  }
`;

function SetCard({ set }) {
  const { description, name, notes: numNotes } = set;
  return (
    <>
      <StyledContainer
        $padding="1.2rem 2.4rem"
        $bgColor="white"
        $type="flexColumn"
        $border="primary"
      >
        <Row $type="horizontal">
          <Heading as="h3">{name}</Heading>
          <SetBtns />
        </Row>
        <StyledInfo>
          <p>{description}</p>
          <Row $type="horizontal" $align="jusEnd">
            <span>
              {numNotes} {numNotes === 1 ? 'Note' : 'Notes'}
            </span>
          </Row>
        </StyledInfo>
      </StyledContainer>
    </>
  );
}

export default SetCard;
