import { useForm } from 'react-hook-form';
import isEmail from 'validator/lib/isEmail';

import styled from 'styled-components';
import Button from '../ui/Button';
import Heading from '../ui/Heading';
import Input from '../ui/Input';
import FormRow from '../ui/FormRow';
import Label from '../ui/Label';
import Form from '../ui/Form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';

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
  margin: 0 auto;
  max-width: 700;
`;

const StyledFormButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
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
    // console.log(data);
    return data;
  } catch (err) {
    throw new Error(err);
  }
}

function Login() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [formError, setFormError] = useState(null);
  const [loginError, setLoginError] = useState(null);

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: data => {
      if (data.status === 'fail') {
        setLoginError(data);
        return reset();
      }
      setLoginError(null);
      console.log('User successfully logged in!!');
      // TODO: use query client to update invalidate the current user data update with logged in data
      queryClient.setQueryData(['user'], data.data.user);
      reset();
      navigate('/dashboard');
    },
    onError: err => {
      toast.error(err.message);
    },
  });

  async function onSubmit(data) {
    mutate(data);
  }

  function onError(error) {
    // console.log(Object.values(error));
    setFormError(error);
  }

  return (
    <StyledLoginPage>
      <StyledLoginForm>
        <StyledHeading as="h1">LOGIN</StyledHeading>
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
          <FormRow>
            <Label htmlFor="email">Email address</Label>
            <Input
              placeholder="Email"
              type="text"
              id="email"
              {...register('email', {
                required: 'Email is required',
                validate: value => {
                  if (!isEmail(value))
                    return 'Email is not a valid email address';
                },
              })}
            />
            {formError?.email?.message && (
              <Error>{formError?.email?.message}</Error>
            )}
          </FormRow>

          <FormRow>
            <Label htmlFor="password">Password</Label>
            <Input
              placeholder="Password"
              type="password"
              id="password"
              {...register('password', { required: 'Password is required' })}
            />
            {formError?.password?.message && (
              <Error>{formError?.password?.message}</Error>
            )}
          </FormRow>
          {loginError && <Error>{loginError.message}</Error>}
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
