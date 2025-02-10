import React, { useEffect, useState } from "react";
import PageComponent from "../../components/PageComponent";
import { useStateContext } from "../../contexts/ContextProvider";
import { Button } from "flowbite-react";

export default function Checkout() {
  const { currentUser, navigateR, cart } = useStateContext();

  useEffect(() => {
    if (!currentUser.id) {
      navigateR("/login");
    }
  }, []);

  return (
    <PageComponent title={"Checkout"}>
      <div className="sm:grid sm:grid-cols-3 sm:h-[26rem] sm:gap-2">
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
              <div className="col-span-3">{currentUser.phone}</div>
            </div>
          </form>
          <div className="p-4">
            <span className="font-medium mr-2">Select your payment:</span>
            <select className="rounded-lg w-auto">
              <option>Cash</option>
              <option>Paypal</option>
            </select>
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
            <Button color="blue" className="mt-4 w-full">
              Proceed to Payment
            </Button>
          </div>
        </div>
      </div>
    </PageComponent>
  );
}
