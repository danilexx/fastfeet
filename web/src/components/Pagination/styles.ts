import styled, { css } from "-/lib/StyledComponents";

export const Pages = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1.5rem 0;
  justify-content: center;
`;

const commonStyles = css`
  background-color: ${props => props.theme.contrast};
  color: ${props => props.theme.gray[1]};
  border: 1px solid ${props => props.theme.gray[2]};
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Roboto;
  font-size: 2rem;
  margin-right: 1rem;
  border-radius: 5px;
  cursor: pointer;
`;

export const Page = styled.div<{ active?: boolean }>`
  ${commonStyles};
  width: 4rem;
  ${props =>
    props.active &&
    css`
      background-color: ${props.theme.primary};
      color: ${props.theme.contrast};
    `}
`;

export const NextPage = styled.button`
  ${commonStyles};
  padding: 0 1rem;
`;
