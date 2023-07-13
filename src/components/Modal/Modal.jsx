import React, { Component } from "react";
import PropTypes from "prop-types";
import css from "./Modal.module.css";

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    if (event.key === "Escape") {
      this.props.onCloseModal();
    }
  };
  handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      this.props.onCloseModal();
    }
  };

  render() {
    const { image } = this.props;

    return (
      <div className={css.overlay} onClick={this.handleOverlayClick}>
        <div id={image.id} className={css.modal}>
          <img className={css.overlayImage} src={image.largeImageURL} alt={image} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
  onCloseModal: PropTypes.func.isRequired,
};




