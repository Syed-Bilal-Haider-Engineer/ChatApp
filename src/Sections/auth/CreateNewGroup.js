import {
    Button, Stack, Alert,
} from '@mui/material';
import React from 'react';
import RHFTextField from '../../components/hook-form/RHFTextField';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormProvider from '../../components/hook-form/FormProvider';
import RHFTextAutoComplete from '../../components/hook-form/RHFAutoCompleteField';
import { useTheme } from '@emotion/react';

const CreateNewGroup = ({onConfirm}) => {
    const theme = useTheme();
    const members = ["Name 1", 'Name 2', 'Name 3', 'Name 4', 'Name 5'];

    const createGroupSchema = Yup.object().shape({
        title: Yup.string().min(6, "Title must be at least 6 characters").required("Title is required"),
        members: Yup.array().min(1, "At least one member is required").required("Members are required"),
    });

    const defaultValues = {
        title: '',
        members: [],
    };

    const method = useForm({
        resolver: yupResolver(createGroupSchema),
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
            console.log(data); // Replace this with your submit logic
        } catch (error) {
            console.error(error.message);
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
                <RHFTextField name="title" label="Group name" />
                <RHFTextAutoComplete
                    name="members"
                    label="Group members"
                    multiple
                    freeSolo
                    options={members}
                    ChipProps={{ size: 'medium' }}
                />
                <Button
                onClick={onConfirm}
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
                    Create Group
                </Button>
            </Stack>
        </FormProvider>
    );
};

export default CreateNewGroup;
