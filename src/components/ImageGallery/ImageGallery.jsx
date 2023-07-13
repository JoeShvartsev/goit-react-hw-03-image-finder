import React from "react";
import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";
import PropTypes from "prop-types";
import css from "./ImageGallery.module.css";

export const ImageGallery = ({ pictures, onImageClick }) => {
  return (
    <ul className={css.gallery}>
      {pictures.map((item) => (
        <ImageGalleryItem
          key={item.id}
          id ={item.id}
          smallPic={item.webformatURL}
          onClick={onImageClick}
        />
      ))}
    </ul>
  );
};
ImageGallery.propTypes = {
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  onImageClick: PropTypes.func.isRequired,
};