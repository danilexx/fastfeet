import * as React from "react";
import { Container, BlackBackground } from "./styles";

interface Props {
  children: React.ReactNode;
  active: boolean;
  setter: any;
}

const Modal: React.FC<Props> = ({ children, active, setter }) => {
  const exit = React.useCallback(() => {
    setter(false);
  }, [setter]);
  return (
    <BlackBackground onClick={exit} active={active}>
      <Container>{children}</Container>
    </BlackBackground>
  );
};

export default Modal;
