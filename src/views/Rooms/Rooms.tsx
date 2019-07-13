
import * as React from 'react';
import { Container } from '../../components';
import './Rooms.scss';

export interface IRoomsProps {
}

export interface IRoomsState {
}

export default class Rooms extends React.Component<IRoomsProps, IRoomsState> {
  constructor(props: IRoomsProps) {
    super(props);

    this.state = {
    }
  }

  public render() {
    return (
      <section className="gc-rooms gc-section">
        <Container className="gc-rooms__container">
          Rooms list
        </Container>
      </section>
    );
  }
}
