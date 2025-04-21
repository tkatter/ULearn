import { useForm } from 'react-hook-form';

import styled from 'styled-components';
import Button from '../ui/Button';
import Heading from '../ui/Heading';
import Input from '../ui/Input';
import FormRow from '../ui/FormRow';
import Label from '../ui/Label';
import Form from '../ui/Form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const StyledLoginPage = styled.div`
  background-color: #0ca678;
  height: 100vh;
  display: grid;
  align-items: center;
  justify-content: center;
`;

const StyledHeading = styled(Heading)`
  align-self: center;
  letter-spacing: 1.5px;
  font-size: 3.6rem;
`;

const StyledLoginForm = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  gap: 3.2rem;
  justify-items: center;

  background-color: #fff;
  padding: 3.2rem 6.4rem;
  border-radius: 25px;
  box-shadow: var(--shadow-md);
`;

const StyledFormButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

async function login({ email, password }) {
  try {
    const res = await fetch('/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    throw new Error('There was a problem logging in');
  }
}

function Login() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: data => {
      console.log('User successfully logged in!!');
      // TODO: use query client to update invalidate the current user data update with logged in data
      queryClient.setQueryData(['user'], data);
      reset();
      navigate('/dashboard');
    },
    onError: err => console.error(err.message),
  });

  async function onSubmit(data) {
    mutate(data);
  }

  return (
    <StyledLoginPage>
      <StyledLoginForm>
        <StyledHeading as="h1">LOGIN</StyledHeading>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormRow>
            <Label>Username or Email</Label>
            <Input
              placeholder="Username or email"
              type="text"
              id="email"
              {...register('email', { required: true })}
            />
          </FormRow>

          <FormRow>
            <Label>Password</Label>
            <Input
              placeholder="Password"
              type="password"
              id="password"
              {...register('password', { required: true })}
            />
          </FormRow>

          <StyledFormButtons>
            <Button
              disabled={isPending}
              type="submit"
              size="medium"
              variation="primary"
            >
              Login
            </Button>
            <Button type="button" size="medium" variation="tertiary">
              Sign Up
            </Button>
          </StyledFormButtons>
        </Form>
      </StyledLoginForm>
    </StyledLoginPage>
  );
}

export default Login;
