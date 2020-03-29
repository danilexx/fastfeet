import styled from 'styled-components/native';
import DeliverymanPhoto from '../../components/DeliverymanPhoto';

export const BigDeliverymanPhoto = styled(DeliverymanPhoto).attrs({
  size: 120,
})`
  margin: 40px auto;
`;

export const UserInformation = styled.View`
  width: 80%;
  margin: 10px auto;
`;

export const Information = styled.View`
  margin: 5px;
`;

export const Title = styled.Text`
  font-size: 12px;
  color: ${props => props.theme.gray[2]};
`;

export const Content = styled.Text`
  font-size: 20px;
  color: ${props => props.theme.gray[0]};
  font-weight: bold;
`;

export const LogoutButton = styled.Button.attrs(props => ({
  color: props.theme.actions.danger,
}))``;

export const LogoutButtonWrapper = styled.View`
  margin: 20px auto;
  width: 100%;
`;
