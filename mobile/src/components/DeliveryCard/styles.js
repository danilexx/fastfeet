import styled from 'styled-components';
import { lighten } from 'polished';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const Container = styled.View`
  /* border: 1px solid ${props => lighten(0.45, props.theme.gray[1])}; */
  margin: 5px auto;
  width: 90%;
  padding: 10px;
  border-radius: 4px;
  elevation: 2;
  background-color: ${props => props.theme.white};
`;

export const Delivery = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const DeliveryText = styled.Text`
  font-weight: bold;
  color: ${props => props.theme.primary};
`;

export const DeliveryIcon = styled(Icon).attrs(props => ({
  name: 'truck-delivery',
  color: props.theme.primary,
  size: 30,
}))`
  margin: 0 10px;
`;

export const BottomSection = styled.View`
  flex-direction: row;
`;

export const Section = styled.View`
  flex-direction: column;
  flex: 1;
  padding: 10px;
  align-items: flex-start;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 10px;
  color: ${props => props.theme.gray[1]};
`;

export const Content = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: ${props => props.theme.gray[0]};
`;

export const Details = styled.Text`
  color: ${props => props.theme.primary};
  font-weight: bold;
`;
