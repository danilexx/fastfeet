import * as React from 'react';
import { Container, Ball, Separator, Balls, StatusInfo, Info } from './styles';

const Status = ({ stage }) => (
  <Container>
    <Balls>
      <Ball full={stage >= 0} />
      <Separator />
      <Ball full={stage >= 1} />
      <Separator />
      <Ball full={stage >= 2} />
    </Balls>
    <StatusInfo>
      <Info>Aguardando Retirada</Info>
      <Info>Retirada</Info>
      <Info>Entregue</Info>
    </StatusInfo>
  </Container>
);

export default Status;
