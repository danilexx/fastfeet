import styled from 'styled-components';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const Card = styled.View`
  width: 90%;
  flex-direction: column;
  margin: 5px auto;
  /* border: 1px solid ${props => props.theme.gray[2]}; */
  border-radius: 4px;
  padding: 10px 15px;
  background-color: ${props => props.theme.white};
  elevation: 1;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  /* padding: 5px; */
`;

export const HeaderText = styled.Text`
  color: ${props => props.theme.primary};
  font-weight: bold;
  margin: 0 10px;
`;

const BaseIcon = styled(MaterialIcon)`
  margin-bottom: 5px;
`;

const ActionIcon = styled(Ionicon)``;

export const DeliveryIcon = styled(BaseIcon).attrs(props => ({
  name: 'truck-delivery',
  size: 25,
  color: props.theme.primary,
}))``;

export const PendingCalendarIcon = styled(BaseIcon).attrs(props => ({
  name: 'calendar-clock',
  size: 25,
  color: props.theme.primary,
}))``;

export const ProblemIcon = styled(ActionIcon).attrs(props => ({
  name: 'ios-close-circle-outline',
  size: 25,
  color: props.theme.actions.danger,
}))``;
export const ViewProblemsIcon = styled(ActionIcon).attrs(props => ({
  name: 'ios-information-circle-outline',
  size: 25,
  color: props.theme.actions.warning,
}))``;
export const ConfirmIcon = styled(ActionIcon).attrs(props => ({
  name: 'ios-checkmark-circle-outline',
  size: 25,
  color: props.theme.primary,
}))``;

export const InfoTitle = styled.Text`
  color: ${props => props.theme.gray[2]};
  text-transform: uppercase;
  font-weight: bold;
`;
export const InfoContent = styled.Text`
  color: ${props => props.theme.gray[0]};
  margin-bottom: 10px;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const RowWrapper = styled.View`
  flex-direction: column;
`;

export const Actions = styled.View`
  flex-direction: row;
  flex: 1;
  width: 100%;
  /* margin: 5px auto; */
  padding: 0 10%;
  justify-content: space-evenly;
`;

export const Action = styled(TouchableOpacity)`
  flex-direction: column;
  background-color: ${props => props.theme.white};
  elevation: 1;
  /* flex: 1; */
  border-radius: 4px;
  margin: 5px 25px;
  /* margin-bottom: 10px; */
  justify-content: center;
  align-items: center;
  /* resize-mode: contain; */
  padding: 20px 10px;
  /* height: 100px; */
  width: 100px;
`;
export const ActionDescription = styled.Text`
  text-align: center;
  font-size: 14px;
  color: ${props => props.theme.gray[1]};
  /* width: 80%; */
  margin: 0 auto;
`;
