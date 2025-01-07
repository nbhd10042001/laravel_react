import React from "react";
import { Link } from "react-router-dom";

export default function CarItem({ car }) {
  return (
    <div className="group relative border rounded-md bg-gray-50 shadow-md">
      <img
        src={car.img_url}
        className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-40"
      />

      <div className="my-4 mx-2 flex-col justify-between">
        <h3 className="text-md text-gray-900 font-medium">
          <Link to={`/car/show/${car.id}`}>
            <span aria-hidden="true" className="absolute inset-0" />
            {car.year}
            {" - "}
            {car.maker} {car.model}
          </Link>
        </h3>
        <p className="text-sm font-medium my-2 text-gray-900">
          {car.price} $
        </p>
        <hr />
        <div className="flex my-2">
          <p className="mr-1 px-2 text-sm text-gray-500 rounded-lg bg-gray-200">
            {car.car_type}
          </p>
          <p className="mr-1 px-2 text-sm text-gray-500 rounded-lg bg-gray-200">
            {car.fuel_type}
          </p>
        </div>
      </div>
    </div>
  );
}
