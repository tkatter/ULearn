import Button from '../ui/Button';
import Column from '../ui/Column';
import Container from '../ui/Container';
import Heading from '../ui/Heading';
import Input from '../ui/Input';
import Row from '../ui/Row';

function Login() {
  return (
    <>
      <Heading as="h1">Login form here</Heading>
      <Container>
        <Column bgColor="_$yellow"></Column>
        <Column bgColor="_$blue">
          <Row type="vertical">
            <Input placeholder="Email" type="email" />
            <Input placeholder="Password" type="password" />
            <Button size="medium" variation="primary">
              Login
            </Button>
            <Button size="small" variation="secondary">
              Sign Up
            </Button>
          </Row>
        </Column>
        <Column bgColor="_$yellow"></Column>
      </Container>
    </>
  );
}

export default Login;
