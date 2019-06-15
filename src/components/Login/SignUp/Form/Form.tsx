
import * as React from 'react';
import * as Yup from 'yup';
import { Input, Button } from '../../../index';
import { Formik, Form as FormikForm, FormikActions, Field, FieldProps, ErrorMessage } from 'formik';
import { withRouter, RouteComponentProps } from 'react-router';
import qs from 'querystring';

// Material UI
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

interface PropsType extends RouteComponentProps {
  handleSignUp(): void;
};

type FormType = {
  name: string;
  email: string;
  username: string;
  password: string;
};

const Form: React.FunctionComponent<PropsType> = ({ handleSignUp, history }) => {
  const [ showTooltip, handleTooltipState ] = React.useState<boolean>(false);
  const [ showPassword, setShowPassword ] = React.useState<boolean>(false);

  const handleTooltip = (open: boolean) => () => handleTooltipState(open);
  const toglePassword = () => setShowPassword(show => !show);
  
  const checkMark = `\u{2713}`;

  const tooltipTitle = (text: string) => (
    <div style={{ padding: 10, textAlign: "left"}}>
      <h4 style={{ marginBottom: 10 }}>Requisitos mínimos</h4>
      <ul style={{ fontSize: 13, listStyleType: "disc", marginLeft: 15 }}>
        <li>8 caracteres { text.length >= 8 ? checkMark : '' }</li>
        <li>1 letra maiúscula { /(?=.*[A-Z])/.test(text) ? checkMark : '' }</li>
        <li>1 letra minúscula { /(?=.*[a-z])/.test(text) ? checkMark : '' }</li>
        <li>1 número { /(?=.*[0-9])/.test(text) ? checkMark : '' }</li>
        <li>1 símbolo (! @ # $ % ^ & *) { /(?=[!@#\$%\^&\*])/.test(text) ? checkMark : '' }</li>
      </ul>
    </div>
  );
  
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Campo obrigatório'),
    email: Yup.string()
      .email('E-mail inválido')
      .required('Campo obrigatório'),
    username: Yup.string()
      .required('Campo obrigatório'),
    password: Yup.string()
      .required('Campo obrigatório')
      .min(8, 'A senha deve ter no mínimo 8 caracteres')
      // .matches(
      //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
      //   'A senha não atende todos os requisitos mínimos'
      // ),
  });
  
  const initialValues: FormType = {
    name: '',
    email: '',
    username: '',
    password: '',
  };

  const handleSubmit = async (values: FormType, actions: FormikActions<FormType>) => {
    const { name, email, password, username } = values;

    actions.setSubmitting(false);
  };

  return (
    <>
      <p className="gc-form__info">Preencha os campos abaixo para fazer o cadastro, é rapidinho.</p>
      <Formik
        validationSchema={ validationSchema }
        initialValues={ initialValues }
        onSubmit={ handleSubmit }
        render={({ errors, touched, isSubmitting, submitForm, values }) =>
          <FormikForm>
            <div className="gc-form__group">
              <Field
                name="name"
                render={(props: FieldProps) =>
                  <Input
                    id="name"
                    type="text"
                    label="Nome"
                    variant="outlined"
                    fieldProps={ props }
                    error={ errors.name }
                    touched={ touched.name }
                    autoFocus
                  />
                }
              />
              <ErrorMessage className="gc-form__error" name="name" component="div" />
            </div>
            <div className="gc-form__group">
              <Field
                name="email"
                render={(props: FieldProps) =>
                  <Input
                    id="email"
                    type="email"
                    label="Email"
                    variant="outlined"
                    fieldProps={ props }
                    error={ errors.email }
                    touched={ touched.email }
                  />
                }
              />
              <ErrorMessage className="gc-form__error" name="email" component="div" />
            </div>
            <div className="gc-form__group">
              <Field
                name="username"
                render={(props: FieldProps) =>
                  <Input
                    type="text"
                    id="username"
                    variant="outlined"
                    label="Nome de usuário"
                    fieldProps={ props }
                    error={ errors.email }
                    touched={ touched.email }
                  />
                }
              />
              <ErrorMessage className="gc-form__error" name="username" component="div" />
            </div>
            <div className="gc-form__group">
              <Field
                name="password"
                render={(props: FieldProps) =>
                  <Input
                    id="password"
                    label="Senha"
                    variant="outlined"
                    type={ showPassword ? 'text' : 'password' }
                    error={ errors.password }
                    touched={ touched.password }
                    fieldProps={ props }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="Toggle password visibility"
                            onClick={ toglePassword }
                          >
                            { showPassword ? <VisibilityOff /> : <Visibility /> }
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                }
              />
              <ErrorMessage className="gc-form__error" name="password" component="div" />
            </div>
            <div className="gc-form__group" style={{ marginTop: 20, marginBottom: 15, textAlign: "center" }}>
              <Button
                variant="contained"
                color="primary"
                text="Cadastrar"
                style={{ marginRight: 10 }}
                onClick={ submitForm }
                disabled={ isSubmitting }
                loading={ isSubmitting }
              />
              <Button
                color="secondary"
                text="Voltar"
                onClick={ handleSignUp }
                disabled={ isSubmitting }
              />
            </div>
          </FormikForm>
        }
      />
    </>
  );
};

export default withRouter(Form);
