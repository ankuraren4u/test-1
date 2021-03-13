import React from "react";
import PropTypes from "prop-types";
import { useFela } from "react-fela";
import classnames from "classnames";
import { rowStyle, valueStyle } from "./style";

export const TableRow = ({ row, orderedColumns }) => {
  const { css } = useFela();
  const tableRowClass = classnames("table-row", css(rowStyle));

  return (
    <div className={tableRowClass}>
      {orderedColumns.map(({ key, width }, id) => {
        const val = row[key] || "";
        const displayVal = val instanceof Array ? val.join(", ") : val;
        const colClass = classnames(css(valueStyle, { maxWidth: width}));
        return (
          <div key={id} className={colClass}>
            {displayVal}
          </div>
        );
      })}
    </div>
  );
};

TableRow.propTypes = {
  row: PropTypes.object,
  orderedColumns: PropTypes.array.isRequired,
};
