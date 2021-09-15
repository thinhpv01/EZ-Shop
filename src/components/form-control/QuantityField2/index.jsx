import { Box, makeStyles, Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

QuantityField2.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    disabled: PropTypes.bool,
};

const useStyles = makeStyles((theme) => ({
    quantity: {
        display: 'flex',
        flexWrap: 'row nowrap',
    },
}));

function QuantityField2(props) {
    const classes = useStyles();
    const { form, name, label, disabled } = props;
    const {
        formState: { errors },
        setValue,
    } = form;
    const hasError = !!errors[name];
    return (
        <FormControl error={hasError} variant="outlined" margin="normal" size="small">
            <Typography>{label}</Typography>
            <Controller
                name={name}
                control={form.control}
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                    <Box className={classes.quantity}>
                        <IconButton
                            disabled={Number.parseInt(value) <= 1}
                            onClick={() => {
                                setValue(
                                    name,
                                    Number.parseInt(value) > 1
                                        ? Number.parseInt(value) - 1
                                        : 1
                                );
                            }}
                        >
                            <RemoveCircleOutlineIcon />
                        </IconButton>
                        <OutlinedInput
                            onChange={onChange}
                            value={value}
                            disabled={disabled}
                            variant="outlined"
                            id={name}
                            type="tel"
                        />
                        <IconButton
                            onClick={() => {
                                setValue(name, Number.parseInt(value) + 1);
                            }}
                        >
                            <AddCircleOutlineIcon />
                        </IconButton>
                    </Box>
                )}
            />
            <FormHelperText>{errors[name]?.message}</FormHelperText>
        </FormControl>
    );
}

export default QuantityField2;
