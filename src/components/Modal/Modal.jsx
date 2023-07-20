import React, { useEffect } from "react";
import PropTypes from "prop-types";
import css from "./Modal.module.css";

export const Modal = ({ image, onCloseModal }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onCloseModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onCloseModal]);

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onCloseModal();
    }
  };

  return (
    <div className={css.overlay} onClick={handleOverlayClick}>
      <div id={image.id} className={css.modal}>
        <img
          className={css.overlayImage}
          src={image.largeImageURL}
          alt={image.webformatURL}
        />
      </div>
    </div>
  );
};

Modal.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
  }).isRequired,
  onCloseModal: PropTypes.func.isRequired,
};






