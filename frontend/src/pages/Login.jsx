import styled from 'styled-components';

import CompanyTitle from '../ui/CompanyTitle';
import Heading from '../ui/Heading';
import LoginForm from '../features/login/LoginForm';

const LoginLayout = styled.div`
  background-color: #0ca678;
  height: 100vh;
`;

const StyledLogo = styled(CompanyTitle)`
  margin: 0 auto;
  font-size: 4.8rem;
`;

function Login() {
  return (
    <LoginLayout>
      <StyledLogo />
      <Heading as="h4">Log in to your account</Heading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
