import { useState, useEffect } from "react";

import Login from "../components/Login/Login";
import SignUp from "../components/SignUp/SignUp";
import "./loginpage.css";

export default function LoginPage() {
  const [loginVisibility, toggleLoginVisibility] = useState(true);

  const toggleLogin = () => {
    toggleLoginVisibility(!loginVisibility);
  };

  return (
    <>
      <div className="loginpage-container">
        {loginVisibility ? (
          <Login signUpClick={toggleLogin} />
        ) : (
          <SignUp loginClick={toggleLogin} />
        )}
      </div>
    </>
  );
}
