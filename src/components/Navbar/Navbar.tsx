
import * as React from 'react';
import Menu from './Menu/Menu';
import './Navbar.scss';

// Redux
import { connect } from 'react-redux';
import { AppState } from '../../store';
import { GlobalState } from '../../store/global/types';

// Material UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

interface Props {
  global: GlobalState;
  show: boolean;
}

const Navbar: React.FunctionComponent<Props> = ({ show, global }) => {
  const component = (
    <AppBar className="gc-navbar">
      <Toolbar>
        <Typography className="gc-navbar__title" variant="h6" color="inherit">
          { global.page }
        </Typography>
        <Menu />
      </Toolbar>
    </AppBar>
  );

  if (!show) return null;
  
  return component
}

const mapStateToProps = (state: AppState) => ({
  global: state.global,
});

export default connect(mapStateToProps)(Navbar);
