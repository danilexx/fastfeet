import * as React from "react";
import { Container, Dot } from "./styles";

const Status = (props: any) => {
  const { row } = props;
  const currentRow = row.original;
  const instance = currentRow.status;
  return (
    <Container instance={instance}>
      <Dot instance={instance} />
      {instance}
    </Container>
  );
};

export default Status;
