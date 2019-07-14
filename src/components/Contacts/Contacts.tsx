
import * as React from 'react';
import ProgressiveImage from 'react-progressive-image';
import { RemoveSpecialCharacters } from '../../utils';
import { Contact } from '../../models';
import './Contacts.scss';

// Material 
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import CloseIcon from '@material-ui/icons/ClearRounded';
import CancelIcon from '@material-ui/icons/CancelRounded';

// Redux
import { connect } from 'react-redux';
import { AppState } from '../../store';
import { ContactState } from '../../store/contact/types';

interface IContactsProps {
  isOpen: boolean;
  contact: ContactState;
  handlerModal(show?: boolean): void;
}

const Contacts: React.FunctionComponent<IContactsProps> = ({ isOpen, contact, handlerModal }) => {
  if (!isOpen) return null;

  const [searchTerm, setSearchTerm] = React.useState<string>('');

  const { contacts, loadingContacts } = contact;

  const renderLoader = (
    <div style={{ textAlign: 'center' }}>
      <CircularProgress size={ 30 } />
    </div>
  );

  const renderEmpty = (
    <p>
      Você ainda não tem contatos
    </p>
  );

  const renderAvatar = (contact: Contact) => {
    return (
      <ProgressiveImage 
        src={ contact.image_url || require('../../assets/images/placeholder.png') }
        placeholder=""
      >
        {(src: string, loading: boolean) => {
          if (loading) return <CircularProgress color="inherit" />;
          
          return <Avatar className="gc-contacts__user--image" alt={ name } src={ src } />
        }}
      </ProgressiveImage>
    );
  };

  const renderContacts = () => {
    const filteredContacts = contacts
      .filter((contact) => {
        if (!searchTerm) return contact;

        const contactNameFormatted = RemoveSpecialCharacters.remove(contact.name.toLocaleLowerCase());
        const searchTermFormatted = RemoveSpecialCharacters.remove(searchTerm.toLocaleLowerCase());

        return contactNameFormatted.match(searchTermFormatted) !== null;
      });

    return (
      <ul className="gc-contacts__users">
        {
          !filteredContacts.length ?
          'Não há contatos com este nome' :
          filteredContacts
          .map(contact =>
            <li key={ contact.id } className="gc-contacts__user">
              { renderAvatar(contact) }
              <span className="gc-contacts__user--name">{ contact.name }</span>
            </li>
          )
        }
      </ul>
    );
  };

  return (
    <section className="gc-contacts">
      <div className="gc-contacts__backdrop" onClick={ () => handlerModal(false) } />
      <div className="gc-contacts__wrap">
        <div className="gc-contacts__heading">
          <Typography className="gc-contacts__heading--title" variant="h2">Contatos</Typography>
          <IconButton aria-label="Close" size="small" onClick={ () => handlerModal(false) }>
            <CloseIcon />
          </IconButton>
        </div>
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
        <div className="gc-contacts__content">
          {
            loadingContacts ?
            renderLoader :
            !contacts.length ?
            renderEmpty :
            renderContacts()
          }
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state: AppState) => ({
  contact: state.contact,
});

export default connect(mapStateToProps)(Contacts);
