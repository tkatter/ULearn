import styled from 'styled-components';
import Button from '../ui/Button';
import Column from '../ui/Column';
import Container from '../ui/Container';
import Heading from '../ui/Heading';
import Input from '../ui/Input';
import Row from '../ui/Row';

const StyledLoginPage = styled.div`
  background-color: #0ca678;
  height: 100vh;
  display: grid;
  align-items: center;
  justify-content: center;
`;

const StyledContainer = styled(Container)`
  box-shadow: var(--shadow-md);
  border-radius: 25px;
`;

const StyledHeading = styled(Heading)`
  align-self: center;
  letter-spacing: 1.5px;
  font-size: 3.6rem;
`;

const StyledLoginForm = styled.form``;

function Login() {
  return (
    <StyledLoginPage>
      <StyledContainer
        type="flexCentered"
        bgColor="white"
        padding="6.4rem 8rem"
      >
        <Row type="vertical" align="jusCenter">
          <StyledHeading as="h1">LOGIN</StyledHeading>
          <Input placeholder="Email" type="email" />
          <Input placeholder="Password" type="password" />
          <Button size="medium" variation="primary">
            Login
          </Button>
          <Button size="medium" variation="tertiary">
            Sign Up
          </Button>
        </Row>
      </StyledContainer>
    </StyledLoginPage>
  );
}

export default Login;
