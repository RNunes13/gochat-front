
import React from 'react';
import theme from '../config/theme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { Auth, User as UserService } from '../services';
import { User } from '../models';
import { MainRouter } from './Routes';
import { Loader, Notifier, Navbar } from '../components';
import { BrowserRouter as Router} from 'react-router-dom';
import './app.scss';

// Redux
import Redux, { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { AuthState } from '../store/auth/types';
import { GlobalState } from '../store/global/types';
import { ContactState } from '../store/contact/types';
import * as AuthActions from '../store/auth/actions';
import * as GlobalActions from '../store/global/actions';
import * as ContactActions from '../store/contact/actions';

interface AppProps {
  updateLoadingContacts: typeof ContactActions.updateLoadingContacts;
  updateLoadingPage: typeof GlobalActions.updateLoadingPage;
  updateContacts: typeof ContactActions.updateContacts;
  updateUser: typeof AuthActions.updateUser;
  auth: AuthState;
  global: GlobalState;
  contact: ContactState;
}

class App extends React.Component<AppProps> {
  componentDidMount() {
    Auth.checkUserLogged((user) => {
      this.props.updateUser(user);
      this.props.updateLoadingPage(false);

      if (user) this.getUserContacts(user);
    });
  }

  getUserContacts(user: User) {
    this.props.updateLoadingContacts(true);

    UserService.getUserContacts(user, (contacts) => {
      this.props.updateContacts(contacts);
      this.props.updateLoadingContacts(false);
    });
  }

  render() {
    const { global, auth } = this.props;

    return (
      <MuiThemeProvider theme={ theme }>
        {
          !global.loadingData ?
          <React.Fragment>
            <Notifier />
            <Router>
              <React.Fragment>
                <Navbar show={ Boolean(auth.user) } />
                <MainRouter />
              </React.Fragment>
            </Router>
          </React.Fragment> :
          <Loader loading />
        }
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  auth: state.auth,
  global: state.global,
  contact: state.contact,
});

const mapDispatchToProps = (dispatch: Redux.Dispatch) =>
  bindActionCreators({
    ...ContactActions,
    ...GlobalActions,
    ...AuthActions,
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
