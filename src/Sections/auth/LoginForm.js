import React, { useState } from 'react';
import RHFTextField from '../../components/hook-form/RHFTextField';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'; // Ensure this import is present
import FormProvider from '../../components/hook-form/FormProvider';
import { Alert, IconButton, InputAdornment, Stack } from '@mui/material';
import { Eye, EyeSlash } from 'phosphor-react';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const loginSchema = Yup.object().shape({
    password: Yup.string().required('Password is required'),
    email: Yup.string().required('Email is required').email('Enter a valid email address'),
  });

  const defaultValues = {
    email: 'demo123@gmail.com',
    password: 'demo123',
  };

  const method = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues,
  });

  const { reset, setError, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = method;

  const onSubmit = async (data) => {
    try {
      // handle submit
      console.log(data); // Replace this with your submit logic
    } catch (error) {
      reset();
      setError('afterSubmit', {
        type: 'manual',
        message: error.message,
      });
    }
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormProvider methods={method} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        {!!errors.afterSubmit && <Alert severity='error'>{errors.afterSubmit.message}</Alert>}
        
        <RHFTextField name="email" label="Email" type="email" />
        
        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handlePasswordToggle}>
                  {showPassword ? <Eye /> : <EyeSlash />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
    </FormProvider>
  );
};

export default LoginForm;
