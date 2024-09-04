import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import { TextField, FormHelperText } from '@mui/material';

// Define PropTypes for the component
RHFTextField.propTypes = {
  name: PropTypes.string.isRequired,
  helpText: PropTypes.string,
};

export default function RHFTextField({ name, helpText, ...other }) {
     const { control } = useForm()
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field, fieldState: { error } }) => (
        <div>
          <TextField
            {...field}
            fullWidth
            value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
            error={!!error}
            helperText={error ? error.message : helpText}
            {...other}
          />
              
        </div>
      )}
    />
  );
}
