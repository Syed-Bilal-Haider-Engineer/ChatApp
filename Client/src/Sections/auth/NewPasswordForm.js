import React, { useState } from 'react';
import RHFTextField from '../../components/hook-form/RHFTextField';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'; // Ensure this import is present
import FormProvider from '../../components/hook-form/FormProvider';
import {
    Alert,
    Button,
    IconButton,
    InputAdornment,
    Stack,
    useTheme,
} from '@mui/material';
import { Eye, EyeSlash } from 'phosphor-react';
import {NewPassword} from '../../redux/slices/auth.js'
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

const SetNewPassword = () => {
    const dispatch = useDispatch()
    const [queryParameters] = useSearchParams();
    const [showPassword, setShowPassword] = useState(false)
    const [confirmPassword,setConfirmPassword] = useState(false)
    const theme = useTheme();
    const ResetPasswordFormSchema = Yup.object().shape({
        newPassword: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
        confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    });

    const defaultValues = {
        newPassword: '',
        confirmPassword: '',
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
            console.log(data);
            dispatch(NewPassword({...data, token: queryParameters.get('token')})); // Replace this with your submit logic
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
                <RHFTextField
                    name="newPassword"
                    label="new password"
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
                <RHFTextField
                    name="confirmPassword"
                    label="confirm password"
                    type={confirmPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setConfirmPassword(!confirmPassword)}
                                    edge="end"
                                >
                                    {confirmPassword ? <Eye /> : <EyeSlash />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
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
                    Change Password
                </Button>
            </Stack>
        </FormProvider>
    );
};

export default SetNewPassword;
