import React from "react";
import PropTypes from "prop-types";
import css from "./ImageGalleryItem.module.css";

export const ImageGalleryItem = ({id,onClick,smallPic}) => {
  return (
    <li key={id} id ={id} className={css["gallery-item"]} onClick={() => onClick({id})}>
      <img src={smallPic} alt='' className={css["gallery-item-image"]} 
      onClick={() => onClick({smallPic})}/>
    </li>
  );
};
ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  smallPic: PropTypes.string.isRequired,
};