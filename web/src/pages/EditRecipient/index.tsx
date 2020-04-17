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
import { updateRecipient } from "-/services";
import { recipientValidationSchema } from "-/utils/validationSchemas";

Yup.setLocale({
  mixed: {
    required: "Obrigatorio",
  },
});

const EditRecipient: React.FC<RouteComponentProps> = ({
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
  const update = React.useCallback(updateRecipient(initialData.id), [
    initialData,
  ]);
  const [loading, fetch, { toggle }] = useAwait(update);
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
        Edição de Destinatário
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
        initialData={initialData}
        ref={formRef}
        onSubmit={handleSubmit}
      >
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
          <Input placeholder="00000-000" name="cep" label="CEP" />
        </Row>
      </FormSection>
    </Background>
  );
};

export default EditRecipient;
