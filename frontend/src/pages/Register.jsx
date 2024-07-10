import React from "react";
import RegisterForm from "../components/Register/RegisterForm";
import LiftingDumbbells from "../components/LiftingDumbbells";
const Register = () => {

  return (
    <div className="bg-zinc-800 p-4">
      <div className="grid grid-cols-2 scale-90 rounded-md border-4 border-red-500">
      <div className="bg-zinc-900">
      </div>
      <div className="p-10 border-l-4 border-zinc-800 bg-zinc-900 ">
      <RegisterForm />
      </div>
      </div>
    </div>
  );
}

export default Register
