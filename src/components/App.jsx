import React, { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Loader } from "./Loader/Loader";
import { Button } from "./Button/Button";
import { Modal } from "./Modal/Modal";
import { fetchData } from "../Api/pictures";
import PropTypes from "prop-types";

export class App extends Component {
  

  state = {
    pictures: [],
    querry: "",
    currentPage: 1,
    totalPages: 0,
    selectedImage: null,
    isOpenModal: false,
    isLoading: false,
    picturesPerPage: 12,
    isButtonShow: false
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.querry !== this.state.querry) {
      this.setState(
        { currentPage: 1, pictures: [], isButtonShow: false },
        () => {
          this.getData();
        }
      );
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const querry = e.target[1].value;
    this.setState({
      querry: querry,
    });
    e.target[1].value = "";
  };

  getData = async () => {
    const { querry, currentPage, picturesPerPage } = this.state;

   

    try {
      this.setState({ isLoading: true });

      const data = await fetchData(
        querry,
        currentPage,
        picturesPerPage,
        
      );

      const totalHits = data.totalHits;
      const totalPages = Math.ceil(totalHits / picturesPerPage);
      console.log(totalHits);
      const picItem = data.hits.map((item) => ({
        id: item.id,
        webformatURL: item.webformatURL,
        largeImageURL: item.largeImageURL,
      }));

      this.setState((prevState) => ({
        pictures: [...prevState.pictures, ...picItem],
        totalPages: totalPages,
        isLoading: false,
      }));

      console.log(picItem);

      if (currentPage === totalPages || totalHits === 0) {
        this.setState({
          isButtonShow: false,
        });
      } else {
        this.setState({
          isButtonShow: true,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  handleLoadMore = async () => {
    const { currentPage, totalPages } = this.state;
    if (currentPage < totalPages) {
      this.setState(
        (prevState) => ({
          currentPage: prevState.currentPage + 1,
        }),
        () => {
          this.getData();
        }
      );
    }
  };

  handleModaleImage = (image) => {
    const selectedPicture = this.state.pictures.find(
      (picture) => picture.id === image.id
    );
    this.setState({
      selectedImage: selectedPicture,
      isOpenModal: true,
    });
  };

  handleCloseModal = () => {
    this.setState({ isOpenModal: false, selectedImage: null });
  };

  render() {
    const { pictures, isLoading, isOpenModal, selectedImage, isButtonShow } =
      this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery
          pictures={pictures}
          onImageClick={this.handleModaleImage}
        />
        {isLoading && <Loader />}
        {isButtonShow && (
          <Button onClick={this.handleLoadMore}>Load More</Button>
        )}
        {isOpenModal && (
          <Modal image={selectedImage} onCloseModal={this.handleCloseModal} />
        )}
      </div>
    );
  }
}

App.propTypes = {
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  querry: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  selectedImage: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
  isOpenModal: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  picturesPerPage: PropTypes.number.isRequired,
  isButtonShow: PropTypes.bool.isRequired,
};
