
import * as React from 'react';

// Material UI
import { withStyles, WithStyles, Theme, createStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';

const styles = ({ spacing }: Theme) => createStyles({
  fab: {
    margin: spacing(1),
  },
  icon: {
    marginRight: 5,
  },
  text: {
    fontSize: 14,
    fontWeight: 500,
  }
});

interface Props extends WithStyles<typeof styles> {
  text?: string;
  customIcon?: string;
  color?: 'default' | 'inherit' | 'secondary' | 'primary';
  handleClick(): void;
}

const SingleButton: React.FunctionComponent<Props> = ({ customIcon, color, text, classes, handleClick }) => {
  return (
    <Fab
      color={ color }
      onClick={ handleClick }
      className={ classes.fab }
      classes={{ root: "gc-single-button" }}
      variant={ text ? 'extended' : 'round' }
    >
      <Icon className={ classes.icon }>{ customIcon || 'add_icon' }</Icon>
      <span className={ classes.text }>{ text }</span>
    </Fab>
  );
};

export default withStyles(styles)(SingleButton)
