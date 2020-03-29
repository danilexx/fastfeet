import React from "react";

import {
  Container,
  ButtonLoadingBar,
  ButtonIcon,
  IconedButtonContainer,
} from "./styles";

interface Props extends React.ButtonHTMLAttributes<any> {}
interface LoadingProps extends Props {
  loading?: boolean;
}

const Button: React.FC<Props> = ({ children, ...props }) => {
  return <Container {...props}>{children}</Container>;
};
export const LoadingButton: React.FC<LoadingProps> = ({
  children,
  loading,
  onClick,
  ...props
}) => {
  return (
    <Container
      onClick={e => {
        if (!loading && onClick) {
          onClick(e);
        }
      }}
      {...props}
    >
      {loading ? "Carregando..." : children}
      <ButtonLoadingBar loading={loading} />
    </Container>
  );
};

export const IconedButton: React.FC<Props & { src?: string }> = ({
  src = "/assets/plus.svg",
  children,
  ...props
}) => (
  <IconedButtonContainer {...props}>
    <ButtonIcon src={src} />
    {children}
  </IconedButtonContainer>
);
export const LoadingIconedButton: React.FC<Props & {
  src?: string;
  loading?: boolean;
}> = ({
  src = "/assets/plus.svg",
  children,
  loading = false,
  onClick,
  ...props
}) => (
  <IconedButtonContainer
    onClick={e => {
      if (!loading && onClick) {
        onClick(e);
      }
    }}
    {...props}
  >
    <ButtonIcon src={src} />
    {loading ? "Carregando..." : children}
    <ButtonLoadingBar loading={loading} />
  </IconedButtonContainer>
);

export default Button;
