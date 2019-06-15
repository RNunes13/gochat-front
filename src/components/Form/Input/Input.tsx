
import * as React from 'react';
import { FieldProps } from 'formik';
import TextField, { OutlinedTextFieldProps } from '@material-ui/core/TextField';

interface InputProps extends OutlinedTextFieldProps {
  error?: any;
  touched?: boolean;
  fieldProps: FieldProps;
}

const Input: React.FunctionComponent<InputProps> = ({
  error,
  touched,
  fieldProps,
  rows = 4,
  margin = 'normal',
  fullWidth = true,
  ...rest
}) => {
  return (
    <TextField
      rows={ rows }
      margin={ margin }
      fullWidth={ fullWidth }
      error={ Boolean(error) && touched }
      { ...rest }
      { ...fieldProps.field }
    />
  );
};

export default Input;
