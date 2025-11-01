import { createBrowserRouter } from "react-router-dom";
import Layout from "./../Layout/Layout";
import Home from "../Pages/Home/Home";
import FindTutors from "../Pages/FindTutors/FindTutors";
import AddTutorial from "../Pages/AddTutorial/AddTutorial";
import MyTutorials from "./../Pages/MyTutorials/MyTutorials";
import MyBookedTutors from "./../Pages/MyBookedTutors/MyBookedTutors";
import SignIn from "../Pages/Acounts/SignIn";
import SignUp from "../Pages/Acounts/SignUp";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";
import UpdateTutorial from "./../Components/UpdateTutorial/UpdateTutorial";
import Details from "./../Components/Details/Details";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Profile from "../Pages/Profile/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage></ErrorPage>,
    element: <Layout></Layout>,
    loader: () => fetch(`https://tutor-sphere-server-side.vercel.app/users`),
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: () =>
          fetch(`https://tutor-sphere-server-side.vercel.app/langueges`),
      },
      {
        path: "/findTutors/:category",
        element: <FindTutors></FindTutors>,
        loader: ({ params }) =>
          fetch(
            `https://tutor-sphere-server-side.vercel.app/tutors/category/${params.category}`
          ),
      },
      
      {
        path: "/addTutorial",
        element: (
          <PrivateRoutes>
            <AddTutorial></AddTutorial>
          </PrivateRoutes>
        ),
        loader: () =>
          fetch(`https://tutor-sphere-server-side.vercel.app/users`),
      },
      {
        path: "/myTutorial",
        element: (
          <PrivateRoutes>
            <MyTutorials></MyTutorials>
          </PrivateRoutes>
        ),
      },
      {
        path: "/myBookedTutors",
        element: (
          <PrivateRoutes>
            <MyBookedTutors></MyBookedTutors>
          </PrivateRoutes>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoutes>
            <Profile></Profile>
          </PrivateRoutes>
        ),
      },
      {
        path: "/updateTutorial/:id",
        element: (
          <PrivateRoutes>
            <UpdateTutorial></UpdateTutorial>
          </PrivateRoutes>
        ),
        loader: ({ params }) =>
          fetch(
            `https://tutor-sphere-server-side.vercel.app/tutorial/${params.id}`
          ),
      },
      {
        path: "/details/:id",
        element: (
          <PrivateRoutes>
            <Details></Details>
          </PrivateRoutes>
        ),
        loader: ({params}) => fetch(`https://tutor-sphere-server-side.vercel.app/tutorial/${params.id}`)
      },
      {
        path: "/signIn",
        element: <SignIn></SignIn>,
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>,
      },
    ],
  },
]);

export default router;
