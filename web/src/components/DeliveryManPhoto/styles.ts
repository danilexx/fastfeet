import { lighten } from "polished";
import styled, { css } from "-/lib/StyledComponents";

const commonStyles = css`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  margin-right: 0.5rem;
`;

export const PhotoFake = styled.div<{ color: string }>`
  ${commonStyles}
  background-color: ${props => lighten(0.2, props.color)};
  color: ${props => props.color};
  padding: 0.5rem;

`;

export const PhotoIMG = styled.img`
  ${commonStyles}
`;
export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  & ${PhotoFake}, & ${PhotoIMG} {
    margin: 0 0.5rem;
  }
`;
