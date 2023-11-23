import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div>
      <h2>Welcome!</h2>
      <Link to="signin">
        <button> Sign In</button>
      </Link>
      <Link to="register">
        <button>Sign Up</button>
      </Link>
    </div>
  );
};

export default Hero;
