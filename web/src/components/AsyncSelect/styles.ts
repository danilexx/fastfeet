import BaseSelect from "react-select/async";
import styled from "-/lib/StyledComponents";

export const Select = styled(BaseSelect)`
  .react-select__control {
    border: 1px solid ${props => props.theme.gray[2]};
    border-radius: 5px;
    /* padding: 1.5rem;
    font-size: 2rem; */
    height: 5.5rem;
    font-family: Roboto;
    font-size: 2rem;
    font-family: Roboto;
    &:hover {
      border-color: ${props => props.theme.primary};
    }
    &.react-select__control--is-focused {
      box-shadow: 0 0 0 1px ${props => props.theme.primary};
    }
  }
`;

export const Spacer = styled.div`
  width: fit-content;
  margin: 0 1.5rem;
`;
