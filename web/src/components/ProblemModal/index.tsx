import * as React from "react";
import { ProblemModel } from "-/services/types";
import { Bold, P } from "./styles";

interface Props {
  problem?: ProblemModel;
}

const ProblemModal: React.FC<Props> = ({ problem }) => {
  if (!problem) {
    return null;
  }
  return (
    <>
      <Bold>Informações do Problema</Bold>
      <P>{problem.description}</P>
    </>
  );
};

export default ProblemModal;
