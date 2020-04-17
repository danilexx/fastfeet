import * as React from "react";
import { useTable } from "react-table";
import { useList, useToggle } from "react-use";
import { navigate } from "@reach/router";
import DeliveryManPhoto from "-/components/DeliveryManPhoto";
import Status from "../Status";
import Dots from "../Dots";
import getStatus from "-/utils/getStatus";
import TableTemplate from "../TableTemplate";
import { DeliveryModel } from "-/services/types";
import { deleteDelivery } from "-/services";
import Modal from "../Modal";
import DeliveryModal from "../DeliveryModal";

const DeliveriesTable: React.FC<{
  loading: boolean;
  data: DeliveryModel[];
}> = ({ data: rawData }) => {
  const [data, methods] = useList<any>([]);

  React.useEffect(() => {
    const newData = rawData.map((delivery: any) => ({
      id: delivery.id,
      product: delivery.product,
      recipient: delivery.recipient.name,
      deliveryman: delivery.deliveryman?.name,
      city: delivery.recipient.city,
      state: delivery.recipient.state,
      status: getStatus(delivery),
      avatar: delivery.deliveryman?.avatar,
      rest: delivery,
    }));
    methods.set(newData);
  }, [rawData, methods]);

  const handleDelete = React.useCallback(
    (currentRow, currentIndex) => {
      const isConfirmed = window.confirm(
        `Você realmente deseja excluir a encomeda ${currentRow.id}?`
      );
      if (isConfirmed) {
        methods.removeAt(currentIndex);
        deleteDelivery(currentRow.id);
      }
    },
    [methods]
  );

  const handleEdit = React.useCallback(currentRow => {
    navigate("encomendas/edit", {
      state: { currentRow },
    });
  }, []);

  const [active, toggle] = useToggle(false);
  const [delivery, setDelivery] = React.useState();
  const options = React.useMemo(
    () => [
      {
        icon_url: "/assets/view.svg",
        label: "Visualizar",
        action: currentRow => {
          toggle(true);
          setDelivery(currentRow.rest);
        },
      },
      {
        icon_url: "/assets/edit.svg",
        label: "Editar",
        action: handleEdit,
      },
      {
        icon_url: "/assets/delete.svg",
        label: "Excluir",
        action: handleDelete,
      },
    ],
    [handleDelete, toggle, handleEdit]
  );
  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        Cell: ({
          row: {
            original: { id },
          },
        }: any) => `#${id > 9 ? id : `0${id}`}`,
      },
      {
        Header: "Produto",
        accessor: "product",
      },
      {
        Header: "Destinatário",
        accessor: "recipient",
      },
      {
        Header: "Entregador",
        accessor: "deliveryman",
        Cell: DeliveryManPhoto,
      },
      {
        Header: "Cidade",
        accessor: "city",
      },
      {
        Header: "Estado",
        accessor: "state",
      },
      {
        Header: "Status",
        acessor: "status",
        Cell: Status,
      },
      {
        Header: "Ações",
        acessor: "actions",
        centered: true,
        Cell: (props: any) => (
          <Dots methods={methods} options={options} {...props} />
        ),
      },
    ],
    [methods, options]
  );
  const tableProps = useTable({
    columns,
    data,
  });

  return (
    <>
      <TableTemplate tableProps={tableProps} />
      <Modal setter={toggle} active={active}>
        <DeliveryModal delivery={delivery} />
      </Modal>
    </>
  );
};

export default DeliveriesTable;
