import React from "react";
import { Container, Type } from "./styles";

interface Props {
  onChange?: (selected: string) => void;
}

const DeliveriesTypeSwitch: React.FC<Props> = ({ onChange }) => {
  const [selected, setSelected] = React.useState("all");
  React.useEffect(() => {
    if (onChange) {
      onChange(selected);
    }
  }, [selected]);
  return (
    <Container>
      <Type
        isSelected={selected === "all"}
        onClick={() => {
          setSelected("all");
        }}
      >
        Todos
      </Type>
      <Type
        isSelected={selected === "problems-only"}
        onClick={() => {
          setSelected("problems-only");
        }}
      >
        Apenas Problemas
      </Type>
    </Container>
  );
};

export default DeliveriesTypeSwitch;
