import React, {
  ChangeEvent,
  useRef,
  useEffect,
  useCallback,
  useState,
} from "react";
import { useField } from "@unform/core";
import { ErrorMessage } from "../Input/styles";
import {
  Label,
  StyledInput,
  Container,
  InsertImageIcon,
  ImageIcon,
} from "./styles";

interface Props {
  name: string;
}
type InputProps = JSX.IntrinsicElements["input"] & Props;
const ImageInput: React.FC<InputProps> = ({ name, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [preview, setPreview] = useState(defaultValue);
  const handlePreview = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setPreview(null);
      return;
    }
    const previewURL = URL.createObjectURL(file);
    setPreview(previewURL);
  }, []);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "files[0]",
      clearValue(ref: HTMLInputElement) {
        ref.value = "";
        setPreview(null);
      },
      setValue(_: HTMLInputElement, value: string) {
        setPreview(value);
      },
    });
  }, [fieldName, registerField]);
  return (
    <>
      <Label htmlFor="file-upload">
        <Container>
          {preview ? (
            <ImageIcon src={preview} alt="Preview" width="100" />
          ) : (
            <>
              <InsertImageIcon />
              Adicionar Foto
            </>
          )}
        </Container>
      </Label>
      <StyledInput
        id="file-upload"
        type="file"
        accept=".png,.jpg,.jpeg"
        ref={inputRef as any}
        onChange={handlePreview}
        {...rest}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </>
  );
};
export default ImageInput;
