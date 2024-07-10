import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import axios from "axios";
import Asterick from "../../utils/Asterick";

const FormPage1 = ({ handleNext, details, setDetails, setManualLogin }) => {
  // useStates
  const [show, setShow] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // useEffect
  useEffect(() => {
    const start = () => {
      gapi.client.init({
        clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        scope: "",
      });
    };
    gapi.load("client:auth2", start);
  }, []);

  // other hooks
  const navigate = useNavigate();

  // functions
  const onSuccess = async (res) => {
    const { email, googleId, name, imageUrl } = res.profileObj;
    console.log(res.profileObj);
    try {
      setDetails({
        ...details,
        email: email,
        googleId: googleId,
        name: name,
        googleImg: imageUrl,
      });
      setManualLogin(false)
        handleNext()
      // navigate('/')
    } catch (error) {
      setError(errorMessage);
    }
  };

  const onFailure = (res) => {
    console.log("Login failed! res: ", res);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (details.email === "" || details.password === "")
      setError("Please enter all the details");
    else if (confirmPassword !== details.password) {
      setError("Password does not match");
    } else {
        setManualLogin(true)
      handleNext();
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-4 w-full border-b-2 border-white pb-8">
        <GoogleLogin
          clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
          buttonText="Register With Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
          className="w-3/4 flex justify-center text-lg"
        />
      </div>
      <form
        className="text-white p-10 flex flex-col gap-4 justify-end"
        onSubmit={handleSubmit}
      >
        <fieldset className="flex flex-col gap-2">
          <label htmlFor="email" className="text-lg">
            Email:<Asterick />
          </label>
          <input
            type="text"
            id="email"
            placeholder="Enter your email"
            defaultValue={details.email}
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
            className="outline-none border-2 border-gray-300 w-full bg-transparent p-4 text-gray-200 focus:border-gray-500 placeholder-gray-100 transition-all"
          />
        </fieldset>
        <fieldset className="flex flex-col gap-2">
          <label htmlFor="password" className="text-lg">
            Password:<Asterick />
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
        </fieldset>
        <fieldset className="flex flex-col gap-2">
          <label htmlFor="confirmPassword" className="text-lg">
            Confirm Password:<Asterick />
          </label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Enter your Password again :D"
            defaultValue={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="outline-none border-2 border-gray-300  w-full bg-transparent p-4 text-gray-200 focus:border-gray-500 placeholder-gray-100 transition-all"
          />
        </fieldset>
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

export default FormPage1;
