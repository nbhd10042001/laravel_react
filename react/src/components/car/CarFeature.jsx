import { CheckCircleIcon, MinusCircleIcon } from "@heroicons/react/24/solid";
const images = [
  `${import.meta.env.VITE_API_BASE_URL}/images/car/car_image_feature/cf1.jpg`,
  `${import.meta.env.VITE_API_BASE_URL}/images/car/car_image_feature/cf2.jpg`,
  `${import.meta.env.VITE_API_BASE_URL}/images/car/car_image_feature/cf3.png`,
  `${import.meta.env.VITE_API_BASE_URL}/images/car/car_image_feature/cf4.jpg`,
];
export default function CarFeature({ features }) {
  return (
    <div className="bg-white">
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 pb-24 sm:px-6 sm:pb-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Feature Specifications
          </h2>
          <p className="mt-4 text-gray-500">
            Describe the great features that this car possesses, new features
            always support users in every experience when using. Enhance all
            protection to keep your car safe.
          </p>

          <dl className="mt-16 grid gap-x-6 gap-y-2 grid-cols-2 sm:gap-y-4 lg:gap-x-8">
            {Object.entries(features).map(([key, value]) => {
              if (key === "car_id" || key === 'id') return;
              return (
                <div
                  key={`${key}_${value}`}
                  className="border-t border-gray-200 pt-4"
                >
                  <dt className="font-medium text-gray-900">{key.replaceAll("_", " ")}</dt>
                  <dd className="mt-2 text-sm text-gray-500">
                    {value ? (
                      <CheckCircleIcon className="size-5 text-green-400"></CheckCircleIcon>
                    ) : (
                      <MinusCircleIcon className="size-5 text-red-500"></MinusCircleIcon>
                    )}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
          {images.map((image, index) => {
            return (
              <img
                key={`image_${index}`}
                alt={`image_feature_${index}`}
                src={image}
                className="rounded-lg bg-gray-100"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
