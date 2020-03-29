import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const TopSection = styled.View`
  flex-direction: row;
  width: 90%;
  margin: 20px auto;
  justify-content: space-between;
`;
export const TextSection = styled.View`
  flex-direction: column;
`;
const commonStyles = styled.Text`
  width: 100%;
  margin: 0 10px;
`;
export const WelcomeBackText = styled(commonStyles)`
  color: ${props => props.theme.gray[1]};
`;
export const DeliverymanName = styled(commonStyles)`
  font-size: 30px;
  font-weight: bold;
  color: ${props => props.theme.gray[0]};
  margin-top: -5px;
`;
export const LogoutIcon = styled(Icon).attrs(props => ({
  name: 'exit-to-app',
  size: 30,
  color: props.theme.actions.danger,
}))`
  margin: 10px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding: 0 20px;
  align-items: center;
  margin-bottom: 10px;
`;

export const HeaderText = styled.Text`
  font-weight: bold;
  color: ${props => props.theme.gray[0]};
  font-size: 30px;
`;

export const DeliveriesFilters = styled.View`
  flex-direction: row;
`;

export const Filter = styled.Text`
  font-size: 15px;
  margin: 0 5px;
  font-family: 'Roboto-bold';
  font-weight: bold;
  color: ${props =>
    props.selected ? props.theme.primary : props.theme.gray[1]};
`;

export const NoDeliveries = styled.Text`
  margin: 5px auto;
  /* margin-top: 15px; */
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 18px;
  background-color: white;
  font-weight: bold;
  text-align: center;
  color: ${props => props.theme.gray[1]};
`;
