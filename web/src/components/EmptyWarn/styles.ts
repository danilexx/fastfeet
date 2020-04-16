import styled from "-/lib/StyledComponents";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem auto;
`;

export const Message = styled.p`
  color: ${props => props.theme.gray[1]};
  font-size: 2rem;
  font-family: "Roboto";
  margin: 0 auto;
`;

export const EmptyImage = styled.img.attrs({
  src: "/assets/empty.svg",
})`
  height: 30rem;
  margin: 1rem 0;
`;
