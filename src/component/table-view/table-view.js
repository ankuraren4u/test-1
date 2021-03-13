import React from "react";
import PropTypes from "prop-types";
import { useFela } from "react-fela";
import classnames from "classnames";
import { containerStyle } from "./style";
import { TableRow } from "./table-row";
import { TableHeader } from "./table-header";

export const TableView = ({ tableData, orderedColumns }) => {
  const { css } = useFela();
  const tableView = classnames("table-view", css(containerStyle));
  return (
    <div className={tableView}>
      <TableHeader orderedColumns={orderedColumns} />
      {tableData &&
        tableData.map((row, id) => {
          return <TableRow key={id} row={row} orderedColumns={orderedColumns} />;
        })}
    </div>
  );
};

TableView.propTypes = {
  tableData: PropTypes.array.isRequired,
  orderedColumns: PropTypes.array.isRequired,
};
