
import React from 'react';
import theme from '../config/theme';
import Typography from '@material-ui/core/Typography';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { MainRouter } from './Routes';
import { BrowserRouter as Router} from 'react-router-dom';
import './app.scss';

interface AppProps {
}

class App extends React.Component<AppProps> {
  render() {
    return (
      <MuiThemeProvider theme={ theme }>
        <Router>
          <Typography style={{ textAlign: 'center' }}>GoChat - FrontEnd</Typography>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
