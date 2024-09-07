import React, {useCallback} from 'react';
import RHFTextField from '../../components/hook-form/RHFTextField';
import * as Yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup'; // Ensure this import is present
import FormProvider from '../../components/hook-form/FormProvider';
import {
  Alert,
  Button,
  Stack,
} from '@mui/material';

const ProfileForm = () => {
  const ProfileSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    about: Yup.string().required('About is required'),
    avatarURL: Yup.string().required('Avatar is required').nullable(true),
  });

  const defaultValues = {
    name: '',
    about: '',
  };

  const method = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    setValue,
    control,
    watch,
    handleSubmit,
    formState: {errors},
  } = method;

  const values = watch();
  const handleDrop = useCallback(
    (acceptedValue) => {
      const file = acceptedValue[0];

      const newFile = Object.assign(file, {
        previewFile: URL.createObjectURL(file),
      });

      if (newFile) {
        setValue('avatarURL', newFile, {shouldValidate: true});
      }
    },
    [setValue]
  );
  const onSubmit = async (data) => {
    try {
      // handle submit
      console.log(data); // Replace this with your submit logic
    } catch (error) {
      console.log(errors.afterSubmit.message, 'errors.afterSubmit.message');
      reset();
      setError('afterSubmit', {
        type: 'manual',
        message: error.message,
      });
    }
  };

  return (
    <FormProvider methods={method} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Stack spacing={3}>
          {!!errors.afterSubmit && (
            <Alert severity="error">{errors.afterSubmit.message}</Alert>
          )}
          <RHFTextField
            name="name"
            label="Name"
            helpText="This name is visible on other contact"
          />
          <RHFTextField
            multiline
            rows={4}
            maxRows={5}
            name="about"
            label="about"
          />
        </Stack>
        <Stack direction="row" justifyContent="end">
          <Button color="primary" size="large" type="submit" variant="outlined">
            Create
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

export default ProfileForm;
