
import * as React from 'react';
import * as Yup from 'yup';
import Auth from '../../../../services/auth';
import { User } from '../../../../models';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Input, Button } from '../../../index';

// Material UI
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

// Redux
import Redux, { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../../../../store';
import * as AuthActions from '../../../../store/auth/actions';

import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FormikActions,
  FieldProps,
} from 'formik';

interface LoginFormProps {
  updateUser: typeof AuthActions.updateUser;
  history: any;
}

type FormType = {
  username: string;
  password: string;
};

const LoginForm: React.FunctionComponent<LoginFormProps> = ({ updateUser, history }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const initialValues: FormType = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Campo obrigatório'),
    password: Yup.string()
      .required('Campo obrigatório')
      .min(8, 'A senha deve ter no mínimo 8 caracteres'),
  });

  const onSubmit = (values: FormType, actions: FormikActions<FormType>) => {
    Auth.login(values.username, values.password)
      .then((user: User) => {
        console.log('user', user);
        updateUser(user);
        history.push('/');
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => actions.setSubmitting(false));
  };

  const handleClickShowPassword = () => setShowPassword(show => !show);
  
  return (
    <>
      <p className="gc-form__info">Faça o login para acesso a aplicação</p>
      <Formik
        initialValues={ initialValues }
        validationSchema={ validationSchema }
        onSubmit={ onSubmit }
        render={({ errors, touched, isSubmitting }) =>
          <Form className="gc-login__form">
            <div className="gc-form__group">
              <Field
                name="username"
                render={(props: FieldProps) =>
                  <Input
                    id="username"
                    type="text"
                    label="Usuário"
                    variant="outlined"
                    fieldProps={ props }
                    error={ errors.username }
                    touched={ touched.username }
                  />
                }
              />
              <ErrorMessage className="gc-form__error" component="div" name="username" />
            </div>
            <div className="gc-form__group">
              <Field
                name="password"
                render={(props: FieldProps) =>
                  <Input
                    id="password"
                    type={ showPassword ? 'text' : 'password' }
                    label="Senha"
                    variant="outlined"
                    fieldProps={ props }
                    error={ errors.password }
                    touched={ touched.password }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            aria-label="Toggle password visibility"
                            onClick={ handleClickShowPassword }
                          >
                            { showPassword ? <VisibilityOff /> : <Visibility /> }
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                }
              />
              <ErrorMessage className="gc-form__error" component="div" name="password" />
            </div>
            <div className="gc-form__group submit">
              <Button
                type="submit"
                text="Acessar"
                color="primary"
                variant="contained"
                loading={ isSubmitting }
                disabled={ isSubmitting }
              />
            </div>
          </Form>
        }
      />
    </>
  );
};

const mapStateToProps = (state: AppState, props: RouteComponentProps) => ({
  auth: state.auth,
  history: props.history,
});

const mapDispatchToProps = (dispatch: Redux.Dispatch) =>
  bindActionCreators(AuthActions, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginForm));
