
import React from 'react';
import { PulseLoader } from 'react-spinners';
import './Loader.scss';

export interface LoaderProps {
  loading: boolean;
}

const Loader: React.FunctionComponent<LoaderProps> = ({ loading }) => {
  return (
    <div className="gc-loader__container">
      <PulseLoader
        color="#009688"
        sizeUnit="px"
        size={ 15 }
        loading={ loading }
      />
    </div>
  );
};

export default Loader;
