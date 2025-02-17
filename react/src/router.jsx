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
import ErrorPage from "./views/ErrorPage";
import UserProfile from "./views/user/UserProfile";
import UserProfileEdit from "./views/user/UserProfileEdit";
import Home from "./views/Home";
import CarCreate from "./views/car/CarCreate";
import UserCars from "./views/car/UserCars";
import SeedPage from "./views/user/SeedPage";
import CarEdit from "./views/car/CarEdit";
import Checkout from "./views/payment/Checkout";
import LoginGoogle from "./views/LoginGoogle";
import Policy from "./views/Policy";
import Contact from "./views/Contact";
import SuccessVNPay from "./views/payment/SuccessVNPay";
import OrderSuccess from "./views/order/OrderSuccess";
import Orders from "./views/order/Orders";
import OrderShow from "./views/order/OrderShow";
import AdminUsers from "./views/adminboard/AdminUsers";
import AdminOrders from "./views/adminboard/AdminOrders";
import AdminCars from "./views/adminboard/AdminCars";
import SurveyPublicList from "./views/survey/SurveyPublicList";

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
        path: '/survey-public',
        element: <SurveyPublicList />,
      },
      {
        path: '/policy',
        element: <Policy />,
      },
      {
        path: '/contact',
        element: <Contact />,
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
        path: "/car/create",
        element: <CarCreate />,
      },
      {
        path: "/car/:id/show",
        element: <CarShow />,
      },
      {
        path: "/car/:id/edit",
        element: <CarEdit />,
      },
      {
        path: "/your-cars",
        element: <UserCars />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/order/success",
        element: <OrderSuccess />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/orders/:id/show",
        element: <OrderShow />,
      },
    ],
  },
  // AdminLayout and route admin
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      {
        path: "/admin/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/admin/surveys",
        element: <Surveys />,
      },
      {
        path: "/admin/surveys/create",
        element: <SurveyView />,
      },
      {
        path: "/admin/surveys/:id",
        element: <SurveyView />,
      },
      {
        path: "/admin/users",
        element: <AdminUsers />,
      },
      {
        path: "/admin/orders",
        element: <AdminOrders />,
      },
      {
        path: "/admin/cars",
        element: <AdminCars />,
      },
    ],
  },
  {
    path: '/vnpay-success',
    element: <SuccessVNPay />,
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
      {
        path: "/auth/google",
        element: <LoginGoogle />,
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
    path: "/seed/:text",
    element: <SeedPage />,
  },
]);

export default router;
