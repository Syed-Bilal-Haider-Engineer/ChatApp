import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import { Autocomplete, TextField } from '@mui/material';

const RHFTextAutoComplete = ({ name, label, helpText, ...other }) => {
    const { control, setValue } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <div style={{ width: '100%' }}>
                    <Autocomplete
                        {...field}
                        fullWidth
                        value={field.value || ''}
                        {...other}
                        onChange={(event, newValue) => {
                            setValue(name, newValue, { shouldValidate: true });
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={label}
                                error={!!error}
                                helperText={error ? error.message : helpText}
                            />
                        )}
                    />
                </div>
            )}
        />
    );
};

RHFTextAutoComplete.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    helpText: PropTypes.string,
};

export default RHFTextAutoComplete;
