import { createBrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Surveys from "./views/survey/Surveys";
import Login from "./views/Login";
import SignUp from "./views/Signup";
import GuestLayout from "./components/layout/GuestLayout";
import DefaultLayout from "./components/layout/DefaultLayout";
import SurveyView from "./views/survey/SurveyView";
import Cars from "./views/car/Cars";
import CarShow from "./views/car/CarShow";
import SurveyPublicView from "./views/survey/SurveyPublicView";
import SeedAdmin from "./views/user/SeedAdmin";
import ErrorPage from "./views/ErrorPage";
import UserProfile from "./views/user/UserProfile";
import UserProfileEdit from "./views/user/UserProfileEdit";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout/>,
        children: [
            {
                path: '/',
                element: <Navigate to='/dashboard' />
            },
            {
                path: '/dashboard',
                element: <Dashboard/>
            },
            {
                path: '/profile',
                element: <UserProfile/>
            },
            {
                path: '/profile/:name',
                element: <UserProfile/>
            },
            {
                path: '/profile/edit',
                element: <UserProfileEdit/>
            },
            {
                path: '/surveys',
                element: <Surveys />
            },
            {
                path: '/surveys/create',
                element: <SurveyView />
            },
            {
                path: '/surveys/:id',
                element: <SurveyView />
            },
            {
                path: '/cars',
                element: <Cars />
            },
            {
                path: '/car/show',
                element: <CarShow />
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <SignUp />
            },
        ]
    },
    {
        path: '/survey/public/:slug',
        element: <SurveyPublicView />
    },
    {
        path: '/error/:code',
        element: <ErrorPage />
    },
    {
        path: '/adminseed',
        element: <SeedAdmin />
    }
])

export default router;