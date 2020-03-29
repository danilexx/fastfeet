import * as React from "react";
import { RouteComponentProps } from "@reach/router";
import { useThrottle } from "react-use";
import { Background, TopSection, Header } from "-/components/styles";
import SearchBar from "-/components/SearchBar";
import { IconedButton } from "-/components/Button";
import useAwait from "-/utils/useAwait";
import { getDeliverymans } from "-/services";
import DeliverymansTable from "-/components/DeliverymansTable";

const Deliverymans: React.FC<RouteComponentProps> = ({ navigate }) => {
  const [data, setData] = React.useState<any>([]);
  const [search, setSearch] = React.useState("");
  const searchParams = useThrottle(search, 1000);
  const getSearchedDeliverymans = React.useCallback(
    getDeliverymans(searchParams),
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
    <Background>
      <Header>Gerenciando Entregadores</Header>
      <TopSection>
        <SearchBar
          onChange={handleChange}
          loading={loading}
          value={search}
          placeholder="Buscar por entregadores"
        />
        <IconedButton
          onClick={() => {
            if (navigate) {
              navigate("novo");
            }
          }}
        >
          Cadastrar
        </IconedButton>
      </TopSection>
      <DeliverymansTable data={data} loading={loading} />
    </Background>
  );
};

export default Deliverymans;
