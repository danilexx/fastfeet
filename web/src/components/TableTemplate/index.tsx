import * as React from "react";
import { TableInstance } from "react-table";
import { Table, StyledTH, StyledTHead, StyledTR, StyledTD } from "./styles";

const TableTemplate: React.FC<{
  tableProps: TableInstance<any>;
}> = ({
  tableProps: {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  },
}) => (
  <Table {...getTableProps()}>
    <StyledTHead>
      {headerGroups.map((headerGroup: any) => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column: any) => (
            <StyledTH centered={column.centered} {...column.getHeaderProps()}>
              {column.render("Header")}
            </StyledTH>
          ))}
        </tr>
      ))}
    </StyledTHead>
    <tbody {...getTableBodyProps()}>
      {rows.map((row: any) => {
        prepareRow(row);
        return (
          <StyledTR {...row.getRowProps()}>
            {row.cells.map((cell: any) => {
              return (
                <StyledTD {...cell.getCellProps()}>
                  {cell.render("Cell")}
                </StyledTD>
              );
            })}
          </StyledTR>
        );
      })}
    </tbody>
  </Table>
);

export default TableTemplate;
