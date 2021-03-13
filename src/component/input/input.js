import React from "react";
import PropTypes from "prop-types";
import { useFela } from "react-fela";
import classnames from "classnames";
import { inputStyle } from "./style";

const InputInternal = ({ onChange, width, ...rest }) => {
  const { css } = useFela();
  const inputclass = classnames("ui-input", css(inputStyle, { width }));

  return <input className={inputclass} onChange={onChange} {...rest} />;
};

InputInternal.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export const Input = React.memo(InputInternal);
