import styled from "-/lib/StyledComponents";

export const Container = styled.div`
  /* padding: 0 1rem; */
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0;
`;

export const StyledInput = styled.input<{ ref: any }>`
  border: 1px solid ${props => props.theme.gray[2]};
  border-radius: 5px;
  padding: 1.5rem;
  font-size: 2rem;
  font-family: Roboto;
`;
export const StyledLabel = styled.label`
  font-family: Roboto;
  font-weight: bold;
  font-size: 1.5rem;
  color: ${props => props.theme.gray[0]};
  width: 100%;
  text-align: left;
  margin: 0.8rem 0.5rem;
`;

export const ErrorMessage = styled.span`
  color: ${props => props.theme.actions.error};
  margin: 0.5rem;
  font-size: 1.5rem;
  font-family: Roboto;
  text-transform: capitalize;
`;
