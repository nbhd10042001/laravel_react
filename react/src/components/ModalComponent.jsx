import { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";

export function ModalComponent({
  tittle = "",
  message = "",
  modal = false,
  setModal = () => {},
  clickAcceptButton = () => {},
}) {
  const handleCloseModalWhenClickLayout = (ev) => {
    if (ev.target.id === "layout-modal") {
      onSetModal(false);
    }
  };

  const onSetModal = () => {
    setModal(false);
  };

  const onClickButtonAccept = () => {
    clickAcceptButton();
  };

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modal]);

  return (
    <div>
      {modal && (
        <div
          id="layout-modal"
          onClick={(ev) => {
            handleCloseModalWhenClickLayout(ev);
          }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-[80%] sm:w-[50%] z-20">
            <h2 className="text-xl font-semibold border-b-2 pb-4">{tittle}</h2>
            <div className="space-y-6 mt-2 text-gray-600 max-h-[12rem] overflow-y-auto">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                {message}
              </p>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-blue-700 text-gray-200 rounded-lg hover:bg-blue-500"
                onClick={() => onClickButtonAccept()}
              >
                Accept
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                onClick={() => onSetModal(false)}
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
