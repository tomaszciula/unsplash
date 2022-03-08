import React from "react";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";

const ImageModal = ({ open, onCloseModal, imageURL, alt }) => {
  return (
    <div className="w-full h-auto mt-10">
      <Modal open={open} onClose={onCloseModal}>
        <div className="flex justify-between">
          <p>xxx</p>
          <p>{alt}</p>
          <p>yyy</p>
        </div>
        <img src={imageURL} alt="test" className="" />
        <div className="flex justify-between">
          <p>zzz</p>
          <p>fff</p>
        </div>
      </Modal>
    </div>
  );
};

export default ImageModal;
