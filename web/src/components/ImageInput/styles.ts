import { lighten } from "polished";
import styled from "-/lib/StyledComponents";

export const Label = styled.label<{ htmlFor: string }>`
  display: block;
  width: 15rem;
  height: 15rem;
  margin: 1rem auto;
  border-radius: 50%;
`;

export const InsertImageIcon = styled.img.attrs({
  src: "/assets/image.svg",
})`
  width: 4rem;
  height: 4rem;
`;

export const ImageIcon = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

export const Container = styled.div`
  width: 15rem;
  height: 15rem;

  display: flex;
  flex-direction: column;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  border: 0.4rem dashed ${props => lighten(0.08, props.theme.gray[2])};
  font-size: 1.5rem;
  color: ${props => props.theme.gray[2]};
  font-family: Roboto;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    border: 0.4rem dashed ${props => props.theme.gray[2]};
  }
`;

export const StyledInput = styled.input`
  display: none;
`;
