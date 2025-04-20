import Heading from '../ui/Heading';
import Row from '../ui/Row';
import Button from '../ui/Button';

function Dashboard() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
      </Row>

      <Row type="horizontal">
        <Heading as="h2">Your Sets</Heading>

        <Row type="horizontal">
          <Button size="small" variation="primary">
            Create a set
          </Button>
          <Button size="small" variation="primary">
            Edit a set
          </Button>
        </Row>
      </Row>
    </>
  );
}

export default Dashboard;
