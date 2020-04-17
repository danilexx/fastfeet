import * as React from "react";
import { RouteComponentProps } from "@reach/router";
import { useThrottle } from "react-use";
import showError from "-/utils/showError";
import { Background, TopSection, Header } from "-/components/styles";
import SearchBar from "-/components/SearchBar";
import DeliveriesTable from "-/components/DeliveriesTable";
import { IconedButton } from "-/components/Button";
import useAwait from "-/utils/useAwait";
import { getDeliveries } from "-/services";
import ListActions from "-/components/ListActions";
import DeliveriesTypeSwitch from "-/components/DeliveriesTypeSwitch";
import Pagination from "-/components/Pagination";
import EmptyWarn from "-/components/EmptyWarn";

const Deliveries: React.FC<RouteComponentProps> = ({ navigate }) => {
  const [data, setData] = React.useState<any>([]);
  const [search, setSearch] = React.useState("");
  const [filter, setFilter] = React.useState("all");
  const [pages, setPages] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);
  const searchParams = useThrottle(search, 1000);
  const getSearchedDeliveries = React.useCallback(
    () => getDeliveries({ search: searchParams, filter, page: currentPage }),
    [searchParams, filter, currentPage]
  );
  const handleChange = e => {
    setSearch(e.target.value);
  };
  const [loading, fetch] = useAwait(getSearchedDeliveries);
  React.useEffect(() => {
    const fn = async () => {
      try {
        const response = await fetch();
        setData(response.data.items);
        setPages(response.data.pages);
      } catch (err) {
        showError(err);
      }
    };
    fn();
  }, [setData, fetch]);
  const handlePagination = React.useCallback(
    e => {
      setCurrentPage(e);
    },
    [setCurrentPage]
  );
  const handleTypeSwitch = React.useCallback(e => {
    setCurrentPage(1);
    setFilter(e);
  }, []);
  return (
    <Background>
      <Header>Gerenciando Encomendas</Header>
      <TopSection>
        <ListActions>
          <SearchBar
            value={search}
            loading={loading}
            onChange={handleChange}
            placeholder="Buscar por encomendas"
          />
          <DeliveriesTypeSwitch onChange={handleTypeSwitch} />
        </ListActions>
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
      {data.length === 0 && loading === false ? (
        <EmptyWarn>Nenhuma Entrega Cadastrada Ainda</EmptyWarn>
      ) : (
        <DeliveriesTable data={data} loading={loading} />
      )}
      <Pagination
        pages={pages}
        setter={handlePagination}
        currentPage={currentPage}
      />
    </Background>
  );
};

export default Deliveries;
