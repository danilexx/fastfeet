import * as React from "react";
import { RouteComponentProps } from "@reach/router";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import { Background, Header, FormSection, Buttons } from "-/components/styles";
import Input from "-/components/Input";
import { IconedButton, LoadingIconedButton } from "-/components/Button";
import validate from "-/utils/validate";
import useAwait from "-/utils/useAwait";
import { createDeliveryman, uploadImage } from "-/services";
import { deliverymanValidationSchema } from "-/utils/validationSchemas";
import ImageInput from "-/components/ImageInput";
import getFileFormData from "-/utils/getFileFormData";
import showError from "-/utils/showError";

Yup.setLocale({
  mixed: {
    required: "Obrigatorio",
  },
});

const CreateDeliveryman: React.FC<RouteComponentProps> = ({ navigate }) => {
  const formRef = React.useRef<FormHandles>(null);

  const handleBack = () => {
    if (navigate) {
      navigate("../");
    }
  };
  const [loading, fetch, { toggle }] = useAwait(createDeliveryman);
  const handleSubmit = async data => {
    const isValid: boolean = await validate(
      deliverymanValidationSchema,
      data,
      formRef
    );
    if (!isValid) return;
    try {
      let avatar_id;
      if (data.avatar) {
        const avatarResponse = await uploadImage(getFileFormData(data.avatar));
        avatar_id = avatarResponse.data.id;
      }
      await fetch({
        ...data,
        ...(avatar_id ? { avatar_id } : {}),
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
        Cadastro de Entregadores
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
        <ImageInput name="avatar" />
        <Input placeholder="João" name="name" label="Nome" />
        <Input
          placeholder="joao@exemplo.com"
          type="email"
          name="email"
          label="Email"
        />
      </FormSection>
    </Background>
  );
};

export default CreateDeliveryman;
