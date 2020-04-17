import * as React from "react";
import { RouteComponentProps } from "@reach/router";
import { FormHandles } from "@unform/core";
import {
  Background,
  Header,
  FormSection,
  Buttons,
  Row,
} from "-/components/styles";
import Input from "-/components/Input";
import { IconedButton, LoadingIconedButton } from "-/components/Button";
import validate from "-/utils/validate";
import useAwait from "-/utils/useAwait";
import { getRecipients, getDeliverymans, createDelivery } from "-/services";
import { deliveryValidationSchema } from "-/utils/validationSchemas";
import AsyncSelect from "-/components/AsyncSelect";

const prepareAsyncOptions = fn => async inputValue =>
  new Promise(resolve => {
    (async () => {
      const response = await fn({
        search: inputValue,
        page: 1,
        itemsPerPage: 99,
      });
      const data = response.data.items.map(e => ({
        value: e.id,
        label: e.name,
      }));
      resolve(data);
    })();
  });
const CreateDelivery: React.FC<RouteComponentProps> = ({ navigate }) => {
  const formRef = React.useRef<FormHandles>(null);
  const loadRecipients = prepareAsyncOptions(getRecipients);
  const loadDeliverymans = prepareAsyncOptions(getDeliverymans);
  const handleBack = () => {
    if (navigate) {
      navigate("../");
    }
  };
  const [loading, fetch, { toggle }] = useAwait(createDelivery);
  const handleSubmit = async data => {
    const isValid: boolean = await validate(
      deliveryValidationSchema,
      data,
      formRef
    );
    if (!isValid) return;
    try {
      await fetch(data);
      if (navigate) {
        navigate("../");
      }
    } catch (err) {
      toggle(false);
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
        Cadastro de Entregas
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
        <Row>
          <AsyncSelect
            loadOptions={loadRecipients}
            name="recipient_id"
            label="Destinatário"
          />
          <AsyncSelect
            loadOptions={loadDeliverymans}
            name="deliveryman_id"
            label="Entregador"
          />
        </Row>
        <Input placeholder="PS4" name="product" label="Nome do Produto" />
      </FormSection>
    </Background>
  );
};

export default CreateDelivery;
