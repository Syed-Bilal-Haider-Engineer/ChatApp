import React, { useEffect, useState } from 'react';
import RHFTextField from '../../components/hook-form/RHFTextField';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'; 
import FormProvider from '../../components/hook-form/FormProvider';
import { Alert, Button, IconButton, InputAdornment, Stack, useTheme } from '@mui/material';
import { Eye, EyeSlash } from 'phosphor-react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { RegisterUser } from '../../redux/slices/auth';

const RegisterForm = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const [showPassword, setShowPassword] = useState(false);

    const LoginSchema = Yup.object().shape({
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        email: Yup.string()
            .required('Email is required')
            .email('Email must be a valid email address'),
        password: Yup.string().required('Password is required'),
    });

    const defaultValues = {
        firstName: '',
        lastName: '',
        email: 'demo123@gmail.com',
        password: 'demo123',
    };

    const methods = useForm({
        resolver: yupResolver(LoginSchema),
        defaultValues,
    });

  

    const { reset, setError, watch ,trigger, handleSubmit, formState: { errors } } = methods;

    const onSubmit = async (data) => {
        try {
            // handle submit
            console.log("data===>",data)
            dispatch(RegisterUser(data)); // Replace this with your submit logic
        } catch (error) {
            console.error('Submission error:', error.message);
            reset();
            setError('afterSubmit', {
                type: 'manual',
                message: error.message,
            });
        }
    };
    useEffect(() => {
        const subscription = watch(({ name }) => {
        if (name) {
           trigger(name);
          }
        });

        return () => subscription.unsubscribe();

        }, [watch,trigger]);
    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                {!!errors.afterSubmit && (
                    <Alert severity="error">{errors.afterSubmit?.message}</Alert>
                )}
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    justifyContent="space-between"
                    spacing={2}
                    alignItems="center"
                >
                    <RHFTextField name="firstName" label="First name" fullWidth/>
                    <RHFTextField name="lastName" label="Last name" fullWidth />
                </Stack>
                <RHFTextField name="email" label="Email address" type="email" />
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
                <Stack alignItems="flex-end" sx={{ my: 2 }}>
                    <Link to="/auth/reset-password" variant="body2" color="inherit" underline="always">
                        Forgot Password
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
                    Create Account
                </Button>
            </Stack>
        </FormProvider>
    );
};

export default RegisterForm;
