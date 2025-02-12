import React, { useEffect } from "react";
import PageComponent from "../../components/PageComponent";
import { Spinner } from "flowbite-react";
import { useLocation } from "react-router-dom";

export default function SuccessVNPay() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const code = params.get("vnp_ResponseCode");
  const idOrder = params.get("vnp_TransactionNo");

  useEffect(() => {
    if (code === "00") {
      localStorage.setItem('id-order-vnpay', idOrder);
      setTimeout(() => {
        window.close();
      }, 3000);
      return;
    }

    // redirect home when status code error
    window.location.href = "/";
  }, []);

  return (
    <PageComponent title={"VNPay Success"}>
      <div className="my-26">
        <div className="text-2xl font-medium text-indigo-700 text-center">
          Payment Completed!
        </div>
        <div className="text-lg text-indigo-700 text-center">
          Tab will close in 3 second... <Spinner color="warning"></Spinner>
        </div>
      </div>
    </PageComponent>
  );
}
