import styled, { css } from 'styled-components';
import { Image } from 'react-native';
import { lighten } from 'polished';

const commonStyles = css`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background-color: ${props => lighten(0.35, props.theme.primary)};
  border-radius: ${props => props.size / 2}px;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

export const Photo = styled(Image)`
  ${commonStyles};
`;

export const Container = styled.View`
  ${commonStyles}
`;

export const Initials = styled.Text`
  color: ${props => lighten(0.15, props.theme.primary)};
  font-size: ${props => props.size / 3}px;
`;
