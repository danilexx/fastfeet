import styled from "-/lib/StyledComponents";

export const Container = styled.div`
  position: relative;
  height: 100%;
`;

export const Field = styled.input`
  display: flex;
  flex: 1;
  height: 100%;
  border: 1px solid ${props => props.theme.gray[2]};
  border-radius: 5px;
  padding: 1rem 3rem;
  font-size: 1.4rem;
  font-family: Roboto;
  padding-left: 3rem;
`;

export const SearchIcon = styled.img.attrs({
  src: "/assets/search.svg",
})`
  width: 1.5rem;
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  user-select: none;
`;

export const LoaderContainer = styled.div`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  user-select: none;
`;
