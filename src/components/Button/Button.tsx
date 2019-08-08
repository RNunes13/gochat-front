
import * as React from 'react';
import classNames from 'classnames';

// Material UI
import { withStyles, WithStyles, Theme, createStyles } from '@material-ui/core/styles';
import ButtonUI, { ButtonProps as ButtonUIProps } from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Icon from '@material-ui/core/Icon';

const styles = ({ spacing }: Theme) => createStyles({
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});

interface ButtonProps extends WithStyles<typeof styles> {
  text: string;
  icon?: string;
  loading?: boolean;
  iconPosition?: 'left' | 'right';
}

const Button: React.FunctionComponent<ButtonProps & ButtonUIProps> = ({
  text,
  icon,
  classes,
  loading,
  className,
  iconPosition = 'left',
  ...props
}) => {  
  return (
    <div style={{ position: 'relative', display: 'inline' }}>
      <ButtonUI className={ classNames('gc-button', className) } { ...props }>
        {
          (icon && iconPosition === 'left') &&
          <Icon className={ classes.iconLeft }>{ icon }</Icon>
        }
        { text }
        {
          (icon && iconPosition === 'right') &&
          <Icon className={ classes.iconRight }>{ icon }</Icon>
        }
      </ButtonUI>
      {
        loading &&
        <CircularProgress
          size={ 24 }
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            color: '#009688',
            marginTop: -12,
            marginLeft: -12
          }}
        />
      }
    </div>
  );
};

export default withStyles(styles)(Button);
