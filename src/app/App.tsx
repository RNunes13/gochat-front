
import React from 'react';
import theme from '../config/theme';
import Auth from '../services/auth';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { MainRouter } from './Routes';
import { Loader } from '../components';
import { BrowserRouter as Router} from 'react-router-dom';
import './app.scss';

// Redux
import Redux, { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { AuthState } from '../store/auth/types';
import { GlobalState } from '../store/global/types';
import * as AuthActions from '../store/auth/actions';
import * as GlobalActions from '../store/global/actions';

interface AppProps {
  updateLoadingPage: typeof GlobalActions.updateLoadingPage;
  updateUser: typeof AuthActions.updateUser;
  auth: AuthState;
  global: GlobalState;
}

class App extends React.Component<AppProps> {
  componentDidMount() {
    Auth.checkUserLogged((user) => {
      this.props.updateUser(user);
      this.props.updateLoadingPage(false);
    });
  }

  render() {
    const { global } = this.props;

    return (
      <MuiThemeProvider theme={ theme }>
        {
          !global.loadingData ?
          <Router>
            <MainRouter />
          </Router> :
          <Loader loading />
        }
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  auth: state.auth,
  global: state.global,
});

const mapDispatchToProps = (dispatch: Redux.Dispatch) =>
  bindActionCreators({
    ...GlobalActions,
    ...AuthActions,
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
