
import * as React from 'react';
import SignInForm from './Form/Form';
import './SignIn.scss';

interface SignInProps {
  handleSignUp(): void;
};

const SignIn: React.FunctionComponent<SignInProps> = ({ handleSignUp }) => {
  return (
    <div className="gc-sign-in">
      <SignInForm/>
      <div className="gc-sign-in__register">
        <span className="gc-sign-in__register--text">Não tem uma conta?</span>
        <a className="gc-sign-in__register--button" onClick={ handleSignUp }>Crie uma agora!</a>
      </div>
    </div>
  );
};

export default SignIn;
