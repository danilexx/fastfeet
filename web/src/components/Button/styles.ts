import { darken } from "polished";
import styled, { keyframes, css } from "-/lib/StyledComponents";

export const Container = styled.button`
  position: relative;
  background-color: ${props => props.theme.primary};
  border: none;
  color: ${props => props.theme.contrast};
  font-family: Roboto;
  font-size: 2rem;
  margin: 1.5rem 0;
  width: 100%;
  cursor: pointer;
  padding: 1.5rem;
  border-radius: 5px;
  will-change: background-color;
  transition: background-color 0.05 ease-in-out;
  &:hover {
    background-color: ${props => darken(0.1, props.theme.primary)};
  }
  overflow: hidden;
`;
const loading = keyframes`
  0%{
    transform: translateX(-100%);
    opacity: 1;
  }
  90%{
    transform: translateX(0%);
    opacity: 0.5;
  }
  100%{
    transform: translateX(0%);
    opacity: 0;
  }
`;
export const ButtonLoadingBar = styled.div<{ loading?: boolean }>`
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.4);
  /* transition: transform 2s ease-in-out; */
  position: absolute;
  left: 0;
  top: 0;
  transform: translateX(-100%);
  animation: ${props =>
    props.loading &&
    css`
      ${loading} 4s ease-in-out infinite;
    `};
`;

export const ButtonIcon = styled.img`
  width: 1.5rem;
  margin-right: 1rem;
`;

export const IconedButtonContainer = styled(Container)`
  margin: 0;
  padding: 1rem 2rem;
  box-sizing: border-box;
  width: fit-content;
  display: flex;
  align-items: center;
`;
