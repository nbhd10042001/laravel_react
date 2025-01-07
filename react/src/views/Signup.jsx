import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../axios.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { Spinner } from "flowbite-react";

export default function SignUp() {
  const { setCurrentUser, setUserToken } = useStateContext();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (ev) => {
    ev.preventDefault();
    setLoading(true);
    axiosClient
      .post("/signup", {
        name: fullName,
        email: email,
        user_name: userName,
        password: password,
        password_confirmation: passwordConfirmation,
      })
      .then(({ data }) => {
        setCurrentUser(data.user);
        setUserToken(data.token);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 500) {
          navigate(`/error/${error.response.status}/${error.response.statusText}`);
        }
        if (error.response.data) {
          const errors = error.response.data.errors;
          if (errors.email) {
            showError("email", errors.email[0]);
          }
          if (errors.user_name) {
            showError("username", errors.user_name[0]);
          }
          if (errors.password) {
            showError("password", errors.password[0]);
          }
          if (errors.name) {
            showError("fullname", errors.name[0]);
          }
        }
      });
  };

  const showError = (id, message) => {
    document.getElementById(`error-${id}`).innerHTML = message;
    document.getElementById(id).classList.add("border-red-500");
  };

  const disableError = (id) => {
    document.getElementById(`error-${id}`).innerHTML = "";
    document.getElementById(id).classList.remove("border-red-500");
  };

  const classes = [
    "block",
    "w-full",
    "border-gray-100",
    "rounded-md",
    "py-1.5",
    "text-gray-900",
    "shadow-sm",
    "ring-1",
    "ring-inset",
    "ring-gray-300",
    " placeholder:text-gray-400",
    "focus:ring-2",
    "focus:ring-inset",
    "focus:ring-indigo-600",
    "sm:text-sm/6",
    " ",
  ];

  return (
    <>
      <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
        Sign Up
      </h2>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          onSubmit={onSubmit}
          action="#"
          method="POST"
          className="space-y-6"
        >
          {/* form sign up */}
          <div>
            <label
              htmlFor="fullname"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Full Name
            </label>
            <div className="mt-2">
              <input
                id="fullname"
                name="full-name"
                type="text"
                required
                value={fullName}
                onChange={(ev) => {
                  disableError("fullname");
                  setFullName(ev.target.value);
                }}
                className={classes.join(" ")}
                placeholder="Your full name ..."
              />
            </div>
            <small id="error-fullname" className="text-red-500"></small>
          </div>

          <div>
            <label
              htmlFor="username"
              className="block text-sm/6 font-medium text-gray-900"
            >
              User Name
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="user-name"
                type="text"
                required
                value={userName}
                onChange={(ev) => {
                  disableError("username");
                  setUserName(ev.target.value);
                }}
                className={classes.join(" ")}
                placeholder="Your User name ..."
              />
            </div>
            <small id="error-username" className="text-red-500"></small>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(ev) => {
                  disableError("email");
                  setEmail(ev.target.value);
                }}
                autoComplete="email"
                className={classes.join(" ")}
                placeholder="Your email ..."
              />
            </div>
            <small id="error-email" className="text-red-500"></small>
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
                onChange={(ev) => {
                  disableError("password");
                  setPassword(ev.target.value);
                }}
                autoComplete="current-password"
                className={classes.join(" ")}
              />
            </div>
            <small id="error-password" className="text-red-500"></small>
          </div>

          <div>
            <label
              htmlFor="password-confirmation"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Password Confirmation
            </label>
            <div className="mt-2">
              <input
                id="password-confirmation"
                name="password_confirmation"
                type="password"
                required
                value={passwordConfirmation}
                onChange={(ev) => setPasswordConfirmation(ev.target.value)}
                className={classes.join(" ")}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {loading ? <Spinner aria-label="loading"></Spinner> : "Sign Up"}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Already Account?{" "}
          <Link
            to="/login"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Login with your account here!
          </Link>
        </p>
      </div>
    </>
  );
}
