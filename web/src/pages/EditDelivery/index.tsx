import * as React from "react";
import { RouteComponentProps } from "@reach/router";
import { FormHandles } from "@unform/core";
import showError from "-/utils/showError";
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
import { getRecipients, getDeliverymans, updateDelivery } from "-/services";
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
const EditDelivery: React.FC<RouteComponentProps> = ({
  navigate,
  location,
}) => {
  const formRef = React.useRef<FormHandles>(null);
  React.useEffect(() => {
    const haveValue = !(location?.state as any)?.currentRow;
    if (haveValue && navigate) {
      navigate("../");
    }
  }, [location, navigate]);
  const initialData = (location?.state as any)?.currentRow;
  const loadRecipients = prepareAsyncOptions(getRecipients);
  const loadDeliverymans = prepareAsyncOptions(getDeliverymans);
  const handleBack = () => {
    if (navigate) {
      navigate("../");
    }
  };
  const update = React.useCallback(updateDelivery(initialData.id), [
    initialData,
  ]);
  const [loading, fetch, { toggle }] = useAwait(update);
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
        Edição de Entregas
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
        <Row>
          <AsyncSelect
            loadOptions={loadRecipients}
            name="recipient_id"
            label="Destinatário"
            defaultValue={{
              value: initialData?.rest.recipient.id,
              label: initialData?.rest.recipient.name,
            }}
          />
          <AsyncSelect
            loadOptions={loadDeliverymans}
            name="deliveryman_id"
            label="Entregador"
            defaultValue={{
              value: initialData?.rest.deliveryman?.id,
              label: initialData?.rest.deliveryman?.name,
            }}
          />
        </Row>
        <Input placeholder="PS4" name="product" label="Nome do Produto" />
      </FormSection>
    </Background>
  );
};

export default EditDelivery;
