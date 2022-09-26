import React from "react";
import { useTable, useRowSelect } from "react-table";
function Table({ columns, data, onChangeSelection, setSelectedRows }) {
  const initiallySelectedRows = React.useMemo(() => new Set(["1"]), []);
  const table = useTable(
    {
      columns,
      data,
      initialState: {
        selectedRowPaths: initiallySelectedRows,
      },
      debug: true,
    },
    useRowSelect
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state: { selectedRowPaths },
    toggleAllRowsSelected,
  } = table;

  React.useEffect(() => {
    setSelectedRows(selectedFlatRows);
  }, [selectedFlatRows, onChangeSelection]);

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default Table;
