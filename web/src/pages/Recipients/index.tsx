import * as React from "react";
import { RouteComponentProps, navigate } from "@reach/router";
import { useThrottle } from "react-use";
import { Background, TopSection, Header } from "-/components/styles";
import SearchBar from "-/components/SearchBar";
import { IconedButton } from "-/components/Button";
import useAwait from "-/utils/useAwait";
import { getRecipients } from "-/services";
import RecipientsTable from "-/components/RecipientsTable";
import Pagination from "-/components/Pagination";

const Recipients: React.FC<RouteComponentProps> = ({ children }) => {
  const [data, setData] = React.useState<any>([]);
  const [search, setSearch] = React.useState("");
  const searchParams = useThrottle(search, 1000);
  const [pages, setPages] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);
  const getSearchedRecipient = React.useCallback(
    getRecipients({ search: searchParams, page: currentPage }),
    [searchParams, currentPage]
  );
  const handleChange = e => {
    setSearch(e.target.value);
  };
  const [loading, fetch] = useAwait(getSearchedRecipient);
  React.useEffect(() => {
    const fn = async () => {
      try {
        const response = await fetch();
        setData(response.data.items);
        setPages(response.data.pages);
      } catch (err) {
        console.error(err);
      }
    };
    fn();
  }, [setData, fetch]);
  return (
    <>
      <Background>
        <Header>Gerenciando Destinatários</Header>
        <TopSection>
          <SearchBar
            loading={loading}
            onChange={handleChange}
            value={search}
            placeholder="Buscar por destinatários"
          />
          <IconedButton
            onClick={() => {
              navigate("destinatarios/novo");
            }}
          >
            Cadastrar
          </IconedButton>
        </TopSection>
        <RecipientsTable data={data} loading={loading} />
        <Pagination
          pages={pages}
          setter={e => {
            setCurrentPage(e);
          }}
          currentPage={currentPage}
        />
      </Background>
      {children}
    </>
  );
};

export default Recipients;
