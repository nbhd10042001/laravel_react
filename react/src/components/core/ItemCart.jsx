import React, { useState } from "react";
import { Button, TextInput } from "flowbite-react";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useStateContext } from "../../contexts/ContextProvider";

export default function ItemCart({ item }) {
  const { cart, updateCart } = useStateContext();

  const handleUpdateCount = (c) => {
    let newC = item.amount + c;
    if (newC <= 0) {
      return;
    }
    updateCart(
      cart.map((i) => (i.id === item.id ? { ...i, amount: newC } : i))
    );
  };

  const handleRemoveItem = (itemRemove) => {
    const updatedCarts = cart.filter((item) => item.id !== itemRemove.id);
    updateCart(updatedCarts);
  };

  return (
    <div className="w-full h-28 rounded-lg bg-gray-100 flex">
      <img src={item.img_url} className="rounded-md w-[50%] m-2" />
      <div>
        <div className="font-medium">{item.slug}</div>
        <div className="font-sm">Price: {item.price}$</div>
        <div className="grid grid-cols-3">
          <div className="flex mt-2 items-center justify-self-center px-1 bg-blue-100 rounded-md col-span-2">
            <button
              onClick={() => handleUpdateCount(-1)}
              className="size-[20px] rounded-lg border-2 border-indigo-500 p-1 hover:bg-indigo-300"
            >
              <MinusIcon></MinusIcon>
            </button>
            <span className="mx-2">{item.amount}</span>
            <button
              onClick={() => handleUpdateCount(1)}
              className="size-[20px] rounded-lg border-2 border-indigo-500 p-1 hover:bg-indigo-300"
            >
              <PlusIcon></PlusIcon>
            </button>
          </div>
          <div className="flex mt-2 items-center justify-self-end mr-2">
            <button
              onClick={() => handleRemoveItem(item)}
              className="size-[25px] rounded-lg border-2 bg-red-100 border-red-600 p-1 hover:opacity-75"
            >
              <TrashIcon className="text-red-600"></TrashIcon>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
