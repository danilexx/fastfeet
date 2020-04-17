import * as React from "react";
import { RouteComponentProps } from "@reach/router";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import showError from "-/utils/showError";
import {
  Background,
  Header,
  FormSection,
  Row,
  Buttons,
} from "-/components/styles";
import Input from "-/components/Input";
import { IconedButton, LoadingIconedButton } from "-/components/Button";
import validate from "-/utils/validate";
import useAwait from "-/utils/useAwait";
import { createRecipient } from "-/services";
import { recipientValidationSchema } from "-/utils/validationSchemas";
import MaskedInput from "-/components/Input/MaskedInput";

Yup.setLocale({
  mixed: {
    required: "Obrigatorio",
  },
});

const CreateRecipient: React.FC<RouteComponentProps> = ({ navigate }) => {
  const formRef = React.useRef<FormHandles>(null);

  const handleBack = () => {
    if (navigate) {
      navigate("../");
    }
  };
  const [loading, fetch, { toggle }] = useAwait(createRecipient);
  const handleSubmit = async data => {
    const isValid: boolean = await validate(
      recipientValidationSchema,
      data,
      formRef
    );
    if (!isValid) return;
    try {
      await fetch({
        ...data,
        number: Number(data.number),
      });
      if (navigate) {
        navigate("../");
      }
    } catch (err) {
      toggle(false);
      showError(err);
    }
  };
  const submitForm = () => {
    if (formRef.current) {
      formRef.current.submitForm();
    }
  };
  return (
    <Background>
      <Header>
        Cadastro de Destinatário
        <Buttons>
          <IconedButton onClick={handleBack} src="/assets/back.svg">
            Voltar
          </IconedButton>
          <LoadingIconedButton loading={loading} onClick={submitForm}>
            Criar
          </LoadingIconedButton>
        </Buttons>
      </Header>
      <FormSection ref={formRef} onSubmit={handleSubmit}>
        <Input placeholder="João" name="name" label="Nome" />
        <Row>
          <Input placeholder="Quinze de Maio" name="street" label="Rua" />
          <Input
            placeholder="579"
            width="15rem"
            name="number"
            type="number"
            label="Número"
          />
          <Input
            placeholder="Casa"
            width="15rem"
            name="complement"
            label="Complemento"
          />
        </Row>
        <Row>
          <Input placeholder="Suzano" name="city" label="Cidade" />
          <Input placeholder="São Paulo" name="state" label="Estado" />
          <MaskedInput mask="99999-999" name="cep" label="CEP" />
        </Row>
      </FormSection>
    </Background>
  );
};

export default CreateRecipient;
