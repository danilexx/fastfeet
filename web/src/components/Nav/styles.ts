import { Link as BaseLink } from "@reach/router";
import { darken } from "polished";
import styled from "-/lib/StyledComponents";

export const Container = styled.div`
  width: 100%;
  border: 0.1rem solid ${props => props.theme.gray[2]};
  padding: 1rem 2rem;
  justify-content: flex-start;
  display: flex;
  align-items: center;
  flex-direction: row;
  background-color: ${props => props.theme.contrast};
`;

export const Logo = styled.img.attrs({
  src: "/assets/filledLogo.svg",
  alt: "Logo",
})`
  width: auto;
  height: 3rem;
  margin: 0 0.5rem;
`;

export const Separator = styled.div`
  height: 3rem;
  width: 1px;
  margin: 0 1rem;
  background-color: ${props => props.theme.gray[2]};
`;

export const Links = styled.ul`
  list-style: none;
  /* margin: 0 1.5rem; */
  padding: 0;
  display: flex;
  flex-direction: row;
`;

export const LinkContainer = styled.li`
  margin: 0 1.5rem;
`;

export const LinkAnchor = styled(BaseLink)<{ isActive?: boolean }>`
  font-size: 1.5rem;
  font-family: Roboto;
  text-transform: uppercase;
  font-weight: bold;
  text-decoration: none;
  &:hover {
    color: ${props => props.theme.primary};
  }
`;

export const ProfileSection = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const AdminText = styled.p`
  font-size: 1.5rem;
  font-family: Helvetica;
  color: ${props => props.theme.gray[1]};
  margin: 0 1rem;
`;

export const ExitButton = styled.button`
  color: ${props => props.theme.contrast};
  border: none;
  background-color: ${props => props.theme.actions.error};
  font-size: 1.5rem;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  &:hover {
    background-color: ${props => darken(0.1, props.theme.actions.error)};
  }
`;
