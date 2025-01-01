import React, {useState} from 'react';
import RHFTextField from '../../components/hook-form/RHFTextField';
import * as Yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup'; // Ensure this import is present
import FormProvider from '../../components/hook-form/FormProvider';
import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  useTheme,
} from '@mui/material';
import {Eye, EyeSlash} from 'phosphor-react';
import {Link as RouterLink} from 'react-router-dom';
import { LoginUser } from '../../redux/slices/auth';
import { useDispatch } from 'react-redux';

const LoginForm = () => {
  const dispatch = useDispatch()
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: 'demo123@gmail.com',
    password: 'demo123',
  };

  const method = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: {errors},
  } = method;

  const onSubmit = async (data) => {
    try {
      // handle submit
      dispatch(LoginUser(data))
      console.log(data); // Replace this with your submit logic
    } catch (error) {
      console.log(errors.afterSubmit.message,'errors.afterSubmit.message')
      reset();
      setError('afterSubmit', {
        type: 'manual',
        message: error.message,
      });
    }
  };

  return (
    <FormProvider methods={method} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}
        <RHFTextField name="email" type="email" label="Email address" />
        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <Eye /> : <EyeSlash />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <Stack alignItems="flex-end" sx={{my: 2}}>
        <Link to="/auth/reset-password"variant="body2" component={RouterLink} color="inherit" underline="always">
          Forget Password
        </Link>
      </Stack>
     <Button
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        sx={{
          bgcolor: 'text.primary',
          color: theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
          '&:hover': {
            bgcolor: 'text.primary',
            color: theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
          },
        }}
      >
        Login
      </Button>
    </FormProvider>
  );
};

export default LoginForm;
