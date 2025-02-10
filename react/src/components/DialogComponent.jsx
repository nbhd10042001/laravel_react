import { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";

export function DialogComponent() {
  const { dialog, showDialog } = useStateContext();

  const handleCloseModalWhenClickLayout = (ev) => {
    // if (ev.target.id === "layout-modal") {
    //   showDialog(false);
    // }
  };

  useEffect(() => {
    if (dialog) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [dialog]);

  return (
    <div>
      {dialog && (
        <div
          id="layout-modal"
          onClick={(ev) => {
            handleCloseModalWhenClickLayout(ev);
          }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-[80%] sm:w-[50%] z-20">
            <h2 className="text-xl font-semibold border-b-2 pb-4">
              Terms of Service
            </h2>
            <div className="space-y-6 mt-2 text-gray-600 max-h-[12rem] overflow-y-auto">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                With less than a month to go before the European Union enacts
                new consumer privacy laws for its citizens, companies around the
                world are updating their terms of service agreements to comply.
              </p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                The European Union’s General Data Protection Regulation
                (G.D.P.R.) goes into effect on May 25 and is meant to ensure a
                common set of data rights in the European Union. It requires
                organizations to notify users as soon as possible of high-risk
                data breaches that could personally affect them.
              </p>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-blue-700 text-gray-200 rounded-lg hover:bg-blue-500"
                onClick={() => showDialog(false)}
              >
                Accept
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                onClick={() => showDialog(false)}
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
