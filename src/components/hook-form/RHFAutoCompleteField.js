import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import { Autocomplete, TextField } from '@mui/material';

// Define PropTypes for the component
RHFTextField.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    helpText: PropTypes.string,
};

export default function RHFTextAutoComplete({ name, helpText, ...other }) {
    const { control, setValue } = useForm();
    return (
        <Controller
            name={name}
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState: { error } }) => (
                <div style={{ width: '100%' }}>
                    <Autocomplete
                        {...field}
                        fullWidth
                        value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
                        {...other}
                        onChange={(event, newValue)=>{
                                setValue(name, newValue,{shouldValidate:true});
                                // field.onChange(newValue);
                        }}
                        renderInput={() => {
                            return <TextField label={label} error={!!error} helperText={error ? error.message : helpText}> </TextField>
                        }}
                    />
                </div>
            )}
        />
    );
}
