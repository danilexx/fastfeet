import * as React from "react";
import { useTable } from "react-table";
import { useList } from "react-use";
import { navigate } from "@reach/router";
import Dots from "../Dots";
import TableTemplate from "../TableTemplate";
import { deleteDeliveryMan } from "-/services";
import { DeliveryManModel } from "-/services/types";
import { Photo } from "../DeliveryManPhoto";

const DeliverymansTable: React.FC<{
  loading: boolean;
  data: DeliveryManModel[];
}> = ({ data: rawData }) => {
  const [data, methods] = useList<any>([]);
  React.useEffect(() => {
    const newData = rawData.map((deliveryman: any) => ({
      id: deliveryman.id,
      name: deliveryman.name,
      email: deliveryman.email,
      avatar: deliveryman.avatar,
    }));
    methods.set(newData);
  }, [rawData, methods]);

  const handleDelete = React.useCallback(
    (currentRow, currentIndex) => {
      const isConfirmed = window.confirm(
        `Você realmente deseja excluir o entregador ${currentRow.id}?`
      );
      if (isConfirmed) {
        deleteDeliveryMan(currentRow.id);
        methods.removeAt(currentIndex);
      }
    },
    [methods]
  );
  const handleEdit = React.useCallback(currentRow => {
    navigate("entregadores/edit", {
      state: { currentRow },
    });
  }, []);

  const options = React.useMemo(
    () => [
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
    [handleDelete, handleEdit]
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
        Header: "Foto",
        accessor: "photo",
        Cell: ({
          row: {
            original: { name, avatar },
          },
        }) => <Photo name={name} avatar={avatar} />,
      },
      {
        Header: "Nome",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
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

  return <TableTemplate tableProps={tableProps} />;
};

export default DeliverymansTable;
