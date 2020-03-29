import * as React from "react";
import { Link as BaseLink, navigate } from "@reach/router";
import {
  Container,
  Logo,
  Separator,
  Links,
  LinkContainer,
  LinkAnchor,
  ProfileSection,
  AdminText,
  ExitButton,
} from "./styles";
import { ThemeContext } from "-/lib/StyledComponents";
import { useStoreActions } from "-/lib/EasyPeasy";

export const Link: React.FC<{
  children: React.ReactNode;
  href: string;
  partial?: boolean;
}> = ({ href, children, partial = true }) => {
  const theme = React.useContext(ThemeContext);
  return (
    <LinkContainer>
      <LinkAnchor
        getProps={({ isCurrent, isPartiallyCurrent }) => {
          const isActive = partial ? isPartiallyCurrent : isCurrent;
          return {
            style: {
              color: isActive ? theme.gray[0] : theme.gray[1],
            },
          };
        }}
        to={href}
      >
        {children}
      </LinkAnchor>
    </LinkContainer>
  );
};

const Nav = () => {
  const logout = useStoreActions(state => state.user.logout);

  const handleExit = () => {
    logout();
    navigate("/");
  };
  return (
    <Container>
      <BaseLink to="encomendas">
        <Logo />
      </BaseLink>
      <Separator />
      <Links>
        <Link href="encomendas">encomendas</Link>
        <Link href="entregadores">entregadores</Link>
        <Link href="destinatarios">destinatários</Link>
        <Link href="problemas">problemas</Link>
      </Links>
      <ProfileSection>
        <AdminText>Admin FastFeet</AdminText>
        <ExitButton
          onClick={() => {
            handleExit();
          }}
        >
          Sair
        </ExitButton>
      </ProfileSection>
    </Container>
  );
};

export default Nav;
