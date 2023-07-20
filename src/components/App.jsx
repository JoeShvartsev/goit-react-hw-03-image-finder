import React, { useState, useEffect } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Loader } from "./Loader/Loader";
import { Button } from "./Button/Button";
import { Modal } from "./Modal/Modal";
import { fetchData } from "../Api/pictures";

export const App = () => {
  const [pictures, setPictures] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [picturesPerPage] = useState(12);
  const [isButtonShow, setIsButtonShow] = useState(false);
  const [querry, setQuerry] = useState("");

  useEffect(() => {
    setPictures([]);
    setIsButtonShow(false);
    if (querry.trim() !== "") {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [querry]);
  
  useEffect(() => {
    if (currentPage > 1) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const querryWord = e.target[1].value;
    setQuerry(querryWord);
    e.target[1].value = "";
    setCurrentPage(1); // Змінюємо сторінку на 1 при новому пошуку
  };

  const getData = async () => {
    try {
      setIsLoading(true);

      const data = await fetchData(querry, currentPage, picturesPerPage);
      const totalHits = data.totalHits;
      const totalPages = Math.ceil(totalHits / picturesPerPage);
      console.log(totalHits);
      const picItem = data.hits.map((item) => ({
        id: item.id,
        webformatURL: item.webformatURL,
        largeImageURL: item.largeImageURL,
      }));

      setTotalPages(totalPages);
      setIsLoading(false);
      if (currentPage === 1) {
        setPictures(picItem);
      } else {
        setPictures((prevState) => [...prevState, ...picItem]);
      }

      console.log(picItem);

      if (currentPage === totalPages || totalHits === 0) {
        setIsButtonShow(false);
      } else {
        setIsButtonShow(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
    }
  };

  const handleModalImage = (image) => {
    const selectedPicture = pictures.find((picture) => picture.id === image.id);
    setIsOpenModal(true);
    setSelectedImage(selectedPicture);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setSelectedImage(null);
  };

  return (
    <div>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery pictures={pictures} onImageClick={handleModalImage} />
      {isLoading && <Loader />}
      {isButtonShow && <Button onClick={handleLoadMore}>Load More</Button>}
      {isOpenModal && (
        <Modal image={selectedImage} onCloseModal={handleCloseModal} />
      )}
    </div>
  );
};



// import React, { Component } from "react";
// import { Searchbar } from "./Searchbar/Searchbar";
// import { ImageGallery } from "./ImageGallery/ImageGallery";
// import { Loader } from "./Loader/Loader";
// import { Button } from "./Button/Button";
// import { Modal } from "./Modal/Modal";
// import { fetchData } from "../Api/pictures";
// import PropTypes from "prop-types";

// export class App extends Component {
//   state = {
//     pictures: [],
//     querry: "",
//     currentPage: 1,
//     totalPages: 0,
//     selectedImage: null,
//     isOpenModal: false,
//     isLoading: false,
//     picturesPerPage: 12,
//     isButtonShow:false
//   };

//   componentDidUpdate( prevProps,prevState) {
//     if (prevState.querry !== this.state.querry) {
//       this.setState({currentPage:1,pictures:[],isButtonShow:false})
//       setTimeout(async()=>{this.getData()},500)
      
      
//     }
//   }

//   handleSubmit = (e) => {
//     e.preventDefault();
//     const querry = e.target[1].value;
//     this.setState({
//       querry: querry,
//     });
//     e.target[1].value = "";
//   };

//   getData = async () => {
//     const { querry, currentPage, picturesPerPage } = this.state;
  
//     try {
//       this.setState({ isLoading: true });
  
//       setTimeout(async () => {
//         const data = await fetchData(querry, currentPage, picturesPerPage);
//         const totalHits = data.totalHits;
//         const totalPages = Math.ceil(totalHits / picturesPerPage);
//         console.log(totalHits);
//         const picItem = data.hits.map((item) => ({
//           id: item.id,
//           webformatURL: item.webformatURL,
//           largeImageURL: item.largeImageURL,
//         }));
  
//         this.setState((prevState) => ({
//           pictures: [...prevState.pictures, ...picItem],
//           totalPages: totalPages,
//           isLoading: false,
//         }));
  
//         console.log(picItem);
  
//         if (currentPage === totalPages||totalHits===0) {
//           this.setState({
//             isButtonShow: false,
//           });
//         } else {
//           this.setState({
//             isButtonShow: true,
//           });
//         }
//       }, 500);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   handleLoadMore = async () => {
//     const { currentPage, totalPages } = this.state;
//     if (currentPage < totalPages) {
//       this.setState(
//         (prevState) => ({
//           currentPage: prevState.currentPage + 1,
//         }),
//         () => {
//           this.getData();
//         }
//       );
//     } 
//   };
  

//   handleModaleImage = (image) => {
//     const selectedPicture = this.state.pictures.find(
//       (picture) => picture.id === image.id
//     );
//     this.setState({
//       selectedImage: selectedPicture,
//       isOpenModal: true,
//     });
//   };

//   handleCloseModal = () => {
//     this.setState({ isOpenModal: false, selectedImage: null });
//   };

//   render() {
//     const { pictures, isLoading, isOpenModal, selectedImage,isButtonShow } = this.state;

//     return (
//       <div>
//         <Searchbar onSubmit={this.handleSubmit} />
//         <ImageGallery
//           pictures={pictures}
//           onImageClick={this.handleModaleImage}
//         />
//         {isLoading && <Loader />}
//         {isButtonShow&&<Button onClick={this.handleLoadMore}>Load More</Button>}
//         {isOpenModal && (
//           <Modal image={selectedImage} onCloseModal={this.handleCloseModal} />
//         )}
//       </div>
//     );
//   }
// }

// App.propTypes = {
//   pictures: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       webformatURL: PropTypes.string.isRequired,
//       largeImageURL: PropTypes.string.isRequired,
//     })
//   ).isRequired,
//   querry: PropTypes.string.isRequired,
//   currentPage: PropTypes.number.isRequired,
//   totalPages: PropTypes.number.isRequired,
//   selectedImage: PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     webformatURL: PropTypes.string.isRequired,
//     largeImageURL: PropTypes.string.isRequired,
//   }),
//   isOpenModal: PropTypes.bool.isRequired,
//   isLoading: PropTypes.bool.isRequired,
//   picturesPerPage: PropTypes.number.isRequired,
//   isButtonShow: PropTypes.bool.isRequired,
// };

