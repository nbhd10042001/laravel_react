import React from "react";

export default function CarInform({ product }) {
  return (
    <>
      <div className="mt-10 lg:grid lg:grid-cols-2">
        <div>
          <h2 className="text-sm font-medium text-gray-900">Maker</h2>
          <div className="mb-4 space-y-6">
            <p className="text-sm text-gray-600">{product.maker}</p>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-medium text-gray-900">Model</h2>
          <div className="mb-4 space-y-6">
            <p className="text-sm text-gray-600">{product.model}</p>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-medium text-gray-900">City</h2>
          <div className="mb-4 space-y-6">
            <p className="text-sm text-gray-600">{product.city}</p>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-medium text-gray-900">State</h2>
          <div className="mb-4 space-y-6">
            <p className="text-sm text-gray-600">{product.state}</p>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-medium text-gray-900">Car Type</h2>
          <div className="mb-4 space-y-6">
            <p className="text-sm text-gray-600">{product.car_type}</p>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-medium text-gray-900">Fuel Type</h2>
          <div className="mb-4 space-y-6">
            <p className="text-sm text-gray-600">{product.fuel_type}</p>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-medium text-gray-900">Vin</h2>
          <div className="mb-4 space-y-6">
            <p className="text-sm text-gray-600">{product.vin}</p>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-medium text-gray-900">Mileage</h2>
          <div className="mb-4 space-y-6">
            <p className="text-sm text-gray-600">{product.mileage}</p>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-medium text-gray-900">Address</h2>
          <div className="mb-4 space-y-6">
            <p className="text-sm text-gray-600">{product.address}</p>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-medium text-gray-900">Phone</h2>
          <div className="mb-4 space-y-6">
            <p className="text-sm text-gray-600">{product.phone}</p>
          </div>
        </div>
      </div>
    </>
  );
}
