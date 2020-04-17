import * as React from "react";
import { useTable } from "react-table";
import { useList, useToggle } from "react-use";
import Dots from "../Dots";
import TableTemplate from "../TableTemplate";
import { ProblemModel } from "-/services/types";
import { cancelDelivery } from "-/services";
import Modal from "../Modal";
import ProblemModal from "../ProblemModal";

const ProblemsTable: React.FC<{
  loading: boolean;
  data: ProblemModel[];
}> = ({ data: rawData }) => {
  const [data, methods] = useList<{
    delivery: number;
    problem: string;
    rest: ProblemModel;
  }>([]);
  React.useEffect(() => {
    const newData = rawData.map((problem: ProblemModel) => ({
      delivery: problem.delivery_id,
      problem: problem.description,
      rest: problem,
    }));
    methods.set(newData);
  }, [rawData, methods]);

  const handleDeliveryCancel = React.useCallback(
    (currentRow, currentIndex) => {
      const isConfirmed = window.confirm(
        `Você realmente deseja cancelar a entrega ${currentRow.delivery}?`
      );
      if (isConfirmed) {
        cancelDelivery(currentRow.rest.id);
        methods.removeAt(currentIndex);
      }
    },
    [methods]
  );
  const [active, toggle] = useToggle(false);
  const [problem, setProblem] = React.useState();

  const handleView = React.useCallback(
    currentRow => {
      setProblem(currentRow.rest);
      toggle(true);
    },
    [toggle]
  );

  const options = React.useMemo(
    () => [
      {
        icon_url: "/assets/view.svg",
        label: "Visualizar",
        action: handleView,
      },
      {
        icon_url: "/assets/delete.svg",
        label: "Cancelar Encomenda",
        action: handleDeliveryCancel,
      },
    ],
    [handleDeliveryCancel, handleView]
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Encomenda",
        accessor: "delivery",
        Cell: ({
          row: {
            original: { delivery },
          },
        }: any) => `#${delivery > 9 ? delivery : `0${delivery}`}`,
      },
      {
        Header: "Problema",
        accessor: "problem",
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
        <ProblemModal problem={problem} />
      </Modal>
    </>
  );
};

export default ProblemsTable;
