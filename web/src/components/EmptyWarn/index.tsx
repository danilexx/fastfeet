import React from "react";
import { Container, EmptyImage, Message } from "./styles";

interface Props {
  children: React.ReactNode;
}

const EmptyWarn: React.FC<Props> = ({ children }) => {
  return (
    <Container>
      <EmptyImage />
      <Message>{children}</Message>
    </Container>
  );
};

export default EmptyWarn;
