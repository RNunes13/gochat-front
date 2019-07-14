
import * as React from 'react';
import Loadable from 'react-loadable';
import { Container, FloatingSingleButton, Loader } from '../../components';
import './Rooms.scss';

// Dynamic import
const loading = () => <Loader loading />

const Contacts = Loadable({ loader: () => import(/* webpackChunkName: "Contacts" */ '../../components/Contacts/Contacts'), loading });

export interface IRoomsProps {
}

export interface IRoomsState {
  showContacts: boolean;
}

export default class Rooms extends React.Component<IRoomsProps, IRoomsState> {
  constructor(props: IRoomsProps) {
    super(props);

    this.state = {
      showContacts: false,
    }
  }

  handleContactsModal = (newValue?: boolean) => {
    if (newValue !== undefined) {
      this.setState({ showContacts: newValue });
    } else {
      this.setState(prevState => ({ showContacts: !prevState.showContacts }));
    }
  }

  openContactList = () => {
    this.handleContactsModal(true);
  }

  render() {
    const { showContacts } = this.state;

    return (
      <section className="gc-rooms gc-section">
        <Container className="gc-rooms__container">
          Rooms list
          <Contacts
            isOpen={ showContacts }
            handlerModal={ this.handleContactsModal }
          />
          <FloatingSingleButton
            text="Contatos"
            color="primary"
            customIcon="people_icon"
            handleClick={ this.openContactList }
          />
        </Container>
      </section>
    );
  }
}
