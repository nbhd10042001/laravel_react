import React from "react";

export default function CarInform({ car }) {
  return (
    <>
      <div className="mt-10 grid grid-cols-2">
        <div>
          <h2 className="text-sm font-medium text-gray-900">Maker</h2>
          <div className="mb-4 space-y-6">
            <p className="text-sm text-gray-600">{car.maker}</p>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-medium text-gray-900">Model</h2>
          <div className="mb-4 space-y-6">
            <p className="text-sm text-gray-600">{car.model}</p>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-medium text-gray-900">City</h2>
          <div className="mb-4 space-y-6">
            <p className="text-sm text-gray-600">{car.city}</p>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-medium text-gray-900">State</h2>
          <div className="mb-4 space-y-6">
            <p className="text-sm text-gray-600">{car.state}</p>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-medium text-gray-900">Car Type</h2>
          <div className="mb-4 space-y-6">
            <p className="text-sm text-gray-600">{car.car_type}</p>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-medium text-gray-900">Fuel Type</h2>
          <div className="mb-4 space-y-6">
            <p className="text-sm text-gray-600">{car.fuel_type}</p>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-medium text-gray-900">Vin</h2>
          <div className="mb-4 space-y-6">
            <p className="text-sm text-gray-600">{car.vin}</p>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-medium text-gray-900">Mileage</h2>
          <div className="mb-4 space-y-6">
            <p className="text-sm text-gray-600">{car.mileage}</p>
          </div>
        </div>
      </div>

      {/* contact information */}
      <div>
        <h2 className="text-sm font-medium text-gray-900">Address</h2>
        <div className="mb-4 space-y-6">
          <p className="text-sm text-gray-600">{car.address}</p>
        </div>
      </div>
      <div>
        <h2 className="text-sm font-medium text-gray-900">Phone</h2>
        <div className="mb-4 space-y-6">
          <p className="text-sm text-gray-600">{car.phone}</p>
        </div>
      </div>
    </>
  );
}
