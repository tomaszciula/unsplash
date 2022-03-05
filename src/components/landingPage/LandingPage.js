import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const options = [
  { value: "island", label: "Island" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const LandingPage = ({ text, setText }) => {
  const [value, setValue] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setText(e.value);
    console.log("e.value: ", e.value);
    console.log("Text: ", text);
  };
  const handleInputChange = (newValue) => {
    setInputValue(newValue);
    setText(newValue);
  };

  const onSubmit = (data) => {
    navigate("/gallery");
    console.log("text: ", text);
    console.log("inputValue: ", inputValue);
  };

  useEffect(() => {
    console.log("useEffect result: ", text);
  }, [text]);

  return (
    <div className="max-w-full h-screen bg-island bg-cover bg-center pt-40">
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-1/2 mx-auto">
          <div className="flex flex-col">
            <span className="text-white text-4xl font-bold">Unsplash</span>
            <span className="text-white mt-10">
              The internet's source of freely-usable images.
            </span>
            <span className="text-white font-bold my-4">
              Powered by creators everywhere
            </span>
          </div>
          <Select
            options={options}
            value={value}
            onChange={handleChange}
            inputValue={inputValue}
            onInputChange={handleInputChange}
            menuIsOpen={inputValue.length >= 3 ? true : false}
            autoFocus={true}
          />
        </div>
      </form>
    </div>
  );
};

export default LandingPage;
