
import * as React from 'react';
import qs from 'querystring';
import Auth from '../../services/auth';
import { RouteComponentProps } from 'react-router-dom';
import { LoginHeading, SignIn, SignUp } from '../../components';
import './Login.scss';

export interface LoginProps extends RouteComponentProps {
}

export interface LoginState {
  showSignUp: boolean;
}

export default class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);

    this.state = {
      showSignUp: false,
    };

    this.handleSignUp = this.handleSignUp.bind(this);
  }

  componentWillMount() {
    const query = this.props.location!.search.replace('?', '');  
    const destiny = qs.parse(query).from as string || '/';

    if (Auth.getCurrentUser()) this.props.history.push(destiny);
  }

  handleSignUp() {
    this.setState(prevState => ({ showSignUp: !prevState.showSignUp }));
  }

  public render() {
    return (
      <section className="gc-login">
        <div className="gc-login__wrap">
          <LoginHeading />
          {
            this.state.showSignUp ?
            <SignUp handleSignUp={ this.handleSignUp } /> :
            <SignIn handleSignUp={ this.handleSignUp } /> 
          }
        </div>
      </section>
    );
  }
}
