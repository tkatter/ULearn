import { useSets } from '../../hooks/useSets';
import Heading from '../../ui/Heading';
import Spinner from '../../ui/Spinner';
import Container from '../../ui/Container';
import SetCard from './SetCard';
import styled from 'styled-components';
import Button from '../../ui/Button';
import Row from '../../ui/Row';

const StyledSetGrid = styled(Container)`
  gap: 2rem;
`;

function SetsTable() {
  const { isPending, res } = useSets();

  if (isPending) return <Spinner />;
  if (res.status !== 'success')
    return <Heading as="h2">Something went wrong</Heading>;

  const { results } = res;
  const { sets } = res.data;

  return (
    <>
      <Row $type="horizontal">
        <Heading as="h2">Your Sets ({results})</Heading>

        <Row $type="horizontal" $align="jusEnd">
          <Button $size="small" $variation="primary">
            Create a set
          </Button>
          <Button $size="small" $variation="primary">
            Edit a set
          </Button>
        </Row>
      </Row>
      <StyledSetGrid $type="grid2x">
        {sets.map(set => (
          <SetCard key={set._id} set={set} />
        ))}
      </StyledSetGrid>
    </>
  );
}

export default SetsTable;
