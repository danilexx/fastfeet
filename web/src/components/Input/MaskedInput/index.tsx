import React, { useRef, useEffect } from "react";
import ReactInputMask, { Props as InputProps } from "react-input-mask";
import { useField } from "@unform/core";
import { StyledLabel, ErrorMessage, StyledInput, Container } from "../styles";

interface Props {
  name: string;
  width?: string;
  label?: string;
}
const MaskedInput: React.FC<Props & InputProps> = ({
  name,
  width = "100%",
  label,
  ...rest
}) => {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
      setValue(ref: any) {
        ref.setInputValue("");
      },
      clearValue(ref: any) {
        ref.setInputValue("");
      },
    });
  }, [fieldName, registerField]);
  return (
    <Container
      style={{
        width,
      }}
    >
      {label && <StyledLabel htmlFor={fieldName}>{label}</StyledLabel>}
      <StyledInput
        as={ReactInputMask}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
};
export default MaskedInput;
