import { createBrowserRouter, RouterProvider } from "react-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import Browse from "./Browse";
import Login from "./Login";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../store/userSlice";
import ProtectedRoutes from "../routes/ProtectedRoutes";

const Body = () => {
  const dispatch = useDispatch();
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: (
        <ProtectedRoutes>
          <Browse />
        </ProtectedRoutes>
      ),
    },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email } = user;
        dispatch(addUser({ uid, email }));
      } else {
        dispatch(removeUser());
      }
    });
  }, []);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
