import * as React from "react";
import { RouteComponentProps } from "@reach/router";
import { Background, Header } from "-/components/styles";
import useAwait from "-/utils/useAwait";
import { getProblems } from "-/services";
import ProblemsTable from "-/components/ProblemsTable";
import Pagination from "-/components/Pagination";
import EmptyWarn from "-/components/EmptyWarn";

const Problems: React.FC<RouteComponentProps> = () => {
  const [data, setData] = React.useState<any>([]);
  const [pages, setPages] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);
  const getPagedProblems = React.useCallback(() => getProblems(currentPage), [
    currentPage,
  ]);
  const [loading, fetch] = useAwait(getPagedProblems);
  React.useEffect(() => {
    const fn = async () => {
      try {
        const response = await fetch();
        console.log(response);
        setData(response.data.items);
        setPages(response.data.pages);
      } catch (err) {
        console.error(err);
      }
    };
    fn();
  }, [setData, fetch]);
  return (
    <Background>
      <Header>Gerenciando Problemas</Header>
      {data.length === 0 && loading === false ? (
        <EmptyWarn>Nenhum Problema Cadastrado Ainda</EmptyWarn>
      ) : (
        <ProblemsTable data={data} loading={loading} />
      )}

      <Pagination
        pages={pages}
        setter={e => {
          setCurrentPage(e);
        }}
        currentPage={currentPage}
      />
    </Background>
  );
};

export default Problems;
