import styled from 'styled-components';
import { TouchableOpacity, Image } from 'react-native';
import BaseInput from '../../components/Input';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.primary};
  justify-content: center;
  align-items: center;
  /* width: 90%; */
  /* margin: 0 auto; */
  padding: 5%;
`;

export const Input = styled(BaseInput)`
  color: ${props => props.theme.gray[0]};
  font-size: 16px;
  width: 100%;
  background-color: ${props => props.theme.white};
  border-radius: 5px;
  margin: 5px 0;
  padding: 15px 15px;
  padding-bottom: 10px;
`;

export const Logo = styled(Image).attrs({
  source: require('../../assets/fastfeet-logo.png'),
})`
  width: 80%;
  resize-mode: center;
  /* padding: 0 50px; */
  margin: 20px auto;
`;

export const LoginButton = styled(TouchableOpacity)`
  width: 100%;
  padding: 10px 20px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.actions.sucess};
  elevation: 1;
  margin: 5px 0;
`;

export const LoginButtonText = styled.Text`
  color: ${props => props.theme.white};
  font-size: 16px;
  font-weight: bold;
`;
