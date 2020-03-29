import * as React from "react";
import { RouteComponentProps } from "@reach/router";
import { useThrottle } from "react-use";
import { Background, TopSection, Header } from "-/components/styles";
import SearchBar from "-/components/SearchBar";
import DeliveriesTable from "-/components/DeliveriesTable";
import { IconedButton } from "-/components/Button";
import useAwait from "-/utils/useAwait";
import { getDeliveries } from "-/services";

const Deliveries: React.FC<RouteComponentProps> = ({ navigate }) => {
  const [data, setData] = React.useState<any>([]);
  const [search, setSearch] = React.useState("");
  const searchParams = useThrottle(search, 1000);
  const getSearchedDeliveries = React.useCallback(getDeliveries(searchParams), [
    searchParams,
  ]);
  const handleChange = e => {
    setSearch(e.target.value);
  };
  const [loading, fetch] = useAwait(getSearchedDeliveries);
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
      <Header>Gerenciando Encomendas</Header>
      <TopSection>
        <SearchBar
          value={search}
          loading={loading}
          onChange={handleChange}
          placeholder="Buscar por encomendas"
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
      <DeliveriesTable data={data} loading={loading} />
    </Background>
  );
};

export default Deliveries;
