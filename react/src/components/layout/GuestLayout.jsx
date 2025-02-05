import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";

export default function GuestLayout() {
  const { userToken } = useStateContext();
  if (userToken) {
    return <Navigate to="/"></Navigate>;
  }

  return (
    <div>
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
      </div>
    </div>
  );
}
