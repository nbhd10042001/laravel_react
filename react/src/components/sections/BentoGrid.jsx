import { useEffect, useState } from "react";
import axiosClient from "../../axios";
import { Button, Carousel } from "flowbite-react";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";
import CarouselMobile from "./CarouselMobile";
import CarouselDesktop from "./CarouselDesktop";
import { Link } from "react-router-dom";

export default function BentoGrid() {
  const [car, setCar] = useState();
  const [cars, setCars] = useState();
  useEffect(() => {
    axiosClient
      .get("/get-new-cars")
      .then(({ data }) => {
        setCar(data.data[0]);
        setCars(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const changeNewCar = (car) => {
    setCar(car);
  };

  return (
    <div className=" bg-gray-100 py-20 sm:py-28">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-center text-base/7 font-semibold text-indigo-600">
          Choose the car models according to your preferences
        </h2>
        <p className="mx-auto mt-2 text-balance text-center text-3xl font-medium tracking-tight text-gray-800 sm:text-5xl">
          All new cars here
        </p>

        {/* choose and show new car */}
        <div>
          <div className="pt-4 flex sm:hidden">
            <CarouselMobile
              slides={cars}
              onCarChange={changeNewCar}
            ></CarouselMobile>
          </div>
          <div className="pt-4 hidden sm:flex">
            <CarouselDesktop
              slides={cars}
              onCarChange={changeNewCar}
            ></CarouselDesktop>
          </div>
        </div>

        {/* carousel grid bento */}
        {car && (
          <div className="size-full pt-4 lg:grid gap-4 lg:grid-cols-3 lg:grid-rows-1">
            {/* carousel image */}
            <div className="relative lg:col-span-2 bg-white rounded-lg">
              <div className="relative overflow-hidden px-2 py-2">
                <div className="h-56 sm:h-80 xl:h-96 2xl:h-[26rem] items-center">
                  <Carousel
                    pauseOnHover
                    slideInterval={4000}
                    leftControl={
                      <ArrowLeftCircleIcon className="size-8 text-gray-500" />
                    }
                    rightControl={
                      <ArrowRightCircleIcon className="size-8 text-gray-500" />
                    }
                  >
                    {car &&
                      car.img_urls &&
                      car.img_urls.map((image, index) => {
                        return (
                          <img
                            key={"image " + index}
                            src={image.image_path}
                            className=" object-cover"
                          />
                        );
                      })}
                  </Carousel>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5"></div>
            </div>
            {/* Information */}
            <div className="relative lg:col-start-3 rounded-lg bg-white rounded-lg">
              <div className="relative overflow-hidden">
                <div className="px-8 py-2 sm:px-10 sm:pt-4">
                  {/* logo */}
                  <div>
                    <div className="size-auto my-2">
                      <img src={car && car.img_maker}></img>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-left pb-2">
                      <div>
                        <span className="font-medium">Model: </span>
                        {car && car.model}
                      </div>
                      <div>
                        <span className="font-medium">Type: </span>
                        {car && car.car_type}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-left pb-2">
                      <div>
                        <span className="font-medium">Fuel: </span>
                        {car && car.fuel_type}
                      </div>
                      <div>
                        <span className="font-medium">City: </span>
                        {car && car.city}
                      </div>
                    </div>
                  </div>
                  {/* Detail */}
                  <div>
                    <div className="flex text-md font-medium tracking-tight text-gray-950 max-lg:text-center">
                      Price:{" "}
                      <p className="text-indigo-600 ml-4">
                        {car && car.price}$
                      </p>
                    </div>
                    <div className="flex mt-2 text-md font-medium tracking-tight text-gray-950 max-lg:text-center">
                      Phone:{" "}
                      <p className="font-small text-dark-200 ml-4">
                        {car && car.phone}
                      </p>
                    </div>

                    <div className="flex mt-2 text-md font-medium tracking-tight text-gray-950 max-lg:text-center">
                      <Link className="text-sm text-indigo-600 underline hover:text-indigo-400" to={`/car/${car.id}/show`}><i>View detail</i></Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5"></div>
            </div>
          </div>
        )}
        {/* <CarouselNewCar cars={cars}></CarouselNewCar> */}
      </div>
    </div>
  );
}
