
import * as React from 'react';
import * as Yup from 'yup';
import HttpClient from '../../../services/httpClient';
import { Input, Button } from '../../index';
import { HandlerError } from '../../../utils';
import { openSnackbar } from '../../Notifier/Notifier';
import { User, Auth, Contact } from '../../../services/index';
import { Formik, Form, Field, ErrorMessage, FormikActions, FieldProps } from 'formik';

// Material UI
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/CancelRounded';

interface IAddContactProps {
  handleAddContact(newValue: boolean): void;
}

type FormType = {
  username: string;
};

const HTTP = new HttpClient({ baseUrl: `${process.env.API_URL}/api` });

const AddContact: React.FunctionComponent<IAddContactProps> = ({ handleAddContact }) => {
  const [showAlertSucess, setShowAlertSuccess] = React.useState<boolean>(false);

  const initialValues: FormType = {
    username: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Usuário do contato é obrigatório'),
  });

  const onSubmit = async (values: FormType, actions: FormikActions<FormType>) => {
    const { username } = values;
    const owner = Auth.getCurrentUser()!;

    try {
      /*
        If the return is true, it means that there is no user with the username entered, otherwise a user was found.
        This function was used to avoid creating another that would basically have the same operation.
      */
      const availability = await User.checkUsernameAvailability(username);

      if (username === owner.username) {
        openSnackbar({
          variant: 'info',
          message: `Você quer conversar com você mesmo? \u{1F605} Tente outro usuário`,
          delay: 8000,
        });

        return;
      }

      if (availability) {
        openSnackbar({
          variant: 'info',
          message: 'Encontramos ninguém com este usuário registrado. ',
          delay: 8000,
        });

        return;
      }

      await Contact.create(owner, username);
      
      setShowAlertSuccess(true);
    } catch (err) {
      console.error(err);
      
      openSnackbar({
        message: HandlerError.getErrorMessage(err),
        variant: 'error',
        delay: 10000,
      });
    } finally {
      actions.setSubmitting(false);
    }
  };
  
  return (
    <React.Fragment>
      {
        showAlertSucess &&
        <div className="gc-contacts__alert success">
          <IconButton className="close" aria-label="Close" size="small" onClick={ () => setShowAlertSuccess(false) }>
            <CancelIcon />
          </IconButton>
          <p className="content">
            Solicitação enviada com sucesso! O contato adicionado foi notificado, e assim que ele aceitar sua solicitação, a conversa estará liberada para vocês. Enquanto isso, ele estará na aba <strong>pendentes</strong>.
          </p>
        </div>
      }
      <Formik
        initialValues={ initialValues }
        validationSchema={ validationSchema }
        onSubmit={ onSubmit }
        render={({ errors, touched, isSubmitting }) =>
          <Form className="gc-contacts__form">
            <div className="gc-form__group">
              <Field
                name="username"
                render={(props: FieldProps) =>
                  <Input
                    id="username"
                    type="text"
                    label="Usuário do contato"
                    variant="outlined"
                    fieldProps={ props }
                    error={ errors.username }
                    touched={ touched.username }
                    autoFocus
                  />
                }
              />
              <ErrorMessage className="gc-form__error" component="div" name="username" />
            </div>
            <div className="gc-form__group buttons">
              <Button
                type="submit"
                color="primary"
                icon="send_icon"
                variant="contained"
                iconPosition="right"
                text="Enviar solicitação"
                loading={ isSubmitting }
                disabled={ isSubmitting }
              />
              <Button
                color="secondary"
                text="Voltar"
                disabled={ isSubmitting }
                onClick={ () => handleAddContact(false) }
              />
            </div>
          </Form>
        }
      />
    </React.Fragment>
  );
};

export default AddContact;

