import { lighten, darken } from "polished";
import styled, { css } from "-/lib/StyledComponents";

const active = css`
  background-color: ${props => lighten(0.36, props.theme.primary)};
`;

export const DotsContainer = styled.div<{ active: boolean }>`
  width: 3rem;
  height: 3rem;
  padding: 0.5rem;
  border-radius: 50%;
  position: relative;
  cursor: pointer;
  &:hover {
    ${active}
  }
  ${props => props.active && active}
`;

export const DotsIcon = styled.img.attrs({
  src: "/assets/dots.svg",
})`
  width: 2rem;
  height: 2rem;
  user-select: none;
`;

export const DotMenu = styled.ul`
  /* height: 20rem;
  width: 20rem; */
  background-color: ${props => props.theme.contrast};
  border: 1px solid ${props => props.theme.gray[2]};
  border-radius: 5px;
  position: absolute;
  transform: translateX(-50%);
  top: 2.3rem;
  left: 50%;
  z-index: 10;
  list-style: none;
  padding: 0;
  &:before {
    content: "";
    background-color: ${props => props.theme.contrast};
    border: 1px solid ${props => props.theme.gray[2]};
    position: absolute;
    top: -0.5rem;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 1rem;
    height: 1rem;
    border-right: none;
    border-bottom: none;
  }
`;

export const DotMenuItem = styled.li`
  margin: 0;
  position: relative;
  padding: 1rem 2rem;
  text-align: left;
  z-index: 15;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  white-space: nowrap;
  &:hover {
    background-color: ${props => darken(0.05, props.theme.contrast)};
  }
  &:after {
    content: "";
    height: 1px;
    width: 80%;
    margin: 0 auto;
    background-color: ${props => props.theme.gray[3]};
    opacity: 0.2;
    position: absolute;
    border-radius: 5px;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  &:last-child {
    &:after {
      opacity: 0;
    }
  }
`;

export const Icon = styled.img`
  height: 1.2rem;
  width: 1.2rem;
  margin: 0 0.5rem;
`;
