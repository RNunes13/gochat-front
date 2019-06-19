
import * as React from 'react';
import Auth from '../../../services/auth';
import ProgressiveImage from 'react-progressive-image';
import { openSnackbar } from '../../Notifier/Notifier';
import { RouteComponentProps, withRouter } from 'react-router';

// Material UI
import IconButton from '@material-ui/core/IconButton';
import MenuUI from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

// Redux
import Redux, { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../../../store';
import { AuthState } from '../../../store/auth/types';
import * as AuthActions from '../../../store/auth/actions';

interface PropsType extends RouteComponentProps {
  auth: AuthState;
  updateUser: typeof AuthActions.updateUser;
}

const Menu: React.FunctionComponent<PropsType> = ({ auth, updateUser, history }) => {
  const [menu, setMenu] = React.useState<HTMLElement | null>(null);
  
  const { name } = auth.user!;

  const handleMenu = (event: React.MouseEvent) => setMenu(event.currentTarget as HTMLElement);

  const closeMenu = () => setMenu(null);

  const redirect = (link: string) => {
    closeMenu();
    history.push(link);
  };

  const logout = () => {
    Auth.logout((successful) => {
      if (successful) {
        updateUser(null);
        redirect('/login');
      } else {
        openSnackbar({
          message: 'Ocorreu um erro no logout. Tente novamente em instantes.',
          variant: 'error',
          delay: 10000,
        })
      }
    });
  };

  const renderAvatar = (
    <ProgressiveImage 
      src={ require('../../../assets/images/placeholder.png') }
      placeholder=""
    >
      {(src: string, loading: boolean) => {
        if (loading) return <CircularProgress color="inherit" />;
        
        return <Avatar alt={ name } src={ src } />
      }}
    </ProgressiveImage >
  );

  return (
    <div>
      <IconButton
        aria-owns={ menu ? 'menu-appbar' : undefined }
        aria-haspopup="true"
        onClick={ handleMenu }
        color="inherit"
        style={{ padding: 8 }}
      >
        { renderAvatar }
      </IconButton>
      <MenuUI
        id="menu-appbar"
        anchorEl={ menu }
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={ Boolean(menu) }
        onClose={ closeMenu }
      >
        <MenuItem disabled style={{ display: 'flex', justifyContent: 'center' }} >
          { name }
        </MenuItem>
        <Divider />
        <MenuItem onClick={ logout }>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Sair" />
        </MenuItem>
      </MenuUI>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch: Redux.Dispatch) =>
  bindActionCreators({
    ...AuthActions,
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Menu));
