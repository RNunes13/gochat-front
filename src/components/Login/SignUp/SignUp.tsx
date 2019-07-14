
import * as React from 'react';
import SignUpForm from './Form/Form';
import { User } from '../../../models';

interface SignUpProps {
  handleSignUp(): void;
  onSuccess(user: User): void;
};

const SignUp: React.FunctionComponent<SignUpProps> = ({ handleSignUp, onSuccess }) => {
  return (
    <div className="pk-sign-up">
      <SignUpForm handleSignUp={ handleSignUp } onSuccess={ onSuccess } />
    </div>
  );
};

export default SignUp;
