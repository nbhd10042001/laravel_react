import { useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios";
import { Spinner } from "flowbite-react";

export default function Login() {
  const { setCurrentUser, setUserToken } = useStateContext();

  const [userOrEmail, setUserOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ __html: "" });
  const [loading, setLoading] = useState(false);

  const onSubmit = (ev) => {
    ev.preventDefault();
    setLoading(true);
    setError({ __html: "" });
    axiosClient
      .post("/login", {
        userOrEmail: userOrEmail,
        password: password,
      })
      .then(({ data }) => {
        setLoading(false);
        setCurrentUser(data.user);
        setUserToken(data.token);
      })
      .catch((error) => {
        setLoading(false);
        setError({ __html: error.response.data.error });
      });
  };

  return (
    <>
      <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-indigo-700">
        Login to your account
      </h2>

      {/* render error */}
      {/* {error.__html && (
        <div
          className="bg-red-500 rounded py-2 px-3 text-white"
          dangerouslySetInnerHTML={error}
        ></div>
      )} */}
      {/* render error */}

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          onSubmit={onSubmit}
          action="#"
          method="POST"
          className="space-y-4"
        >
          {/* display error */}
          <div className="text-red-500 text-center">
            <span dangerouslySetInnerHTML={error}></span>
          </div>
          {/* display error */}

          <div>
            <label
              htmlFor="setUserOrEmail"
              className="block text-sm/6 font-medium text-gray-900"
            >
              User name Or Email address
            </label>
            <div className="mt-2">
              <input
                id="setUserOrEmail"
                name="setUserOrEmail"
                type="text"
                // type="email"
                // autoComplete="email"
                value={userOrEmail}
                onChange={(ev) => setUserOrEmail(ev.target.value)}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 
                  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                autoComplete="current-password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 
                  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 
                px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {loading ? <Spinner color="warning" aria-label="loading"></Spinner> : "Login"}
            </button>
          </div>
        </form>

        <div className="text-sm text-center mt-10">
          <a
            href="#"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Forgot password?
          </a>
        </div>

        <p className="text-center text-sm/6 text-gray-500">
          Not a member?{" "}
          <Link
            to="/signup"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Register your account here!
          </Link>
        </p>
      </div>
    </>
  );
}
