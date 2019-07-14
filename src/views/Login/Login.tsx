
import * as React from 'react';
import qs from 'querystring';
import { User } from '../../models';
import { RouteComponentProps } from 'react-router-dom';
import { Auth, User as UserService } from '../../services';
import { LoginHeading, SignIn, SignUp } from '../../components';
import './Login.scss';

// Redux
import Redux, { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import * as ContactActions from '../../store/contact/actions';

export interface LoginProps extends RouteComponentProps {
  updateContacts: typeof ContactActions.updateContacts;
  updateLoadingContacts: typeof ContactActions.updateLoadingContacts;
}

export interface LoginState {
  showSignUp: boolean;
}

class Login extends React.Component<LoginProps, LoginState> {
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

    window.document.body.classList.add('is--login-view');
  }

  componentWillUnmount() {
    window.document.body.classList.remove('is--login-view');
  }

  handleSignUp() {
    this.setState(prevState => ({ showSignUp: !prevState.showSignUp }));
  }

  onSuccess = (user: User) => {
    this.getUserContacts(user);
  }

  getUserContacts(user: User) {
    this.props.updateLoadingContacts(true);

    UserService.getUserContacts(user, (contacts) => {
      this.props.updateContacts(contacts);
      this.props.updateLoadingContacts(false);
    });
  }

  render() {
    return (
      <section className="gc-login">
        <div className="gc-login__wrap">
          <LoginHeading />
          {
            this.state.showSignUp ?
            <SignUp handleSignUp={ this.handleSignUp } onSuccess={ this.onSuccess } /> :
            <SignIn handleSignUp={ this.handleSignUp } onSuccess={ this.onSuccess } /> 
          }
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state: AppState) => ({});

const mapDispatchToProps = (dispatch: Redux.Dispatch) =>
  bindActionCreators({
    ...ContactActions,
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
