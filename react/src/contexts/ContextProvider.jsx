import { createContext, useContext, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const StateContext = createContext({
  currentUser: {},
  userToken: null,
  surveys: [],
  questionTypes: [],
  boxToast: [],
  setCurrentUser: () => {},
  setUserToken: () => {},
});

export const ContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  // if token not exist localStorage, then assume it's an empty string
  const [userToken, _setUserToken] = useState(localStorage.getItem("TOKEN") || "");
  const [surveys, setSurveys] = useState([]);
  const [questionTypes] = useState([ "text", "select", "radio", "checkbox", "textarea",]);

  const [boxToast, setBoxToast] = useState([]);
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

  const showToast = (message, type) => {
    const newBox = [...boxToast];
    newBox.push({message: message, type: type, id: uuidv4()});
    setBoxToast(newBox);
  };

  return (
    <StateContext.Provider
      value={{
        currentUser, setCurrentUser,
        userToken, setUserToken,
        surveys,
        questionTypes,
        boxToast, toastColors, showToast,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
