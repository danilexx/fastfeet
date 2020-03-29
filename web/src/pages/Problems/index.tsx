import * as React from "react";
import { RouteComponentProps } from "@reach/router";
import { Background, Header } from "-/components/styles";
import useAwait from "-/utils/useAwait";
import { getProblems } from "-/services";
import ProblemsTable from "-/components/ProblemsTable";

const Problems: React.FC<RouteComponentProps> = () => {
  const [data, setData] = React.useState<any>([]);
  const [loading, fetch] = useAwait(getProblems);
  React.useEffect(() => {
    const fn = async () => {
      try {
        const response = await fetch();
        setData(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fn();
  }, [setData, fetch]);
  return (
    <Background>
      <Header>Gerenciando Problemas</Header>
      <ProblemsTable data={data} loading={loading} />
    </Background>
  );
};

export default Problems;
