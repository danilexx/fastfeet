import { lighten } from "polished";
import styled from "-/lib/StyledComponents";

type instanceType = "entregue" | "pendente" | "retirada" | "cancelada";

const getColor = (instance: instanceType, props: any) => {
  switch (instance) {
    case "entregue": {
      return props.theme.actions.sucess;
    }
    case "pendente": {
      return props.theme.actions.warn;
    }
    case "cancelada": {
      return props.theme.actions.error;
    }
    case "retirada": {
      return props.theme.actions.info;
    }
    default: {
      return props.theme.actions.sucess;
    }
  }
};
export const Container = styled.div<{ instance: instanceType }>`
  font-family: Roboto;
  font-weight: bold;
  text-transform: capitalize;
  border-radius: 14px;
  background-color: ${props => lighten(0.3, getColor(props.instance, props))};
  color: ${props => getColor(props.instance, props)};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: fit-content;
  padding: 0.2rem 0.8rem;
  margin: 0;
`;

export const Dot = styled.div<{ instance: instanceType }>`
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
  background-color: ${props => getColor(props.instance, props)};
  border-radius: 50%;
`;
