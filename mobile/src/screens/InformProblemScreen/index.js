import * as React from 'react';
import * as Yup from 'yup';
import {
  Container,
  BackButton,
  Title,
  Wrapper,
  TopBar,
  SendButton,
  SendButtonText,
} from '../../components/styles';
import Input from '../../components/Input';
import { Form } from '@unform/mobile';
import validate from '../../utils/validate';
import { createProblem } from '../../services';

const schema = Yup.object().shape({
  problem: Yup.string().required('Obrigatorio'),
});

const InformProblemScreen = ({ navigation, route }) => {
  const { deliveryId } = route.params.state;
  const formRef = React.useRef(null);
  const handleSubmit = async data => {
    const isValid = await validate(schema, data, formRef);
    if (isValid) {
      await createProblem(deliveryId, data.problem);
      navigation.goBack();
    }
  };
  return (
    <>
      <TopBar>
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Title>Informar Problema</Title>
      </TopBar>
      <Container>
        <Wrapper>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              name="problem"
              multiline
              numberOfLines={10}
              placeholder="Inclua aqui o problema que ocorreu na entrega"
            />
            <SendButton onPress={() => formRef.current.submitForm()}>
              <SendButtonText>Enviar</SendButtonText>
            </SendButton>
          </Form>
        </Wrapper>
      </Container>
    </>
  );
};

export default InformProblemScreen;
