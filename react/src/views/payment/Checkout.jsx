import React, { useEffect, useState } from "react";
import PageComponent from "../../components/PageComponent";
import { useStateContext } from "../../contexts/ContextProvider";
import { Button } from "flowbite-react";
import axiosClient from "../../axios";
import PaypalButtonComponent from "../../paypal";
import ProcessLayoutVNPay from "./ProcessLayoutVNPay";

const urlIcons = {
  cash: "https://cdn-icons-png.flaticon.com/512/4470/4470504.png",
  vnpay:
    "https://cdn.haitrieu.com/wp-content/uploads/2022/10/Icon-VNPAY-QR.png",
  paypal: "https://cdn-icons-png.flaticon.com/512/174/174861.png",
};
const methods = [
  {
    id: "cash",
    label: "Cash",
    defaultChecked: true,
    icon: urlIcons.cash,
  },
  {
    id: "vnpay",
    label: "VNPay",
    defaultChecked: false,
    icon: urlIcons.vnpay,
  },
  {
    id: "paypal",
    label: "Paypal",
    defaultChecked: false,
    icon: urlIcons.paypal,
  },
];

export default function Checkout() {
  const {
    userToken,
    currentUser,
    navigateR,
    showToast,
    cart,
    paymentSuccess,
    setPaymentSuccess,
    setDetailOrder,
  } = useStateContext();
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [processLayoutVNPay, setProcessLayoutVNPay] = useState(false);
  const [windowVNPay, setWindowVNPay] = useState(null);
  const [phoneInput, setPhoneInput] = useState("");

  useEffect(() => {
    if (!userToken) {
      navigateR("/login");
    }
    setPhoneInput(currentUser.phone);
  }, []);

  useEffect(() => {
    if (paymentSuccess) {
      navigateR("/order/success");
    }
  }, [paymentSuccess]);

  const onCloseVNPayWindow = () => {
    windowVNPay.close();
  };

  const addDetailOrder = (idOrder) => {
    setDetailOrder({
      userId: currentUser.id,
      email: currentUser.email,
      phone: phoneInput,
      method: paymentMethod,
      orderId: idOrder,
      orderItems: [...cart],
    });
  };

  const onSubmit = () => {
    if (!phoneInput) {
      showToast("Phone field is required", "warning");
      return;
    }
    setPaymentSuccess(false);

    if (paymentMethod === "cash") {
      addDetailOrder('');
      setPaymentSuccess(true);
      return;
    }
    if (paymentMethod === "vnpay") {
      setProcessLayoutVNPay(true);
      const payload = {
        amount: cart.reduce((acc, item) => acc + item.price * item.amount, 0),
        returnUrl: window.location.origin + "/vnpay-success",
      };
      axiosClient
        .get("/vnpay", { params: payload, withCredentials: true })
        .then(({ data }) => {
          let newWindow = window.open(
            data.url,
            "_blank",
            "width=800,height=600"
          );
          setWindowVNPay(newWindow);
          // check if newWindow closed every 1s
          let checkInterval = setInterval(() => {
            if (newWindow && newWindow.closed) {
              let id = localStorage.getItem("id-order-vnpay");
              if (id) {
                localStorage.setItem("id-order-vnpay", "");
                addDetailOrder(id);
                setPaymentSuccess(true);
              }
              setProcessLayoutVNPay(false);
              clearInterval(checkInterval);
            }
          }, 1000);
        })
        .catch((e) => {
          console.log(e);
          setProcessLayoutVNPay(false);
        });
      return;
    }
  };

  return (
    <PageComponent title={"Checkout"}>
      <ProcessLayoutVNPay
        hidden={processLayoutVNPay}
        onCloseVNPayWindow={onCloseVNPayWindow}
      ></ProcessLayoutVNPay>
      <div className="sm:grid sm:grid-cols-3 sm:h-[29rem] sm:gap-2">
        <div className="mt-2 rounded-lg col-span-2 bg-gray-100 p-4">
          <h2 className="text-center font-medium text-xl py-2 border-b-2">
            Information
          </h2>
          <form className="p-4">
            <div className="mt-4 grid grid-cols-4">
              <div className="col-span-1 font-medium">Full Name:</div>
              <div className="col-span-3">{currentUser.name}</div>
            </div>
            <div className="mt-4 grid grid-cols-4">
              <div className="col-span-1 font-medium">Email Address:</div>
              <div className="col-span-3">{currentUser.email}</div>
            </div>
            <div className="mt-4 grid grid-cols-4">
              <div className="col-span-1 font-medium">Phone Number:</div>
              <div className="col-span-3">
                <input
                  type="text"
                  defaultValue={currentUser.phone}
                  required
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
                    setPhoneInput(e.target.value);
                  }}
                />
              </div>
            </div>
          </form>
          <div className="p-4">
            <div className="font-medium mb-4">Select your payment method:</div>
            <div className="flex flex-wrap w-full pb-2">
              {methods.map((method, index) => {
                return (
                  <div
                    key={`method-${index}`}
                    className="flex mr-12 items-center w-20"
                  >
                    <input
                      id={`method-${method.id}`}
                      name="select-payment-method"
                      defaultChecked={method.defaultChecked}
                      type="radio"
                      onChange={() => {
                        setPaymentMethod(method.id);
                      }}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <div className="ml-2 block text-sm font-small text-gray-700 flex gap-2">
                      <span>{method.label}</span>{" "}
                      <img src={method.icon} className="w-6"></img>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <p className="italic p-4 text-sm text-gray-600">
            <span className="font-medium">
              Customers please note the following:
            </span>{" "}
            Please go to the car supplier's location to receive your car. When
            you want to return the product, please contact the hotline and go to
            the location where you picked up the car to proceed with the return.
          </p>
        </div>
        <div className="mt-2 rounded-lg col-span-1 bg-gray-100 p-4">
          <h2 className="hidden sm:flex text-center font-medium text-xl py-2 border-b-2">
            List Order
          </h2>
          <ul className="p-4 max-h-[15rem] sm:max-h-[70%] overflow-auto">
            {cart.map((order) => (
              <li key={order.id} className="flex justify-between py-2">
                <img src={order.img_url} className="size-12"></img>
                <div className="flex flex-col">
                  <span className="font-medium">{order.slug}</span>
                  <span className="text-md text-gray-600">x{order.amount}</span>
                </div>
                <span>${order.price * order.amount}</span>
              </li>
            ))}
          </ul>
          <div className="border-t-2 pt-4">
            <div className="flex justify-between py-2">
              <span className="font-bold">Total:</span>
              <span className="font-bold">
                ${cart.reduce((acc, item) => acc + item.price * item.amount, 0)}
              </span>
            </div>
            {/* Button payment */}
            <div className="mt-4">
              <div
                className={`flex flex-col gap-1 ${
                  paymentMethod !== "paypal" ? "flex" : "hidden"
                } `}
              >
                <Button
                  onClick={onSubmit}
                  disabled={cart.length > 0 ? false : true}
                  color="success"
                  pill
                >
                  Pay with {paymentMethod.toUpperCase()}{" "}
                  <img
                    className="w-6 ml-2 h-6"
                    src={
                      paymentMethod === "cash" ? urlIcons.cash : urlIcons.vnpay
                    }
                  ></img>
                </Button>
                <span className="text-center text-sm italic">
                  Proceed to Payment
                </span>
              </div>
              <div className={paymentMethod === "paypal" ? "block" : "hidden"}>
                <PaypalButtonComponent
                  onAddDetailOrder={addDetailOrder}
                ></PaypalButtonComponent>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageComponent>
  );
}
