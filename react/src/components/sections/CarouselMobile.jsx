import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";
import React, { useState } from "react";

export default function CarouselMobile({ slides = [], onCarChange }) {
  const w = 150;
  const number = 3;
  const w_slide = w + "px";
  const w_slides = w * number + "px";
  const maxW_Slides = w * (slides.length - number);
  const [current, setCurrent] = useState(0);

  const previousSlide = () => {
    if (current === 0) {
      setCurrent(maxW_Slides);
    } else {
      setCurrent(current - w);
    }
  };
  const nextSlide = () => {
    if (current === maxW_Slides) {
      setCurrent(0);
    } else {
      setCurrent(current + w);
    }
  };

  return (
    <div className="w-full m-auto py-4">
      {/* Buttons */}
      <div className="justify-end items-center pb-2 gap-x-4 flex">
        <button onClick={previousSlide}>
          <ArrowLeftCircleIcon className="size-8 text-indigo-600 hover:text-indigo-400"></ArrowLeftCircleIcon>
        </button>
        <button onClick={nextSlide}>
          <ArrowRightCircleIcon className="size-8 text-indigo-600 hover:text-indigo-400"></ArrowRightCircleIcon>
        </button>
      </div>

      {/* Slides */}
      <div
        className={`relative w-[450px] overflow-hidden flex justify-items-center`}
      >
        <div
          className={`flex transition ease-out duration-40`}
          style={{ transform: `translateX(-${current}px)` }}
        >
          {slides &&
            slides.map((car, index) => {
              return (
                <div
                  key={`slide_mobile_${index}`}
                  className={`w-[140px] pl-1`}
                >
                  {/* group car item */}
                  <div className="group relative border rounded-md bg-gray-50 shadow-md">
                    <img
                      src={car.img_url}
                      className="aspect-square w-full h-24 rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-40"
                    />
                    <div className="my-4 mx-2 flex-col justify-between">
                      <h3 className="text-md text-gray-900 font-medium">
                        <div
                          className="hover:cursor-pointer"
                          onClick={() => {
                            onCarChange(car);
                          }}
                        >
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {car.year}
                          {" - "}
                          {car.maker} {car.model}
                        </div>
                      </h3>
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
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
