
import * as React from 'react';
import './Heading.scss';

const Heading: React.FunctionComponent = () => {
  return (
    <div className="gc-login__heading">
      <figure className="gc-login__heading--icon">
        <img src={ require('assets/images/icon.png') } alt="GoChat - Icon"/>
      </figure>
      <figure className="gc-login__heading--name">
        <img src={ require('assets/images/name.png') } alt="GoChat - Name"/>
      </figure>
    </div>
  );
};

export default Heading;
