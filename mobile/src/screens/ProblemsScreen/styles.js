import styled from 'styled-components';
import { TopBar as BaseTopBar } from '../../components/styles';

export const SubHeader = styled.Text`
  color: ${props => props.theme.white};
  margin: 5px auto;
  font-size: 20px;
  font-weight: bold;
`;

export const TopBar = styled(BaseTopBar)`
  /* transform: translateY(-90px); */
  margin-bottom: -80px;
`;

export const ProblemCard = styled.View`
  width: 90%;
  margin: 10px auto;
  background-color: ${props => props.theme.white};
  elevation: 1;
  border-radius: 4px;
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ProblemDate = styled.Text`
  color: ${props => props.theme.gray[3]};
  font-size: 12px;
`;

export const Description = styled.Text`
  color: ${props => props.theme.gray[2]};
  font-size: 15px;
  font-weight: bold;
`;
