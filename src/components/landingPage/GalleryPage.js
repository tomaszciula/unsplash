import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";

const GalleryPage = ({ text, setText }) => {
  const [index, setIndex] = useState(0);
  const [result, setResult] = useState([])
  const [open, setOpen] = useState(false);
  const [imageURL, setImageURL] = useState("");
  //const index = result.findIndex((item) => item.urls.regular === imageURL);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const handleClick = (e) => {
    const i = result && result.findIndex((item) => item.urls.regular === e.target.id);
    setImageURL(e.target.src);
    setIndex(i);
    onOpenModal();
  };

 

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(
          `https://api.unsplash.com/search/photos?query=${text}&client_id=OgFp81xnu3Y6nnmdJdHj5UdBvmz2jMP_4o_YvmFz6-o`
        )
        .then((response) => {
          console.log(response);
          setResult(response.data.results);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, [text]);

  useEffect(() => {
    console.log("useEffect result: ", result);
  }, [result]);

  return (
    <div className="flex flex-wrap mx-auto justify-center">
      {result && result.map((image) => (
        <div key={image.id} className="">
          <img
            key={image.id}
            id={image.urls.regular}
            alt={image.alt_description}
            src={image.urls.small}
            onClick={handleClick}
            className=""
          />
        </div>
      ))}
      <div className="w-full h-auto mt-10">
        <Modal open={open} onClose={onCloseModal}>
          <div className="flex justify-between">
            <p>xxx</p>
            {/*<p>{result[0].alt_description}</p>*/}
            {console.log("xxx ", result[index])}
            <p>yyy</p>
          </div>
          <img src={imageURL} alt="test" className="" />
          <div className="flex justify-between">
            <p>zzz</p>
            <p>fff</p>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default GalleryPage;
