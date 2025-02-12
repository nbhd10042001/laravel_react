import React, { useEffect } from "react";

export default function ProcessLayoutVNPay({ hidden = true, onCloseVNPayWindow }) {
  useEffect(() => {
    const element = document.getElementById("vnpay-process-layout");
    if (hidden) {
      element.classList.remove("hidden");
    } else {
      element.classList.add("hidden", hidden);
    }
  }, [hidden]);

  const closeVNPayWindow = () => {
    onCloseVNPayWindow();
  };

  return (
    <div
      id="vnpay-process-layout"
      className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 z-20"
    >
      <div>
        <h1 className="text-[40px] font-medium text-white text-center">
          VNPay Process
        </h1>
        <span className="text-[20px] italic font-medium text-white text-center">
          Please wait to server process your order...
        </span>
      </div>
      <button
        onClick={() => closeVNPayWindow()}
        className="bg-red-700 text-gray-100 my-5 p-2 rounded-lg hover:opacity-70 text-sm"
      >
        Cancel and close.
      </button>
    </div>
  );
}
