import { createContext, useContext, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axiosClient from "../axios";
import router from "../router";

const StateContext = createContext({
  currentUser: {},
  setCurrentUser: () => {},
  userToken: null,
  setUserToken: () => {},
  updateCurrentUser: () => {},
  surveys: [],
  questionTypes: [],
  boxToast: [],
  showDialog: () => {},
});

export const ContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  // if token not exist localStorage, then assume it's an empty string
  const [userToken, _setUserToken] = useState(
    localStorage.getItem("TOKEN") || ""
  );
  const [surveys, setSurveys] = useState([]);
  const [questionTypes] = useState([
    "text",
    "select",
    "radio",
    "checkbox",
    "textarea",
  ]);
  const [boxToast, setBoxToast] = useState([]);
  const [dialog, setDialog] = useState(false);

  const toastColors = {
    success: "bg-green-100 text-green-500",
    warning: "bg-yellow-100 text-yellow-500",
    danger: "bg-red-100 text-red-500",
  };

  const setUserToken = (token) => {
    if (token) {
      localStorage.setItem("TOKEN", token);
    } else {
      localStorage.removeItem("TOKEN");
    }
    _setUserToken(token);
  };

  const updateCurrentUser = () => {
    if(userToken){
      axiosClient
      .get("/me")
      .then(({ data }) => {
        setCurrentUser(data.user);
      })
      .catch((err) => {
        router.navigate(`/error/${err.response.status}`);
      });
    }
  };

  const showToast = (message, type) => {
    const newBox = [...boxToast];
    newBox.push({ message: message, type: type, id: uuidv4() });
    setBoxToast(newBox);
  };

  const showDialog = (open) => {
    setDialog(open);
  }

  // generate token and refresh token when reload window
  const refreshToken = () => {
    axiosClient
      .post("csrf-token")
      .then((res) => {
        // console.log(res.data.csrfToken);
        document
          .querySelector('meta[name="csrf-token"]')
          .setAttribute("content", res.data.csrfToken);
      })
      .catch((error) => {
        router.navigate(`/error/${error.response.status}`);
      });
  };

  useEffect(() => {
    refreshToken();
  }, []);

  return (
    <StateContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        updateCurrentUser,
        userToken,
        setUserToken,
        surveys,
        questionTypes,
        boxToast,
        toastColors,
        showToast,
        dialog, showDialog
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
