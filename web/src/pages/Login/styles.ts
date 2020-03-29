import { Form } from "@unform/web";
import styled from "-/lib/StyledComponents";

export const Container = styled.div`
  flex: 1;
  height: 100vh;
  background-color: ${props => props.theme.primary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const FormContainer = styled(Form)`
  background-color: ${props => props.theme.contrast};
  padding: 4rem 3rem;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Logo = styled.img.attrs({
  src: "/assets/filledLogo.svg",
})`
  width: 25rem;
  margin: 2rem;
`;
