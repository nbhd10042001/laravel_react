import React, { useEffect, useRef } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useStateContext } from "./contexts/ContextProvider";

const PaypalButtonComponent = ({ onAddDetailOrder = () => {} }) => {
  const { setPaymentSuccess } = useStateContext();
  const initialOptions = {
    "client-id":
      "AYM3e5qNwMczrecVhG2RbFYZMf9S0sCzFNvl32K1Q9HKqhxnQrDPhwJ5GpNJXSbzS84umuMTm9rHG7Pj",
    intent: "capture",
    locale: "en_US", // 'vi_VN'
    commit: true,
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: "1000",
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      onAddDetailOrder(details.id);
      setPaymentSuccess(true);
    });
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
        style={{
          layout: "horizontal",
          label: "pay",
          shape: "pill",
          disableFunding: "credit,debit,card,venmo,sepa",
        }}
        createOrder={(data, actions) => createOrder(data, actions)}
        onApprove={(data, actions) => onApprove(data, actions)}
      ></PayPalButtons>
    </PayPalScriptProvider>
  );
};

export default PaypalButtonComponent;
