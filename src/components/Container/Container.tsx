
import * as React from 'react';
import classNames from 'classnames';

import './Container.scss';

interface ContainerProps {
  className?: string;
  style?: React.CSSProperties | undefined;
};

const Container: React.FunctionComponent<ContainerProps> = ({ className, style, children }) => {
  return (
    <div className={ classNames('gc-container', className) } style={ style }>
      { children }
    </div>
  )
}

export default Container;
