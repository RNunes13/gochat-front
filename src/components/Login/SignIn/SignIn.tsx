
import * as React from 'react';
import SignInForm from './Form/Form';
import { User } from '../../../models';
import './SignIn.scss';

interface SignInProps {
  handleSignUp(): void;
  onSuccess(user: User): void;
};

const SignIn: React.FunctionComponent<SignInProps> = ({ handleSignUp, onSuccess }) => {
  return (
    <div className="gc-sign-in">
      <SignInForm onSuccess={ onSuccess } />
      <div className="gc-sign-in__register">
        <span className="gc-sign-in__register--text">Não tem uma conta?</span>
        <a className="gc-sign-in__register--button" onClick={ handleSignUp }>Crie uma agora!</a>
      </div>
    </div>
  );
};

export default SignIn;
