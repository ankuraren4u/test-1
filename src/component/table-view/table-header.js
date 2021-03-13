import React from "react";
import PropTypes from "prop-types";
import { useFela } from "react-fela";
import classnames from "classnames";
import { rowStyle, headerStyle, valueStyle } from "./style";

export const TableHeader = ({ orderedColumns }) => {
  const { css } = useFela();
  const tableRowClass = classnames("table-row", css(rowStyle, headerStyle));

  return (
    <div className={tableRowClass}>
      {orderedColumns.map(({value, width}, id) => (
        <div key={id} className={classnames(css(valueStyle, { maxWidth: width}))}>
          {value}
        </div>
      ))}
    </div>
  );
};

TableHeader.propTypes = {
    orderedColumns: PropTypes.array,
};
