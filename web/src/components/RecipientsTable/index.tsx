import * as React from "react";
import { useTable } from "react-table";
import { useList } from "react-use";
import { navigate } from "@reach/router";
import Dots from "../Dots";
import TableTemplate from "../TableTemplate";
import { RecipientModel } from "-/services/types";
import { deleteRecipient } from "-/services";

const RecipientsTable: React.FC<{
  loading: boolean;
  data: RecipientModel[];
}> = ({ data: rawData }) => {
  const [data, methods] = useList<any>([]);
  React.useEffect(() => {
    const newData = rawData.map((recipient: any) => ({
      id: recipient.id,
      name: recipient.name,
      address: `${recipient.street}, ${recipient.number}, ${recipient.city} - ${recipient.state}`,
      ...recipient,
    }));
    methods.set(newData);
  }, [rawData, methods]);

  const handleDelete = React.useCallback(
    (currentRow, currentIndex) => {
      const isConfirmed = window.confirm(
        `Você realmente deseja excluir o destinatario ${currentRow.id}?`
      );
      if (isConfirmed) {
        deleteRecipient(currentRow.id)();
        methods.removeAt(currentIndex);
      }
    },
    [methods]
  );

  const handleEdit = React.useCallback(currentRow => {
    navigate("destinatarios/edit", {
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
        Header: "Nome",
        accessor: "name",
      },
      {
        Header: "Endereço",
        accessor: "address",
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

export default RecipientsTable;
