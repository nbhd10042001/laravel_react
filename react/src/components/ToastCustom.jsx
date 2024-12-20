import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { Button, Toast } from "flowbite-react";
import { useStateContext } from "../contexts/ContextProvider";

export function ToastCustom({ message, type, id }) {
  const { toastColors } = useStateContext();

  setTimeout(() => {
    closeToast();
  }, 3000);

  const closeToast = () => {
    var element = document.getElementById(id);
    if (element) {
      element.remove();
    }
  };

  return (
    <div>
      {id && (
        <Toast className="animate-fade-in-down">
          <div
            className={
              `inline-flex h-8 w-8 shrink-0 items-center justify-center 
              rounded-lg dark:bg-cyan-800 dark:text-cyan-200 ` +
              toastColors[type]
            }
          >
            {type === "success" && <CheckCircleIcon className="h-5 w-5" />}
            {type === "warning" && (
              <ExclamationTriangleIcon className="h-5 w-5" />
            )}
            {type === "danger" && <XCircleIcon className="h-5 w-5" />}
          </div>
          <div className="ml-3 text-sm font-normal">{message}</div>
          <Toast.Toggle onClick={() => closeToast()} />
        </Toast>
      )}
    </div>
  );
}
