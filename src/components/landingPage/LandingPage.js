import React, { useContext, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Route } from "react-router";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UnsplashContext } from "../../App";

const options = [
  { value: "island", label: "Island" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const LandingPage = () => {
  const [value, setValue] = useState(options);
  const [inputValue, setInputValue] = useState("");
  const { register, handleSubmit } = useForm();
  let context = useContext(UnsplashContext);
  const navigate = useNavigate();

  const handleChange = (selected) => {
    setValue(selected);
    //context = selected.label;
    console.log("selected: ", selected);
  };
  const handleInputChange = (newValue) => {
    setInputValue(newValue);
    context = inputValue;
  };
  const onSubmit = (data) => {
    context = inputValue;
    navigate("/gallery");

    console.log("context: ", context);
    console.log("value: ", value);
    console.log("inputValue: ", inputValue);
  };

  return (
    <UnsplashContext.Consumer>
      {() => (
        <div className="max-w-full h-screen bg-island bg-cover bg-center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-1/2 mx-auto mt">
              <div className="flex flex-col">
                <span className="text-white text-4xl font-bold">Unsplash</span>
                <span className="text-white">
                  The internet's source of freely-usable images.
                </span>
                <span className="text-white font-bold">
                  Powered by creators everywhere
                </span>
              </div>
              <Select
                className=""
                classNamePrefix="select"
                //defaultValue="select"
                name="photos"
                //name="searchInput"
                placeholder="Select..."
                options={options}
                value={value}
                onChange={handleChange}
                inputValue={inputValue}
                onInputChange={handleInputChange}
                isSearchable={true}
                isClearable={true}
                //{...register("word")}
              />
            </div>
            <input type="submit" />
          </form>
        </div>
      )}
    </UnsplashContext.Consumer>
  );
};

export default LandingPage;
