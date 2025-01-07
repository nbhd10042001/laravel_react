import { useEffect, useState } from "react";
import axiosClient from "../../axios";
import { CheckCircleIcon, MinusCircleIcon } from "@heroicons/react/24/outline";
import { Button, Carousel } from "flowbite-react";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "@heroicons/react/24/solid";

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
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-center text-base/7 font-semibold text-indigo-600">
          All the popular cars are here
        </h2>
        <p className="mx-auto mt-2 text-balance text-center text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl">
          New cars updated
        </p>
        {/* choose and show new car */}
        <div className="flex justify-center mt-4">
          {cars &&
            cars.map((car, index) => {
              return (
                <div key={`new-car-${index}`} className="mx-2 shadow-sm">
                  <Button
                    color="light"
                    outline
                    className="items-center"
                    onClick={() => changeNewCar(car)}
                  >
                    <p className="text-center text-xs lg:text-sm">{car && car.maker + " - " + car.model}</p>
                  </Button>
                </div>
              );
            })}
        </div>
        {/* carousel grid bento */}
        {car && (
          <div className="size-full mt-4 sm:mt-10 lg:grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
            {/* carousel image */}
            <div className="relative lg:col-span-2">
              <div className="relative overflow-hidden px-2 py-2">
                <div className="h-56 sm:h-80 xl:h-96 2xl:h-[26rem]">
                  <Carousel pauseOnHover slideInterval={4000}
                    leftControl={<ArrowLeftCircleIcon className="size-8 text-gray-500"/>}
                    rightControl={<ArrowRightCircleIcon className="size-8 text-gray-500"/>}
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

            {/* Detail */}
            <div className="relative mt-1">
              <div className="relative flex h-full flex-col overflow-hidden">
                <div className="px-8 py-4 sm:px-10 sm:pt-10">
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">
                    Detail Car
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                    Sit quis amet rutrum tellus ullamcorper ultricies libero
                    dolor eget sem sodales gravida.
                  </p>

                  <div className="flex mt-2 text-md font-medium tracking-tight text-gray-950 max-lg:text-center">
                    Price:{" "}
                    <p className="text-indigo-600 ml-4">{car && car.price}$</p>
                  </div>
                  <div className="flex mt-2 text-md font-medium tracking-tight text-gray-950 max-lg:text-center">
                    Phone:{" "}
                    <p className="font-small text-dark-200 ml-4">
                      {car && car.phone}
                    </p>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5"></div>
            </div>

            {/* Feature */}
            <div className="relative lg:row-span-2 lg:col-start-3 lg:row-start-1">
              <div className="hidden lg:block relative overflow-hidden">
                <div className="px-8 py-4 sm:px-10 sm:pt-10">
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 lg:text-center">
                    Special features
                  </p>
                  {car &&
                    Object.entries(car.features).map(([key, value]) => {
                      if (key === "car_id") {
                        return;
                      }
                      return (
                        <li
                          key={key}
                          className="flex items-center mt-4 w-full text-md/6 text-gray-600 lg:text-center"
                        >
                          <span>
                            {value ? (
                              <CheckCircleIcon className="size-5 text-green-400"></CheckCircleIcon>
                            ) : (
                              <MinusCircleIcon className="size-5 text-red-500"></MinusCircleIcon>
                            )}
                          </span>
                          <span className="text-gray-600 ml-2">{key.replaceAll("_", " ")}</span>
                        </li>
                      );
                    })}
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5"></div>
            </div>

            {/* Information */}
            <div className="relative mt-1">
              <div className="relative flex h-full flex-col overflow-hidden">
                <div className="px-8 py-4 sm:px-10">
                  <div className="mb-4 mx-2 text-center size-auto">
                    <img src={car && car.img_maker}></img>
                  </div>
                  <div className="grid gird-cols-2 grid-rows-2 text-center">
                    <div className="col-start-1">
                      <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">
                        Model
                      </p>
                      <p className="text-sm/6 text-gray-600">
                        {car && car.model}
                      </p>
                    </div>
                    <div className="col-start-2">
                      <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">
                        Type
                      </p>
                      <p className="text-sm/6 text-gray-600">
                        {car && car.car_type}
                      </p>
                    </div>
                    <div className="row-start-2 col-start-1">
                      <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">
                        Fuel
                      </p>
                      <p className="text-sm/6 text-gray-600">
                        {car && car.fuel_type}
                      </p>
                    </div>
                    <div className="row-start-2 col-start-2">
                      <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">
                        City
                      </p>
                      <p className="text-sm/6 text-gray-600">
                        {car && car.state + " - " + car.city}
                      </p>
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
