import styled from "styled-components";

export const Container = styled.View`
  flex-direction: column;
`;
export const Balls = styled.View`
  flex-direction: row;
  padding: 20px 30px;
  padding-bottom: 0;
  align-items: center;
`;
const size = 9;
export const Ball = styled.View`
  width: ${size}px;
  height: ${size}px;
  border-radius: ${size/2}px;
  background-color: ${props => props.full?props.theme.primary:"transparent"};
  border: 1px solid ${props => props.theme.primary};
`;

export const Separator = styled.View`
  flex: 1;
  height: 1.5px;
  background-color: ${props => props.theme.primary };
`;

export const StatusInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 0;
`;

export const Info = styled.Text`
  font-size: 10px;
  margin: 0;
  width: 70px;
  text-align: center;
  color: ${props => props.theme.gray[2]}
  /* white-space: wrap; */

`;