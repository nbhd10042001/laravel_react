import { createBrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Surveys from "./views/survey/Surveys";
import Login from "./views/Login";
import SignUp from "./views/Signup";
import GuestLayout from "./components/layout/GuestLayout";
import DefaultLayout from "./components/layout/DefaultLayout";
import AdminLayout from "./components/layout/AdminLayout";
import SurveyView from "./views/survey/SurveyView";
import Cars from "./views/car/Cars";
import CarShow from "./views/car/CarShow";
import SurveyPublicView from "./views/survey/SurveyPublicView";
import SeedAdmin from "./views/user/SeedAdmin";
import ErrorPage from "./views/ErrorPage";
import UserProfile from "./views/user/UserProfile";
import UserProfileEdit from "./views/user/UserProfileEdit";
import Home from "./views/Home";
import CarCreate from "./views/car/CarCreate";

const router = createBrowserRouter([
  // main layout and route
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/home" />,
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: "/profile",
        element: <UserProfile />,
      },
      {
        path: "/profile/:name",
        element: <UserProfile />,
      },
      {
        path: "/profile/edit",
        element: <UserProfileEdit />,
      },
      {
        path: "/cars",
        element: <Cars />,
      },
      {
        path: "/car/show/:id",
        element: <CarShow />,
      },
      {
        path: "/car/create",
        element: <CarCreate />,
      },
    ],
  },
  // AdminLayout and route admin
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/surveys",
        element: <Surveys />,
      },
      {
        path: "/surveys/create",
        element: <SurveyView />,
      },
      {
        path: "/surveys/:id",
        element: <SurveyView />,
      },
    ],
  },
  // GuestLayout and route login/signup
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
  // other route
  {
    path: "/survey/public/:slug",
    element: <SurveyPublicView />,
  },
  {
    path: "/error/:code/:text?",
    element: <ErrorPage />,
  },
  {
    path: "/adminseed",
    element: <SeedAdmin />,
  },
]);

export default router;
