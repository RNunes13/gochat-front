
import * as React from 'react';
import SignUpForm from './Form/Form';

interface SignUpProps {
  handleSignUp(): void;
};

const SignUp: React.FunctionComponent<SignUpProps> = ({ handleSignUp }) => {
  return (
    <div className="pk-sign-up">
      <SignUpForm handleSignUp={ handleSignUp } />
    </div>
  );
};

export default SignUp;
