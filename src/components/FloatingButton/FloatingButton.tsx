
import * as React from 'react';
import classNames from 'classnames';

// Material UI
import { withStyles, WithStyles, Theme, createStyles } from '@material-ui/core/styles';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

const styles = ({ spacing, palette }: Theme) => createStyles({
  overlay: {
    position: 'fixed',
    top: 0,
    bottom:0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    zIndex: 1101,
    transitionProperty: 'opacity, visibility',
    transitionDuration: '250ms',
    transitionTimingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    '&.is--hide': {
      opacity: 0,
      visibility: 'hidden',
    }
  },
  mainButton: {
    position: 'fixed',
    zIndex: 1102,
  },
  actionsButton: {
    backgroundColor: palette.secondary.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: palette.secondary.dark,
    },
  },
  tooltip: {
    backgroundColor: palette.secondary.dark,
    color: '#fff',
    fontSize: 13,
  }
});

interface Props extends WithStyles<typeof styles> {
  actions: IAction[];
}

export interface IAction {
  icon: React.ComponentType<SvgIconProps>;
  name: string;
  onClick: () => void;
}

const FloatingButton: React.FunctionComponent<Props> = ({ classes, actions }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  
  const handleClose = () => setOpen(false);

  const handleClick = () => setOpen(open => !open);

  return (
    <div className="gc-floating-button">
      <div className={ classNames(classes.overlay, { 'is--hide': !open }) }/>
      <SpeedDial
        ariaLabel="Ações"
        icon={ <SpeedDialIcon /> }
        className={ classes.mainButton }
        onBlur={ handleClose }
        onClick={ handleClick }
        onClose={ handleClose }
        onFocus={ handleOpen }
        onMouseEnter={ handleOpen }
        onMouseLeave={ handleClose }
        open={ open }
        direction="up"
      >
        {actions.map(action => (
          <SpeedDialAction
            key={ action.name }
            className={ classes.actionsButton }
            icon={ action.icon }
            tooltipTitle={ action.name }
            TooltipClasses={{ tooltip: classes.tooltip }}
            onClick={ action.onClick }
          />
        ))}
      </SpeedDial>
    </div>
  );
};

export default withStyles(styles)(FloatingButton)
