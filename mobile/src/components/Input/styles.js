import styled from 'styled-components';
import { TextInput } from 'react-native';

export const StyledInput = styled(TextInput)`
  width: 90%;
  margin: 0 auto;
  background-color: ${props => props.theme.white};
  border-radius: 4px;
  font-size: 20px;
  color: ${props => props.theme.gray[0]};
  padding: 20px;
  elevation: 1;
  text-align-vertical: top;
`;

export const Error = styled.Text`
  margin: 5px auto;
  /* margin-top: 15px; */
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 18px;
  background-color: white;
  font-weight: bold;
  text-align: center;
  color: ${props => props.theme.actions.danger};
`;
