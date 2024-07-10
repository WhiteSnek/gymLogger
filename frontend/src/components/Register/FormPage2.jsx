import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import axios from "axios";
import Asterick from "../../utils/Asterick";

const FormPage2 = ({ handleNext, details, setDetails, manualLogin }) => {
  // useStates
  const [error, setError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // other hooks
  const navigate = useNavigate();


  // functions

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(details)
    if ((manualLogin && details.name === '') || details.username === '' || details.age === '' || details.gender === '' || details.password === '') {
      setError("Please Enter All the Details");
    } else if (!manualLogin && (details.password !== confirmPassword)) {
      setError("Passwords do not match");
    } else {
      setError("");
      handleNext(); // Assuming this function moves to the next step or submits the form
    }
  };
  

  const signIn = async (e) => {
    e.preventDefault();
    if (details.username === "" || details.password === "")
      setError("Username or password is required");
    try {
      const response = await axios.post("/users/login", details, {
        withCredentials: true,
      });
      console.log(response);
      setDetails({
        username: "",
        password: "",
      });
      // navigate('/')
    } catch (error) {
      const errorMessage = error.response.data.match(
        /<pre>Error: (.*?)<br>/
      )[1];
      setError(errorMessage);
    }
  };

  return (
    <div>
      <form
        className="text-white p-10 flex flex-col gap-4 justify-end"
        onSubmit={handleSubmit}
      >
        <fieldset className="grid grid-cols-2 gap-4 border-4 border-red-500 p-4 rounded-lg">
          <legend className="text-lg font-bold px-2">Personal Details</legend>
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-lg">
              Full name:
              <Asterick />
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              defaultValue={details.name}
              onChange={(e) => setDetails({ ...details, name: e.target.value })}
              className={`outline-none border-2 border-gray-300 w-full bg-transparent p-4 text-gray-200 focus:border-gray-500 placeholder-gray-100 transition-all ${!manualLogin && "cursor-not-allowed"}`}
                disabled={!manualLogin}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-lg">
              User name:
              <Asterick />
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              defaultValue={details.username}
              onChange={(e) =>
                setDetails({ ...details, username: e.target.value })
              }
              className="outline-none border-2 border-gray-300 w-full bg-transparent p-4 text-gray-200 focus:border-gray-500 placeholder-gray-100 transition-all"
            />
          </div>
        </fieldset>
        <fieldset className="grid grid-cols-3 gap-4 border-4 border-red-500 p-4 rounded-lg">
          <legend className="text-lg font-bold px-2">Additional Details</legend>
          <div className="flex flex-col gap-2">
            <label htmlFor="age" className="text-lg">
              Age:
              <Asterick />
            </label>
            <input
              type="text"
              inputMode="numeric"
              id="age"
              placeholder="Enter your age"
              defaultValue={details.age}
              onChange={(e) => setDetails({ ...details, age: e.target.value })}
              className="outline-none border-2 border-gray-300  w-full bg-transparent p-4 text-gray-200 focus:border-gray-500 placeholder-gray-100 transition-all"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="gender" className="text-lg">
              Gender:
              <Asterick />
            </label>
            <select
              id="gender"
              placeholder="Enter your gender"
              onChange={(e) =>
                setDetails({ ...details, gender: e.target.value })
              }
              className="outline-none border-2 border-gray-300  w-full bg-transparent p-4 text-gray-200 focus:border-gray-500 placeholder-gray-100 transition-all"
            >
              <option value="Male" className="bg-stone-800 focus:bg-stone-900">
                Male
              </option>
              <option value="Female" className="bg-stone-800">
                Female
              </option>
              <option value="Other" className="bg-stone-800">
                Other
              </option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="weight" className="text-lg">
              Weight:
              <Asterick />
            </label>
            <input
              type="text"
              inputMode="numeric"
              id="weight"
              placeholder="Enter your weight"
              defaultValue={details.weight}
              onChange={(e) =>
                setDetails({ ...details, weight: e.target.value })
              }
              className="outline-none border-2 border-gray-300  w-full bg-transparent p-4 text-gray-200 focus:border-gray-500 placeholder-gray-100 transition-all"
            />
          </div>
        </fieldset>
        {!manualLogin && (
          <fieldset className="grid grid-cols-2 gap-4 border-4 border-red-500 p-4 rounded-lg">
            <legend className="text-lg font-bold px-2">
              Set your Password
            </legend>
            <div>
              <label htmlFor="password" className="text-lg">
                Password:
                <Asterick />
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                defaultValue={details.password}
                onChange={(e) =>
                  setDetails({ ...details, password: e.target.value })
                }
                className="outline-none border-2 border-gray-300  w-full bg-transparent p-4 text-gray-200 focus:border-gray-500 placeholder-gray-100 transition-all"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="text-lg">
                Confirm Password:
                <Asterick />
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Enter your Password again :D"
                defaultValue={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="outline-none border-2 border-gray-300  w-full bg-transparent p-4 text-gray-200 focus:border-gray-500 placeholder-gray-100 transition-all"
              />
            </div>
          </fieldset>
        )}
        <button
          type="submit"
          className="bg-red-700 px-4 py-2 text-lg mt-4 text-white shadow-xl btn-5"
        >
          NEXT
        </button>
        <Link to="/login" className="underline text-sm">
          Already have an Account? Sign in!
        </Link>
        <h1 className="text-red-500 font-thin">{error}</h1>
      </form>
    </div>
  );
};

export default FormPage2;
