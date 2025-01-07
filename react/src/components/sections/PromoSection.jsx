import { Button } from "flowbite-react";

const images = [
  `${import.meta.env.VITE_API_BASE_URL}/images/car/car_image_section/car1.png`,
  `${import.meta.env.VITE_API_BASE_URL}/images/car/car_image_section/car2.png`,
  `${import.meta.env.VITE_API_BASE_URL}/images/car/car_image_section/car3.png`,
  `${import.meta.env.VITE_API_BASE_URL}/images/car/car_image_section/car5.png`,
  `${import.meta.env.VITE_API_BASE_URL}/images/car/car_image_section/car7.png`,
];

export default function PromoSection() {
  return (
    <>
      <div className="relative overflow-hidden bg-white">
        <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
          <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
            <div className="sm:max-w-lg">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Strong styles are finally here
              </h1>
              <p className="mt-4 text-xl text-gray-500">
                This year, we have launched many innovative products with
                stylish and multi-feature...
              </p>
            </div>
            <div>
              <div className="mt-10">
                {/* Decorative image grid */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                >
                  <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                    <div className="flex items-center space-x-6 lg:space-x-8">
                      <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                          <img
                            alt=""
                            src={images[2]}
                            className="size-full object-cover"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            alt=""
                            src={images[1]}
                            className="size-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-96 overflow-hidden rounded-lg">
                          <img
                            alt=""
                            src={images[0]}
                            className="size-full object-cover"
                          />
                        </div>
                        <div className="h-64 w-96 overflow-hidden rounded-lg">
                          <img
                            alt=""
                            src={images[3]}
                            className="sm:size-full size-0 object-cover"
                          />
                        </div>
                        <div className="h-64 w-96 overflow-hidden rounded-lg">
                          <img
                            alt=""
                            src={images[4]}
                            className="size-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Button outline color="gray">
                  Car Collection
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-4 bg-white"></div>
    </>
  );
}
