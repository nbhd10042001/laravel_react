import { useEffect, useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useStateContext } from "../contexts/ContextProvider";
import { Button, Modal } from "flowbite-react";

export function DialogComponent() {
  const [open, setOpen] = useState(false);
  const { dialog, showDialog } = useStateContext();

  useEffect(() => {
    if (dialog) {
      setOpen(true);
    }
  }, [dialog]);

  function closeDialog() {
    setOpen(false);
    showDialog(false);
  }

  return (
    <div>
      <Modal dismissible show={open} onClose={() => closeDialog()}>
        <Modal.Header>Terms of Service</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              With less than a month to go before the European Union enacts new
              consumer privacy laws for its citizens, companies around the world
              are updating their terms of service agreements to comply.
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              The European Union’s General Data Protection Regulation (G.D.P.R.)
              goes into effect on May 25 and is meant to ensure a common set of
              data rights in the European Union. It requires organizations to
              notify users as soon as possible of high-risk data breaches that
              could personally affect them.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="blue" onClick={() => closeDialog()}>
            I accept
          </Button>
          <Button color="gray" onClick={() => closeDialog()}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    // <Dialog open={open} onClose={closeDialog} className="relative z-21">
    //   <DialogBackdrop
    //     transition
    //     className="fixed inset-0 hidden bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:block"
    //   />

    //   <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
    //     <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
    //       <DialogPanel
    //         transition
    //         className="flex w-full transform text-left text-base transition data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:my-8 md:max-w-2xl md:px-4 data-[closed]:md:translate-y-0 data-[closed]:md:scale-95 lg:max-w-4xl"
    //       >
    //         <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
    //           <button
    //             type="button"
    //             onClick={closeDialog}
    //             className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
    //           >
    //             <span className="sr-only">Close</span>
    //             <XMarkIcon aria-hidden="true" className="size-6" />
    //           </button>
    //         </div>
    //       </DialogPanel>
    //     </div>
    //   </div>
    // </Dialog>
  );
}
