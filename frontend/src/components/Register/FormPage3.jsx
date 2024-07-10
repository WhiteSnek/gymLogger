import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdUpload } from "react-icons/md";
import { IconContext } from "react-icons/lib";

const FormPage3 = ({ details, setDetails, register }) => {
  const [error, setError] = useState("");
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setDetails({
        ...details,
        avatar: e.target.files[0],
        avatarUrl: URL.createObjectURL(e.target.files[0]),
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (imageUrl) {
      register();
    } else {
      setError("Please upload an avatar");
    }
  };
  console.log(details.avatar);
  const imageUrl = details.avatarUrl || details.googleImg;
  return (
    <div className="p-4">
      <form className="text-white p-10 flex flex-col gap-4 justify-end border-2 border-red-500 rounded-lg" onSubmit={handleSubmit}>
        <div className="flex justify-center items-center">
          {imageUrl && (
            <img
              src={imageUrl}
              alt="avatar"
              className="w-40 aspect-square rounded-full object-cover"
            />
          )}
        </div>
        <fieldset className="flex flex-col gap-2">
          <label htmlFor="email" className="text-lg">
            Set your avatar:{" "}
          </label>
          <div className="relative flex justify-center items-center border-dashed border-2 border-red-500 p-14 rounded-md">
            <input
              className="opacity-0 w-full h-full absolute inset-0 cursor-pointer"
              type="file"
              accept="image/*"
              onChange={handleChange}
            />
            <button className="bg-red-600 text-white px-4 py-2 text-lg rounded flex justify-center items-center gap-2 transition duration-150 ease-in-out hover:bg-red-600">
              <IconContext.Provider value={{ color: "white", size: "25px" }}>
                <MdUpload />
              </IconContext.Provider>
              Browse
            </button>
          </div>
        </fieldset>

        <button
          type="submit"
          className="bg-red-700 px-4 py-2 text-lg mt-4 text-white shadow-xl btn-5"
        >
          Register!
        </button>
        <Link to="/login" className="underline text-sm">
          Already have an Account? Sign in!
        </Link>
        <h1 className="text-red-500 font-thin">{error}</h1>
      </form>
    </div>
  );
};

export default FormPage3;
