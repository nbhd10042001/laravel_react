import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import { Button, Drawer } from "flowbite-react";
import React, { useState } from "react";
import ItemCart from "./ItemCart";
import { useStateContext } from "../../contexts/ContextProvider";

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  const { cart, updateCart } = useStateContext();
  const clearAllItemInCart = () => {
    updateCart([]);
  };

  return (
    <div>
      <Drawer open={isOpen} onClose={handleClose} position="right">
        <Drawer.Header title="Your Cart" titleIcon={() => <></>} />
        <Drawer.Items className="h-[70%]">
          <div className="overflow-auto h-full mb-2 flex flex-col gap-2">
            {cart.length > 0 &&
              cart.map((item, index) => {
                return (
                  <ItemCart
                    className={"shadow-lg"}
                    key={`cart-${index}`}
                    item={item}
                  ></ItemCart>
                );
              })}
            {cart.length === 0 && (
              <span className="text-sm text-center">
                There are no products in the cart... Add some favorite products{" "}
                <a
                  className="text-indigo-500 underline hover:text-indigo-700"
                  href="/cars"
                >
                  here
                </a>
                .
              </span>
            )}
          </div>
          <div className="border-t-2">
            <div className="grid grid-cols-2 mt-2 font-medium">
              <span className="">Subtotal: </span>
              <span className="justify-self-end">
                {cart.reduce((acc, item) => acc + item.price * item.amount, 0)}
                $
              </span>
            </div>
            <span className="text-sm text-gray-600">
              Shipping and taxes calculated at checkout.
            </span>
            <div className="mt-4 grid grid-rows-2 gap-2">
              <Button className="bg-blue-800 hover:bg-blue-500 hover:text-white w-full">
                Checkout
              </Button>
              <div className="flex justify-center">
                <span
                  onClick={() => clearAllItemInCart()}
                  className=" text-red-500 text-center hover:text-red-800 hover:underline hover:cursor-pointer"
                >
                  Clear All Cart
                </span>
              </div>
            </div>
          </div>
        </Drawer.Items>
      </Drawer>

      <div id="cart-icon" className="w-14 h-14 fixed left-6 bottom-6 z-30">
        <Button
          className="bg-green-200 size-full"
          color="green"
          onClick={() => setIsOpen(true)}
        >
          <ShoppingBagIcon></ShoppingBagIcon>
        </Button>
      </div>
    </div>
  );
}
