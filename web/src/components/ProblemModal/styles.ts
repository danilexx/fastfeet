import styled from "-/lib/StyledComponents";

export const Bold = styled.b`
  color: ${props => props.theme.gray[0]};
  margin: 0.6rem 0;
`;
export const P = styled.p`
  margin: 0.6rem 0;
  color: ${props => props.theme.gray[4]};
  & ${Bold} {
    margin: 0;
  }
`;
