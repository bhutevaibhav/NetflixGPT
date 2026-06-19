import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = (e) => {
    e.preventDefault();

    let emailValue = email.current.value;
    let passwordValue = password.current.value;
    let nameValue = null;

    if (!isSignInForm) {
      nameValue = name.current ? name.current.value : "";
      if (!nameValue) {
        setErrorMsg("Name is required");
        return;
      }
    }

    if (emailValue === "" || passwordValue === "") return;
    const message = checkValidData(
      emailValue,
      passwordValue,
      nameValue,
      isSignInForm,
    );

    console.log("Form values:", {
      email: emailValue,
      password: passwordValue,
      name: nameValue,
      isSignInForm,
    });

    console.log("Validation message:", message);

    setErrorMsg(message);
  };

  const toggleSignInform = () => {
    setErrorMsg(null);
    email.current.value = "";
    password.current.value = "";
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

      <form
        onSubmit={handleButtonClick}
        className="absolute w-4/12 p-12 bg-black/80 my-36 mx-auto right-0 left-0 text-white bg-opacity-80"
      >
        <h1 className="text-2xl font-bold">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 bg-gray-800 w-full"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email"
          className="p-4 my-4 bg-gray-800 w-full"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 bg-gray-800 w-full"
        />

        {errorMsg && <p className="text-red-500">{errorMsg}</p>}
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
