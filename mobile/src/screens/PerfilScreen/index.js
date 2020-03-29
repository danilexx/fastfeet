import * as React from 'react';
import { View, Text } from 'react-native';
import {
  BigDeliverymanPhoto,
  UserInformation,
  Information,
  Title,
  Content,
  LogoutButton,
  LogoutButtonWrapper,
} from './styles';
import { Container } from '../../components/styles';
import { useStoreState } from 'easy-peasy';

const PerfilScreen = ({ navigation }) => {
  const info = useStoreState(state => state.deliveryman.info);
  const { name, email, date } = info;
  return (
    <Container>
      <BigDeliverymanPhoto info={info} />
      <UserInformation>
        <Information>
          <Title>Nome Completo</Title>
          <Content>{name}</Content>
        </Information>
        <Information>
          <Title>Email</Title>
          <Content>{email}</Content>
        </Information>
        <Information>
          <Title>Data de Cadastro</Title>
          <Content>{date}</Content>
        </Information>
        <LogoutButtonWrapper>
          <LogoutButton
            onPress={() => {
              navigation.navigate('Login');
            }}
            title="Logout"
          />
        </LogoutButtonWrapper>
      </UserInformation>
    </Container>
  );
};

export default PerfilScreen;
