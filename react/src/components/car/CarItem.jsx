import React from "react";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
import {
  PencilIcon,
  ShoppingCartIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import axiosClient from "../../axios";
import { useStateContext } from "../../contexts/ContextProvider";

export default function CarItem({ car, haveEdit }) {
  const { showToast, cart, updateCart, setNewItemAddCart } = useStateContext();

  const onClickEditCar = () => {
    window.location.href = `/car/${car.id}/edit`;
  };
  const onClickDeleteCar = () => {
    if (window.confirm("Are you sure you want to delete this survey?")) {
      axiosClient.delete(`/car/${car.id}`).then(() => {
        document
          .getElementById(`car-item-id-${car.id}`)
          .classList.add("hidden");
        showToast("The car was deleted!", "danger");
      });
    }
  };

  const onClickAddToCart = () => {
    var isUpdate = false;
    cart.map((item) => {
      if (item.id === car.id) {
        isUpdate = true;
        return;
      }
    });

    if (isUpdate) {
      updateCart(
        cart.map((item) =>
          item.id === car.id ? { ...item, amount: item.amount + 1 } : item
        )
      );
    } else {
      updateCart([
        ...cart,
        {
          id: car.id,
          img_url: car.img_url,
          slug: car.slug,
          price: car.price,
          amount: 1,
        },
      ]);
    }
    setNewItemAddCart(true);
  };

  return (
    <div
      id={`car-item-id-${car.id}`}
      className="group relative border rounded-md bg-gray-50 shadow-md"
    >
      <img
        src={car.img_url}
        className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-40"
      />

      <div className="my-4 mx-2 flex-col justify-between">
        <h3 className="text-md text-gray-900 font-medium">
          <Link to={`/car/${car.id}/show`}>
            <span aria-hidden="true" className="absolute inset-0" />
            {car.year}
            {" - "}
            {car.maker} {car.model}
          </Link>
        </h3>
        <p className="text-sm font-medium my-2 text-gray-900">{car.price} $</p>
        <hr />
        <div className="flex flex-wrap gap-2 my-2">
          <p className="mr-1 px-2 text-sm text-gray-500 rounded-lg bg-gray-200">
            {car.car_type}
          </p>
          <p className="mr-1 px-2 text-sm text-gray-500 rounded-lg bg-gray-200">
            {car.fuel_type}
          </p>
        </div>

        {/* add car in cart */}
        {!haveEdit && (
          <div>
            <Button
              color="green"
              size="xs"
              className="mt-4"
              onClick={onClickAddToCart}
            >
              <ShoppingCartIcon className="w-4 h-4 mr-1"></ShoppingCartIcon>
              Add Cart
            </Button>
          </div>
        )}

        {/* manage your car */}
        {haveEdit && (
          <div className="flex flex-wrap gap-2">
            <Button
              color="yellow"
              size="xs"
              className="mt-4"
              onClick={onClickEditCar}
            >
              <PencilIcon className="w-4 h-4 mr-1"></PencilIcon>
              Edit
            </Button>
            <Button
              color="red"
              size="xs"
              className="mt-4"
              onClick={onClickDeleteCar}
            >
              <TrashIcon className="w-4 h-4 mr-1"></TrashIcon>
              Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
