import {
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Stack,
    Alert,
    Typography,
} from '@mui/material';
import React from 'react';
import RHFTextField from '../../components/hook-form/RHFTextField';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'; // Ensure this import is present
import FormProvider from '../../components/hook-form/FormProvider';
import RHFTextAutoComplete from '../../components/hook-form/RHFAutoCompleteField';

const CreateNewGroup = () => {

    const members=["Name 1", 'Name 2','Name 3','Name 4','Name 5']

    const creatGroupScheme = Yup.object().shape({
        title: Yup.string().min(6, "Title must be at least 6 characters").required("title is required"),
        members: Yup.string().min(2, "Must be at least 2 Members ").required("Members is required")
    });

    const defaultValues = {
        title: '',
        members: '',
    };

    const method = useForm({
        resolver: yupResolver(creatGroupScheme),
        defaultValues,
    });

    const {
        reset,
        setError,
        watch,
        handleSubmit,
        formState: { errors, isValid, isValidating, isSubmitting, isSubmitted, isSubmitSuccessful, isLoading },
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
                <RHFTextField
                    name="title"
                    label="Group name"
                    type="text"
                />
                <RHFTextAutoComplete
                 name="members"
                 label="Group members"
                 multiple
                 freeSolo
                 options={members.map(()=>{

                 })}
                />
                {/* <Button
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
                </Button> */}
            </Stack>
        </FormProvider>
    );
};

const Transition = React.forwardRef((props, ref) => (
    <Slide direction="up" ref={ref} {...props} />
));

const CreateGroup = ({ openNewGroup, handleClose, onConfirm }) => (
    <Dialog
        open={openNewGroup}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
    >
            <DialogTitle p={0}>
                <Typography sx={{
                     '& .css-gqrey7-MuiTypography-root-MuiDialogTitle-root':{
                        padding: 0
                    }
                }} variant='subtitle2' component="p">
                Create a New Group
                </Typography>
            </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
                <CreateNewGroup />
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={onConfirm}>Yes</Button>
        </DialogActions>
    </Dialog>
);
export default CreateGroup