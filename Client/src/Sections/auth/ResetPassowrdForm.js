import React from 'react';
import RHFTextField from '../../components/hook-form/RHFTextField';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'; // Ensure this import is present
import FormProvider from '../../components/hook-form/FormProvider';
import {
    Alert,
    Button,
    Stack,
    useTheme,
} from '@mui/material';

const ResetPasswordForm = () => {
    const theme = useTheme();
    const ResetPasswordFormSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required')
            .email('Email must be a valid email address')
    });

    const defaultValues = {
        email: 'demo123@gmail.com',
    };

    const method = useForm({
        resolver: yupResolver(ResetPasswordFormSchema),
        defaultValues,
    });

    const {
        reset,
        setError,
        handleSubmit,
        formState: { errors },
    } = method;

    const onSubmit = async (data) => {
        try {
            // handle submit
            console.log(data); // Replace this with your submit logic
        } catch (error) {
            console.log(errors.afterSubmit.message, 'errors.afterSubmit.message')
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
                <RHFTextField name="email" label="Email address" />
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
                    Send Request
                </Button>
            </Stack>
        </FormProvider>
    );
};

export default ResetPasswordForm;
