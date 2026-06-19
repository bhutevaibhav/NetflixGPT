import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
    setErrorMsg(message);

    if (message) return;
    setIsLoading(true);
    if (!isSignInForm) {
      // sign up logic
      createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("User created:", user);
          setIsLoading(false);
        })
        .catch((error) => {
          setErrorMsg(error.message);
          console.error("Error creating user:", error);
          setIsLoading(false);
        })
        .finally(() => {
          setIsLoading(false);
          email.current.value = "";
          password.current.value = "";
          if (name.current) name.current.value = "";
        });
    } else {
      // sign in logic
      signInWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("User signed in:", user);
          setIsLoading(false);
        })
        .catch((error) => {
          setErrorMsg(error.message);
          console.error("Error signing in:", error);
          setIsLoading(false);
        })
        .finally(() => {
          setIsLoading(false);
          email.current.value = "";
          password.current.value = "";
        });
    }
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

        <div className="relative w-full my-4">
          <input
            ref={password}
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Password"
            className="p-4 my-4 bg-gray-800 w-full rounded pr-12 text-white"
          />

          <button
            type="button"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-xl select-none text-gray-400 hover:text-white"
          >
            {isPasswordVisible ? "👁️" : "🙈"}
          </button>
        </div>

        {errorMsg && <p className="text-red-500">{errorMsg}</p>}
        <button
          type="submit"
          disabled={isLoading}
          className={`p-3 my-6 w-full text-white font-semibold rounded ${
            isLoading
              ? "bg-red-800 opacity-50 cursor-not-allowed"
              : "bg-red-600 cursor-pointer hover:bg-red-700"
          }`}
        >
          {isLoading ? "Loading..." : isSignInForm ? "Sign In" : "Sign Up"}
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
