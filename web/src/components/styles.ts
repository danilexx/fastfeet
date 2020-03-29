import { Form } from "@unform/web";
import styled from "-/lib/StyledComponents";

import { Container } from "-/components/Input/styles";
import { IconedButtonContainer } from "-/components/Button/styles";

export const Background = styled.div`
  height: 100%;
  margin: 0;
  padding: 2rem 10rem;
`;

export const TopSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Header = styled.div`
  color: ${props => props.theme.gray[0]};
  font-family: Roboto;
  padding: 2rem 0;
  margin: 0;
  font-weight: bold;
  font-size: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const FormSection = styled(Form)`
  padding: 1rem 3rem;
  background-color: ${props => props.theme.contrast};
  border-radius: 4px;
  border: 1px solid ${props => props.theme.gray[2]};
  box-shadow: 0px 4px 2px rgba(0, 0, 0, 0.05);
  padding-bottom: 3rem;
`;

export const Row = styled.div`
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
  & ${Container} {
    margin: 0.5rem 1rem;
    width: fit-content;
    &:last-of-type {
      margin-right: 0;
    }
    &:first-of-type {
      margin-left: 0;
    }
  }
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  ${IconedButtonContainer} {
    margin: 0.5rem 1rem;
  }
`;
