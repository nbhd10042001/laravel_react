import { useEffect, useState } from "react";
import axiosClient from "../axios";
import { Carousel } from "flowbite-react";
import {
  CheckCircleIcon,
  MinusCircleIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import { Radio, RadioGroup } from "@headlessui/react";
import CarInform from "../components/product/CarInform";

export default function CarShow() {
  const [product, setProduct] = useState({});

  const colors = [
    { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
  ];

  const getCars = (url) => {
    url = url || "/car";
    axiosClient.get(url).then(({ data }) => {
      setProduct(data.data[0]);
    });
  };

  useEffect(() => {
    getCars();
  }, []);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const reviews = { href: "#", average: 4, totalCount: 117 };
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  return (
    <>
      {product.img_urls && (
        <div className="bg-white">
          <div className="pt-6">
            <nav aria-label="Breadcrumb">
              <ol
                role="list"
                className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
              >
                <li className="text-sm">
                  <a
                    href={product.href}
                    aria-current="page"
                    className="font-medium text-gray-500 hover:text-gray-600"
                  >
                    {product.year}
                    {" - "}
                    {product.maker} {product.model}
                  </a>
                </li>
              </ol>
            </nav>

            {/* Image gallery */}
            <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
              <div className="aspect-[3/2] size-full col-span-2 rounded-lg">
                <Carousel>
                  {product.img_urls &&
                    product.img_urls.map((image, index) => {
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
                  src={product.img_urls[0].image_path}
                  className="aspect-[3/2] size-full rounded-lg object-cover"
                />
                <img
                  alt={""}
                  src={product.img_urls[1].image_path}
                  className="aspect-[3/2] size-full rounded-lg object-cover"
                />
              </div>
            </div>

            {/* Product info */}
            <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
              <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {product.year}
                  {" - "}
                  {product.maker} {product.model}
                </h1>

                <div className="mt-2">
                  <i className="text-gray-900">
                    Published Date: {product.published_at}
                  </i>
                </div>
              </div>

              {/* Options */}
              <div className="mt-4 lg:row-span-3 lg:mt-0">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight text-gray-900">
                  {product.price}
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
                    <p className="sr-only">{reviews.average} out of 5 stars</p>
                    <a
                      href={reviews.href}
                      className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      {reviews.totalCount} reviews
                    </a>
                  </div>
                </div>

                {/* Features */}
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-900">
                    Features
                  </h3>

                  <div className="mt-4">
                    <ul
                      role="list"
                      className="list-disc space-y-2 pl-4 text-sm"
                    >
                      {Object.entries(product.features).map(([key, value]) => {
                        if (key === "car_id") {
                          return;
                        }
                        return (
                          <li key={key} className="text-gray-400 flex">
                            <span>
                              {value ? (
                                <CheckCircleIcon className="size-5 text-green-400"></CheckCircleIcon>
                              ) : (
                                <MinusCircleIcon className="size-5 text-red-500"></MinusCircleIcon>
                              )}
                            </span>
                            <span className="text-gray-600">
                              {"  -  "}
                              {key}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>

                <form className="mt-10">
                  {/* Colors */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Color</h3>

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
                      {product.description}
                    </p>
                  </div>
                </div>
                <CarInform product={product}></CarInform>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );

  // return (
  //   <div className="bg-white">
  //     <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
  //       <div>
  //         <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
  //           {product.year}
  //           {" - "}
  //           {product.maker} {product.model}
  //         </h2>
  //         <p className="mt-4 text-gray-500">{product.description}</p>

  //         <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
  //           {product.features &&
  //             Object.entries(product.features).map(([key, value]) => {
  //               if (key === "car_id") {
  //                 return;
  //               }
  //               return (
  //                 <div key={key} className="border-t border-gray-200 pt-4">
  //                   <dt className="font-medium text-gray-900">{key}</dt>
  //                   <dd className="mt-2 text-sm text-gray-500">
  //                     {value ? "Yes" : "No"}
  //                   </dd>
  //                 </div>
  //               );
  //             })}
  //         </dl>
  //       </div>
  //       <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:gap-8">

  //       <Carousel slide={false}>
  //           {product.img_urls &&
  //             product.img_urls.map((image, index) => {
  //               return (
  //                 <img
  //                   key={"image " + index}
  //                   src={image.image_path}
  //                   className="h-full w-full object-cover"
  //                 />
  //               );
  //             })}
  //       </Carousel>
  //       </div>

  //     </div>
  //   </div>
  // );
}
