import styled from "-/lib/StyledComponents";

export const Container = styled.div`
  box-shadow: 0px 0px 10px #00000033;
  background-color: ${props => props.theme.contrast};
  border-radius: 5px;
  padding: 1.5rem;
  font-size: 1.5rem;
  font-family: Roboto;
  max-width: 30rem;
`;

export const BlackBackground = styled.div<{ active?: boolean }>`
  background-color: rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;

  opacity: ${props => (props.active ? 1 : 0)};
  pointer-events: ${props => (props.active ? "all" : "none")};
  display: flex;
  justify-content: center;
  align-items: center;
  & ${Container} {
    transition: transform 0.4s ease-in-out;
    transform: translateY(${props => (props.active ? "-20px" : "0px")});
  }
`;
