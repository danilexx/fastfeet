import * as React from "react";
import { RouteComponentProps } from "@reach/router";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import { Background, Header, FormSection, Buttons } from "-/components/styles";
import Input from "-/components/Input";
import { IconedButton, LoadingIconedButton } from "-/components/Button";
import validate from "-/utils/validate";
import useAwait from "-/utils/useAwait";
import { updateDeliveryman, uploadImage } from "-/services";
import { deliverymanValidationSchema } from "-/utils/validationSchemas";
import ImageInput from "-/components/ImageInput";
import getFileFormData from "-/utils/getFileFormData";
import getAvatarUrl from "-/utils/getAvatarUrl";

Yup.setLocale({
  mixed: {
    required: "Obrigatorio",
  },
});

const EditDeliveryman: React.FC<RouteComponentProps> = ({
  navigate,
  location,
}) => {
  const formRef = React.useRef<FormHandles>(null);
  const { currentRow: initialData } = location?.state as any;
  React.useEffect(() => {
    const haveValue = !(location?.state as any)?.currentRow;
    if (haveValue && navigate) {
      navigate("../");
    }
  }, [location, navigate]);

  const handleBack = () => {
    if (navigate) {
      navigate("../");
    }
  };
  const update = React.useCallback(updateDeliveryman(initialData.id), [
    initialData,
  ]);
  const [loading, fetch, { toggle }] = useAwait(update);
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
      console.error(err);
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
        Edição de Entregadores
        <Buttons>
          <IconedButton onClick={handleBack} src="/assets/back.svg">
            Voltar
          </IconedButton>
          <LoadingIconedButton
            loading={loading}
            onClick={submitForm}
            src="/assets/correct.svg"
          >
            Salvar
          </LoadingIconedButton>
        </Buttons>
      </Header>
      <FormSection
        initialData={{
          ...initialData,
          avatar: getAvatarUrl(initialData.avatar),
        }}
        ref={formRef}
        onSubmit={handleSubmit}
      >
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

export default EditDeliveryman;
