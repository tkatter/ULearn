import { useState } from 'react';
import { useForm } from 'react-hook-form';
import isEmail from 'validator/lib/isEmail';

import { useLogin } from './useLogin';

import Button from '../../../ui/Button';
import Form from '../../../ui/Form';
import Input from '../../../ui/Input';
import FormRowVertical from '../../../ui/FormRowVertical';
import SpinnerMini from '../../../ui/SpinnerMini';

// TODO: FIX STYLING

function LoginForm() {
  const [formError, setFormError] = useState(null);
  const { register, handleSubmit } = useForm();
  const { login, isPending } = useLogin();

  function onSubmit({ email, password }) {
    login({ email, password });
  }

  function onError(err) {
    setFormError(err);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRowVertical label="Email address" error={formError?.email?.message}>
        <Input
          value="thomas@ulearn.com"
          type="email"
          name="email"
          id="email"
          autoComplete="username"
          {...register('email', {
            required: 'Email is required',
            validate: value => {
              if (!isEmail(value)) return 'Email is not a valid email address';
            },
          })}
        />
      </FormRowVertical>
      <FormRowVertical label="Password" error={formError?.password?.message}>
        <Input
          value="password"
          type="password"
          name="password"
          id="password"
          autoComplete="current-password"
          {...register('password', { required: 'Password is required' })}
        />
      </FormRowVertical>
      <Button
        disabled={isPending}
        type="submit"
        $variation="primary"
        $size="large"
      >
        {!isPending ? 'Log in' : <SpinnerMini />}
      </Button>
    </Form>
  );
}

export default LoginForm;
