import * as React from "react";
import { RouteComponentProps, navigate } from "@reach/router";
import { useThrottle } from "react-use";
import { Background, TopSection, Header } from "-/components/styles";
import SearchBar from "-/components/SearchBar";
import { IconedButton } from "-/components/Button";
import useAwait from "-/utils/useAwait";
import { getRecipients } from "-/services";
import RecipientsTable from "-/components/RecipientsTable";

const Recipients: React.FC<RouteComponentProps> = ({ children }) => {
  const [data, setData] = React.useState<any>([]);
  const [search, setSearch] = React.useState("");
  const searchParams = useThrottle(search, 1000);
  const getSearchedDeliverymans = React.useCallback(
    getRecipients(searchParams),
    [searchParams]
  );
  const handleChange = e => {
    setSearch(e.target.value);
  };
  const [loading, fetch] = useAwait(getSearchedDeliverymans);
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
      </Background>
      {children}
    </>
  );
};

export default Recipients;
