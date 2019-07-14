
import * as React from 'react';

// Material UI
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/CancelRounded';

interface IContactSearchProps {
  searchTerm: string;
  setSearchTerm(value: string): void;
}

const ContactSearch: React.FunctionComponent<IContactSearchProps> = ({
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <div className="gc-contacts__search">
      <TextField
        color="primary"
        id="search-contacts"
        value={ searchTerm }
        label="Buscar contatos"
        className="gc-contacts__search--input"
        onChange={ e => setSearchTerm(e.currentTarget.value) }
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                size="small"
                onClick={ () => setSearchTerm('') }
              >
                { searchTerm && <CancelIcon fontSize="small" /> }
              </IconButton>
            </InputAdornment>
          ),
        }}
        fullWidth
      />
    </div>
  );
};

export default ContactSearch;

