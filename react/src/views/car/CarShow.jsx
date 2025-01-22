import { useEffect, useState } from "react";
import axiosClient from "../../axios";
import { Carousel } from "flowbite-react";
import { StarIcon } from "@heroicons/react/24/solid";
import { Radio, RadioGroup } from "@headlessui/react";
import CarInform from "../../components/car/CarInform";
import CarFeature from "../../components/car/CarFeature";
import { useParams } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";

export default function CarShow() {
  const { navigateR } = useStateContext();
  const [car, setCar] = useState({});
  const { id } = useParams();

  const colors = [
    { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
  ];
  const reviews = { href: "#", average: 4, totalCount: 117 };
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  useEffect(() => {
    if (id) {
      axiosClient
        .get(`/car-show/${id}`)
        .then(({ data }) => {
          setCar(data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      navigateR("/cars");
    }
  }, []);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      {car.img_urls && (
        <div>
          <div className="bg-white">
            <div className="pt-6">
              <nav aria-label="Breadcrumb">
                <ol
                  role="list"
                  className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
                >
                  <li className="text-sm">
                    <a
                      href={car.href}
                      aria-current="page"
                      className="font-medium text-gray-500 hover:text-gray-600"
                    >
                      {car.year}
                      {" - "}
                      {car.maker} {car.model}
                    </a>
                  </li>
                </ol>
              </nav>

              {/* Image gallery */}
              <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                <div className="aspect-[3/2] size-full col-span-2 rounded-lg">
                  <Carousel>
                    {car.img_urls &&
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
                <div className="hidden lg:grid lg:grid-rows-2 lg:gap-y-8">
                  <img
                    alt={""}
                    src={car.img_urls[0] ? car.img_urls[0].image_path : null}
                    className="aspect-[3/2] size-full rounded-lg object-cover"
                  />
                  <img
                    alt={""}
                    src={car.img_urls[1] ? car.img_urls[1].image_path : null}
                    className="aspect-[3/2] size-full rounded-lg object-cover"
                  />
                </div>
              </div>

              {/* car info */}
              <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    {car.year}
                    {" - "}
                    {car.maker} {car.model}
                  </h1>

                  <div className="mt-2">
                    <i className="text-gray-900">
                      Published Date: {car.published_at}
                    </i>
                  </div>
                </div>

                {/* Options */}
                <div className="mt-4 lg:row-span-3 lg:mt-0">
                  <h2 className="sr-only">car information</h2>
                  <p className="text-3xl tracking-tight text-gray-900">
                    {car.price}
                  </p>

                  {/* Reviews */}
                  <div className="mt-6">
                    <h3 className="sr-only">Reviews</h3>
                    <div className="flex items-center">
                      <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            aria-hidden="true"
                            className={classNames(
                              reviews.average > rating
                                ? "text-gray-900"
                                : "text-gray-200",
                              "size-5 shrink-0"
                            )}
                          />
                        ))}
                      </div>
                      <p className="sr-only">
                        {reviews.average} out of 5 stars
                      </p>
                      <a
                        href={reviews.href}
                        className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        {reviews.totalCount} reviews
                      </a>
                    </div>
                  </div>
                  <form className="mt-10">
                    {/* Colors */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        Color
                      </h3>

                      <fieldset aria-label="Choose a color" className="mt-4">
                        <RadioGroup
                          value={selectedColor}
                          onChange={setSelectedColor}
                          className="flex items-center gap-x-3"
                        >
                          {colors.map((color) => (
                            <Radio
                              key={color.name}
                              value={color}
                              aria-label={color.name}
                              className={classNames(
                                color.selectedClass,
                                "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none data-[checked]:ring-2 data-[focus]:data-[checked]:ring data-[focus]:data-[checked]:ring-offset-1"
                              )}
                            >
                              <span
                                aria-hidden="true"
                                className={classNames(
                                  color.class,
                                  "size-8 rounded-full border border-black/10"
                                )}
                              />
                            </Radio>
                          ))}
                        </RadioGroup>
                      </fieldset>
                    </div>
                    <button
                      type="submit"
                      className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Add to bag
                    </button>
                  </form>
                </div>

                <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                  {/* Description and details */}
                  <div>
                    <h3 className="sr-only">Description</h3>

                    <div className="space-y-6">
                      <p className="text-base text-gray-900">
                        {car.description}
                      </p>
                    </div>
                  </div>
                  <CarInform car={car}></CarInform>
                </div>
              </div>
            </div>
          </div>
          <CarFeature features={car.features}></CarFeature>
        </div>
      )}
    </>
  );
}
