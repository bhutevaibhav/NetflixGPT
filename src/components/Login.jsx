import { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const toggleSignInform = (e) => {
    e.preventDefault();
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="background-img"
        />
      </div>

      <form className="absolute w-4/12 p-12 bg-black/80 my-36 mx-auto right-0 left-0 text-white bg-opacity-80">
        <h1 className="text-2xl font-bold">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 bg-gray-800 w-full"
          />
        )}
        <input
          type="text"
          placeholder="Email"
          className="p-4 my-4 bg-gray-800 w-full"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-4 my-4 bg-gray-800 w-full"
        />
        <button
          type="submit"
          className="p-3 my-6 w-full bg-red-600 text-white cursor-pointer"
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        {isSignInForm ? (
          <p>
            Already have an account?{" "}
            <span
              className="text-gray-400 cursor-pointer"
              onClick={toggleSignInform}
            >
              Sign in now.
            </span>
          </p>
        ) : (
          <p>
            New to Netflix?{" "}
            <span
              className="text-gray-400 cursor-pointer"
              onClick={toggleSignInform}
            >
              Sign up now.
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
