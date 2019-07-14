
import * as React from 'react';
import './Placeholder.scss';

interface IContactPlaceholder {
  number: number;
}

const ContactPlaceholder: React.FunctionComponent<IContactPlaceholder> = ({ number }) => {
  return (
    <div className="gc-contacts-placeholder">
      {
        Array(number).fill(null).map((_, idx) => (
          <div
            key={`${idx + 1}`}
            className="gc-contacts-placeholder__item"
          >
            <div className="gc-contacts-placeholder__animate image"/>
            <div className="gc-contacts-placeholder__wrap">
              <div className="gc-contacts-placeholder__animate name" />
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default ContactPlaceholder;

