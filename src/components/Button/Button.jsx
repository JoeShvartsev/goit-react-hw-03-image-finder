import React from "react";
import PropTypes from "prop-types";
import css from "./Button.module.css";

export const Button = ({ onClick }) => {
  return (
    <div className={css.container}>
      <button className={css.Button} type="button" onClick={onClick}>
        Load More
      </button>
    </div>
  );
};
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
