import Heading from '../ui/Heading';
import Row from '../ui/Row';
import Whitespace from '../ui/Whitespace';
import SetsTable from '../features/dashboard/SetsTable';

function Dashboard() {
  return (
    <>
      <Row $type="horizontal">
        <Heading as="h1">Dashboard</Heading>
      </Row>
      <Whitespace height="3.2rem;" />

      <Row $type="vertical">
        <SetsTable />
      </Row>
    </>
  );
}

export default Dashboard;
