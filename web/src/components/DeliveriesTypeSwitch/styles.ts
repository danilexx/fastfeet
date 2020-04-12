import styled, { css } from "-/lib/StyledComponents";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Type = styled.button<{ isSelected?: boolean }>`
  display: flex;
  background-color: ${props => props.theme.contrast};
  color: ${props => props.theme.gray[1]};
  border: 1px solid ${props => props.theme.gray[2]};
  border-radius: 5px;
  padding: 0 2rem;
  box-sizing: border-box;
  white-space: nowrap;
  font-size: 1.4rem;
  font-family: Roboto;
  width: fit-content;
  margin-left: 1rem;
  cursor: pointer;
  ${props =>
    props.isSelected &&
    css`
      background-color: ${props.theme.primary};
      color: ${props.theme.contrast};
    `}
`;
