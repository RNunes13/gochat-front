
import * as React from 'react';
import ContactSearch from './Search/Search';
import ProgressiveImage from 'react-progressive-image';
import ContactPlaceholder from './Placeholder/Placeholder';
import ContactNavigation, { TabsType } from './Navigation/Navigation';
import { RemoveSpecialCharacters } from '../../utils';
import { Contact } from '../../models';
import './Contacts.scss';

// Material 
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import CloseIcon from '@material-ui/icons/ClearRounded';

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
  const [activeTab, setActiveTab] = React.useState<TabsType>('accepts');

  const { contacts, loadingContacts } = contact;
  const accepted = contacts.filter(c => c.status === 'accept');
  const pending = contacts.filter(c => c.status === 'pending');

  const renderAvatar = (contact: Contact) => {
    return (
      <ProgressiveImage 
        src={ contact.image_url || require('../../assets/images/placeholder.png') }
        placeholder=""
      >
        {(src: string, loading: boolean) => {
          if (loading) return <CircularProgress color="primary" size={ 35 } style={{ marginRight: 10 }} />;
          
          return <Avatar className="gc-contacts__user--image" alt={ name } src={ src } />
        }}
      </ProgressiveImage>
    );
  };

  const renderContacts = (items: Contact[]) => {
    const filteredContacts = items
      .filter((contact) => {
        if (!searchTerm) return contact;

        const contactNameFormatted = RemoveSpecialCharacters.remove(contact.name.toLocaleLowerCase());
        const searchTermFormatted = RemoveSpecialCharacters.remove(searchTerm.toLocaleLowerCase());

        return contactNameFormatted.match(searchTermFormatted) !== null;
      });

    if (!filteredContacts.length && searchTerm) return <span>Não há contatos com este nome.</span>

    if (!filteredContacts.length) return <span>Você ainda não tem contatos.</span>

    return (
      <ul className="gc-contacts__users">
        {
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

  const handleActiveTab = (value: TabsType) => {
    setActiveTab(value);
    setSearchTerm('');
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
        {
          !loadingContacts &&
          <React.Fragment>
            <ContactNavigation
              activeTab={ activeTab }
              setActiveTab={ handleActiveTab }
              disabledPendingTab={ pending.length < 1 }
            />
            {
              (
                (activeTab === 'accepts' && accepted.length) ||
                (activeTab === 'pending' && pending.length)
              ) &&
              <ContactSearch searchTerm={ searchTerm } setSearchTerm={ setSearchTerm } />
            }
          </React.Fragment>
        }
        <div className="gc-contacts__content">
          {
            loadingContacts ?
            <ContactPlaceholder number={ 3 } /> :
            renderContacts(activeTab === 'accepts' ? accepted : pending)
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
