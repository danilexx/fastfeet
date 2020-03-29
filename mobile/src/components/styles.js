import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Octicons';
import { TouchableOpacity } from 'react-native';

export const Container = styled.View`
  flex: 1;
  /* background-color: ${props => props.theme.white}; */
`;
export const FilledContainer = styled.View`
  flex: 1;
  background-color: ${props => props.theme.white};
`;

export const TopBar = styled.View`
  background-color: ${props => props.theme.primary};
  width: 100%;
  flex-direction: row;
  height: 150px;
  margin-bottom: -80px;
`;

export const BackButton = styled(Icon).attrs(props => ({
  name: 'chevron-left',
  color: props.theme.white,
  size: 25,
}))`
  position: absolute;
  left: 0px;
  top: 0px;
  padding: 25px;
  /* transform: translateY(-10px); */
`;

export const Title = styled.Text`
  color: ${props => props.theme.white};
  font-size: 22px;
  margin: 20px auto;
  font-weight: bold;
`;

export const Wrapper = styled.View`
  /* transform: translateY(-65px); */
  flex-direction: column;
  flex: 1;
`;

export const SendButton = styled(TouchableOpacity)`
  width: 90%;
  background-color: ${props => props.theme.primary};
  /* flex: 0; */
  border-radius: 4px;
  padding: 10px 0;
  justify-content: center;
  align-items: center;
  margin: 5px auto;
  elevation: 1;
`;

export const SendButtonText = styled.Text`
  color: ${props => props.theme.white};
  font-weight: bold;
`;
