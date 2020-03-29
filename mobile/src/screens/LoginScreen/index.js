import * as React from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/mobile';
import { Container, LoginButton, LoginButtonText, Logo, Input } from './styles';
import validate from '../../utils/validate';
import { useStoreActions } from 'easy-peasy';

const schema = Yup.object().shape({
  id: Yup.string()
    .required()
    .test('number', 'Não é um numero inteiro', value => !isNaN(value)),
});

const LoginScreen = ({ navigation }) => {
  const login = useStoreActions(state => state.deliveryman.login);
  const formRef = React.useRef(null);
  const handleSubmit = async data => {
    const isValid = await validate(schema, data, formRef);
    if (isValid) {
      try {
        await login({ id: data.id });
        navigation.navigate('Main');
      } catch (err) {
        formRef.current.setFieldError(
          'id',
          'id não corresponde a nenhum entregador',
        );
      }
    }
  };
  return (
    <Container>
      <Logo />
      <Form onSubmit={handleSubmit} ref={formRef}>
        <Input
          name="id"
          keyboardType="number-pad"
          placeholder="Informe seu ID de cadastro"
          maxLength={1}
        />
        <LoginButton
          onPress={() => {
            formRef.current.submitForm();
          }}>
          <LoginButtonText>Entrar no Sistema</LoginButtonText>
        </LoginButton>
      </Form>
    </Container>
  );
};

export default LoginScreen;
