import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import axios from "axios";


const Login = () => {
  // useStates
  const [show, setShow] = useState(false);
  const [details, setDetails] = useState({
    username: "",
    password: "",
  });
  const [error,setError] = useState('')


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
  const navigate = useNavigate()

  // functions
  const onSuccess = async (res) => {
    const { email, googleId } = res.profileObj;
    try {
      const response = await axios.post(
        "/users/login",
        { email, googleId },
        { withCredentials: true }
      );
      console.log(response);
      // navigate('/')
    } catch (error) {
      const errorMessage = error.response.data.match(
        /<pre>Error: (.*?)<br>/
      )[1];
      setError(errorMessage)
    }
  };


  const onFailure = (res) => {
    console.log("Login failed! res: ", res);
  };


  const signIn = async (e) => {
    e.preventDefault()
    if (details.username === "" || details.password === "")
      setError("Username or password is required");
    try {
      const response = await axios.post(
        "/users/login",
        details,
        { withCredentials: true }
      );
      console.log(response);
      setDetails({
        username: "",
        password: "",
      })
      // navigate('/')
    } catch (error) {
      const errorMessage = error.response.data.match(
        /<pre>Error: (.*?)<br>/
      )[1];
      setError(errorMessage)
    }
  };
  
  return (
    <div className="fixed w-screen h-screen login-bg flex justify-center items-center">
      <div className="w-1/3 p-10 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-100">
        <h1 className="text-4xl font-bold text-gray-200 text-center">Login</h1>
        <div className="flex flex-col justify-center items-center mt-10 w-full border-b-2 border-white pb-8">
          <GoogleLogin
            clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
            buttonText="Sign In With Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={"single_host_origin"}
            isSignedIn={true}
            className="w-3/4 flex justify-center text-lg"
          />
        </div>
        <form className="text-white p-10 flex flex-col gap-4 justify-end" onSubmit={signIn}>
          <fieldset className="flex flex-col gap-2">
            <label htmlFor="username" className="text-lg">
              Username:{" "}
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
          </fieldset>
          <fieldset className="flex flex-col gap-2">
            <label htmlFor="password" className="text-lg">
              Password:{" "}
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your username"
              defaultValue={details.password}
              onChange={(e) =>
                setDetails({ ...details, password: e.target.value })
              }
              className="outline-none border-2 border-gray-300  w-full bg-transparent p-4 text-gray-200 focus:border-gray-500 placeholder-gray-100 transition-all"
            />
          </fieldset>
          <button
            type="submit"
            className="bg-red-700 px-4 py-2 text-lg mt-4 text-white shadow-xl btn-5"
          >
            Sign In!
          </button>
          <Link to="/register" className="underline text-sm">
            Don't have an account? Sign up now!
          </Link>
          <h1 className="text-red-500 font-thin">{error}</h1>
        </form>
      </div>
    </div>
  );
};

export default Login;
