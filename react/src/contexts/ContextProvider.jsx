import { createContext, useContext, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axiosClient from "../axios";
import router from "../router";

const StateContext = createContext({
  navigateR: () => {},
  currentUser: {},
  setCurrentUser: () => {},
  userRole: null,
  checkUserRole: () => {},
  userToken: null,
  setUserToken: () => {},
  updateCurrentUser: () => {},
  surveys: [],
  questionTypes: [],
  boxToast: [],
  showToast: () => {},
  showDialog: () => {},
  urlRedirect: null,
  cart: [],
  updateCart: () => {},
  newItemAddCart: false,
  setNewItemAddCart: () => {},
  detailOrder: null,
  setDetailOrder: () => {},
  paymentSuccess: false,
  setPaymentSuccess: () => {},
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
  const toastColors = {
    success: "bg-green-100 text-green-500",
    warning: "bg-yellow-100 text-yellow-500",
    danger: "bg-red-100 text-red-500",
  };
  const [dialog, setDialog] = useState(false);
  const [urlRedirect, setUrlRedirect] = useState("/");
  const [userRole, setUserRole] = useState();
  const [cart, setCart] = useState([]);
  const [newItemAddCart, setNewItemAddCart] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [detailOrder, _setDetailOrder] = useState(null);

  // call api to get current user name and load cart in localstorage
  useEffect(() => {
    if (userToken) {
      axiosClient
        .get("/me")
        .then(({ data }) => {
          const userName = data.user.user_name;
          if (userName) {
            setCart(JSON.parse(localStorage.getItem(`cart_${userName}`)) || []);
          }
        })
        .catch((err) => {
          router.navigate(`/error/${err.response.status}`);
        });
    }
  }, []);

  const updateCart = (newCart) => {
    if (!userToken) {
      navigateR("/login");
    }
    setCart(newCart);
    localStorage.setItem(
      `cart_${currentUser.user_name}`,
      JSON.stringify(newCart)
    );
  };

  const setDetailOrder = (payload) => {
    console.log(payload);
  };

  const navigateR = (
    path = "/",
    error = false,
    { code = "", mess = "" } = {}
  ) => {
    if (error) {
      setUrlRedirect(path);
      router.navigate(`/error/${code}/${mess}`);
    } else {
      setUrlRedirect("/");
      router.navigate(path);
    }
  };

  const setUserToken = (token) => {
    if (token) {
      localStorage.setItem("TOKEN", token);
    } else {
      localStorage.removeItem("TOKEN");
    }
    _setUserToken(token);
    window.location.href = "/";
  };

  const updateCurrentUser = () => {
    if (userToken) {
      axiosClient
        .get("/me")
        .then(({ data }) => {
          setCurrentUser(data.user);
          setUserRole(data.user.role);
        })
        .catch((err) => {
          router.navigate(`/error/${err.response.status}`);
        });
    }
  };

  const checkUserRole = () => {
    const roles = ["Member", "Seller", "Admin"];
    axiosClient
      .get("/me")
      .then(({ data }) => {
        const role = data.user.role;
        if (!roles.includes(role)) {
          navigateR("/", true, {
            code: 400,
            mess: "Unauthorized this page!",
          });
        }
      })
      .catch((error) => {
        navigateR(window.location.pathname, true, {
          code: error.response.status,
          mess: error.response.statusText,
        });
      });
  };

  const showToast = (message, type = "success") => {
    const newBox = [...boxToast];
    newBox.push({ message: message, type: type, id: uuidv4() });
    setBoxToast(newBox);
  };

  const showDialog = (open) => {
    setDialog(open);
  };

  // generate token and refresh token csrf when reload window
  const refreshTokenCSRF = () => {
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
    refreshTokenCSRF();
  }, []);

  return (
    <StateContext.Provider
      value={{
        navigateR,
        urlRedirect,
        currentUser,
        setCurrentUser,
        updateCurrentUser,
        userRole,
        checkUserRole,
        userToken,
        setUserToken,
        surveys,
        questionTypes,
        boxToast,
        toastColors,
        showToast,
        dialog,
        showDialog,
        cart,
        updateCart,
        newItemAddCart,
        setNewItemAddCart,
        detailOrder,
        setDetailOrder,
        paymentSuccess,
        setPaymentSuccess,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
