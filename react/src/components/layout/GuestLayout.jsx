import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import axiosClient from "../../axios";

export default function GuestLayout() {
  const [googleLoginRedirect, setGoogleLoginRedirect] = useState("");
  const { userToken } = useStateContext();

  useEffect(() => {
    if (userToken) {
      return <Navigate to="/"></Navigate>;
    }
  }, [userToken]);

  useEffect(() => {
    axiosClient
      .get("/auth/google/redirect")
      .then(({ data }) => {
        setGoogleLoginRedirect(data.url);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="sm:bg-gray-200 sm:grid sm:grid-cols-4">
      <div className="sm:col-start-2 sm:col-span-2 bg-white rounded-lg m-4">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Your Company"
              src={`${
                import.meta.env.VITE_API_BASE_URL
              }/images/logo_company/logo3.png`}
              className="mx-auto h-14 w-auto hover:cursor-pointer"
              onClick={() => {
                window.location.href = "/";
              }}
            />
          </div>
          <Outlet></Outlet>

          {/* Login with social account (Google,Facebook,..) */}
          <div>
            <div className="flex flex-col justify-center items-center">
              <span className="font-medium mb-2">
                Login with Google Account
              </span>
              <a
                href={googleLoginRedirect}
                className="rounded-2xl border border-2 hover:opacity-70"
              >
                <img
                  className="w-14 h-auto"
                  src={`${
                    import.meta.env.VITE_API_BASE_URL
                  }/images/googlelogo.png`}
                ></img>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
