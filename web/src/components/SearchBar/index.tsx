import * as React from "react";
import { Container, Field, SearchIcon, LoaderContainer } from "./styles";
import Spinner from "../Spinner";

interface Props extends React.HTMLAttributes<HTMLInputElement> {
  placeholder: string;
  value?: string;
  loading?: boolean;
}

const SearchBar: React.FC<Props> = ({
  placeholder,
  loading = false,
  ...props
}) => {
  return (
    <Container>
      <SearchIcon />
      <Field type="text" placeholder={placeholder} {...props} />
      <LoaderContainer>
        <Spinner loading={loading} />
      </LoaderContainer>
    </Container>
  );
};

export default SearchBar;
