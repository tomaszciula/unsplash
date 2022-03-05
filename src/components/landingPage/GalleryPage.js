import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import Unsplash from "unsplash-js";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { UnsplashContext } from "../../App";

import "./modal.css";

const GalleryPage = () => {
  const [image, setImage] = useState("");
  const [result, setResult] = useState([]);
  const [open, setOpen] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const context2 = useContext(UnsplashContext)
  const index = result.findIndex((item) => item.urls.regular === imageURL);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const handleClick = (e) => {
    console.log();
    console.log("Kliknięto", e);
    setImageURL(e.target.src);
    onOpenModal();
    console.log("imageURL ", imageURL);
    console.log("index ", index);
  };

  useEffect(() => {
    console.log("context przed axios: ", context2);
    axios
      .get(
        `https://api.unsplash.com/search/photos?query=${
          context2
        }&client_id=OgFp81xnu3Y6nnmdJdHj5UdBvmz2jMP_4o_YvmFz6-o`
      )
      .then(function (response) {
        setResult(response.data.results);
        console.log("Response: ", response);
        console.log("Result: ", result);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <UnsplashContext.Consumer>
      {() => (
        <div className="mx-auto">
          <div className="flex flex-wrap">
            {result.map((image) => (
              <img
                key={image.id}
                id={image.urls.regular}
                src={image.urls.small}
                onClick={handleClick}
              />
            ))}
          </div>
          <div className="w-full h-auto">
            <Modal open={open} onClose={onCloseModal}>
              <p>xxx</p>
              <img src={imageURL} className="" />
            </Modal>
          </div>
        </div>
      )}
    </UnsplashContext.Consumer>
  );
};

export default GalleryPage;
