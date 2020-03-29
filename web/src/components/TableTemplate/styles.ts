import styled from "-/lib/StyledComponents";

export const Table = styled.table`
  width: 100%;
  margin: 1rem 0;
  border: none;

  /* Adiciona espaçamento entre rows */
  border-collapse: separate;
  border-spacing: 0 1em;
`;

export const StyledTH = styled.th<{ centered?: boolean }>`
  font-family: Roboto;
  color: ${props => props.theme.gray[0]};
  font-weight: bold;
  font-size: 1.5rem;
  padding: 1rem 2rem;
  text-align: ${props => (props.centered ? "center" : "left")};
`;

export const StyledTHead = styled.thead`
  /* margin: 1rem; */
`;

export const StyledTR = styled.tr`
  background-color: ${props => props.theme.contrast};
  font-size: 1.5rem;
  font-family: Roboto;
  text-align: left;
  padding: 0 2rem;
  color: ${props => props.theme.gray[1]};
  margin: 1rem 0;
  border-radius: 10px;
`;
const borderRadius = "5px";
export const StyledTD = styled.td`
  padding: 0.8rem 1rem;
  @media screen and (min-width: 500px) {
    padding-left: 2rem;
  }
  border-top: 1px solid ${props => props.theme.gray[2]};
  border-bottom: 1px solid ${props => props.theme.gray[2]};
  min-height: 6rem;
  max-width: 30rem;
  overflow-x: hidden;
  text-overflow: ellipsis;
  /* Adiciona bordar redondas nas rows */
  &:last-child {
    overflow: visible;
    border-top-right-radius: ${borderRadius};
    border-bottom-right-radius: ${borderRadius};
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 1px solid ${props => props.theme.gray[2]};
  }
  &:first-child {
    border-top-left-radius: ${borderRadius};
    border-bottom-left-radius: ${borderRadius};
    border-left: 1px solid ${props => props.theme.gray[2]};
  }
`;
