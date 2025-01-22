import React, { useEffect, useState } from "react";
import PageComponent from "../../components/PageComponent";
import { useParams } from "react-router-dom";
import { MinusCircleIcon, PhotoIcon } from "@heroicons/react/24/solid";
import { Button, Checkbox } from "flowbite-react";
import axiosClient from "../../axios";
import { useStateContext } from "../../contexts/ContextProvider";

const maker_model = {
  Toyota: ["Camry", "Corolla", "RAV4", "Prius"],
  Ford: ["F-150", "Escape", "Mustang", "Fusion"],
  Honda: ["Civic", "Accord", "CR-V", "Pilot"],
  Nissan: ["Altima", "Sentra", "Rouge", "Maxima"],
  Lexus: ["RX400", "RX450", "RX350", "LS500"],
};
const state_city = {
  Califonia: ["Los Angeles", "San Francisco", "San Diego"],
  Texas: ["Houston", "San Antonio", "Dallas", "Austin"],
  Florida: ["Miami", "Orlando", "Tampa", "JacksonVille"],
  "New York": ["New York City", "Buffalo", "Rochester"],
  Ohio: ["Columbus", "Cleveland", "Cincinnati", "Toledo"],
};
const carTypes = ["Sedan", "SUV", "Truck", "Van", "Coupe", "Crossover"];
const fuelTypes = ["Gas", "Diesel", "Electric", "Hybird"];
const carFeatures = [
  "abs",
  "air_conditioning",
  "power_windows",
  "power_door_locks",
  "cruise_control",
  "bluetooth_connectivity",
  "remote_start",
  "gps_navigation",
  "heater_seats",
  "climate_control",
  "rear_parking_sensors",
  "leather_seats",
];
const years = [
  "1990",
  "1991",
  "1992",
  "1993",
  "1994",
  "1995",
  "1996",
  "1997",
  "1998",
  "1999",
  "2000",
  "2001",
  "2002",
  "2003",
  "2004",
  "2005",
  "2006",
  "2007",
  "2008",
  "2009",
  "2010",
  "2011",
  "2012",
  "2013",
  "2015",
  "2017",
  "2019",
  "2021",
  "2023",
  "2024",
];
const templateCar = {
  car_type: "",
  fuel_type: "",
  vin: "",
  mileage: "",
  price: "",
  address: "",
  phone: "",
  maker: "",
  model: "",
  state: "",
  city: "",
  year: "",
  features: [],
  publish: false,
  description: "",
  images: [],
  image_urls: [],
  image_locals: [],
};

export default function CarEdit() {
  const [models, setModels] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [car, setCar] = useState({ ...templateCar });
  const [selectedFs, setSelectedFs] = useState([]);
  const { showToast, navigateR, userRole, checkUserRole, userToken } =
    useStateContext();

  // Upload multi image
  const onImagesChoose = (ev) => {
    const files = Array.from(ev.target.files);
    const newImageUrls = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        newImageUrls.push(reader.result);
        if (newImageUrls.length === files.length) {
          // update images car
          setCar({
            ...car,
            images: [...car.images, ...files],
            image_urls: [...car.image_urls, ...newImageUrls],
          });
        }
      };
      reader.readAsDataURL(file);
    });
    ev.target.value = "";
  };

  // handle if choose max photos
  const handleMaxImages = (ev) => {
    removeError("images");
    const numberChoose = Array.from(ev.target.files).length;
    const numberImages = car.images.length;
    const numberImagelocals = car.image_locals.length;
    const total = numberChoose + numberImages + numberImagelocals;
    if (total > 5 || numberChoose > 5) {
      showError("images", "Max photos are 5");
      return;
    }
    onImagesChoose(ev);
  };

  const onDeleteImage = (index) => {
    // index each image display on form
    // clone images/image_urls/image_locals
    const newImages = [...car.images];
    const newImageUrls = [...car.image_urls];
    const newImageLocals = [...car.image_locals];

    // if remove image_source
    var imageRemove = newImageUrls[index];
    newImageLocals.map((is, index) => {
      if (imageRemove.includes(is)) {
        newImageLocals.splice(index, 1);
      }
    });

    // remove
    newImages.splice(index, 1);
    newImageUrls.splice(index, 1);
    setCar({
      ...car,
      images: newImages,
      image_urls: newImageUrls,
      image_locals: newImageLocals,
    });
  };

  function onCheckboxChange(cf, event) {
    if (event.target.checked) {
      if (selectedFs.includes(cf)) {
        return;
      }
      selectedFs.push(cf);
    } else {
      // remove option in selectedOptions if uncheck it
      var newSelect = [...selectedFs];
      newSelect = newSelect.filter((f) => f != cf);
      setSelectedFs(newSelect);
    }
  }

  const showError = (id, message) => {
    document.getElementById(`error-${id}`).innerHTML = message;
  };

  const removeError = (id) => {
    document.getElementById(`error-${id}`).innerHTML = "";
  };

  const onSubmit = (ev) => {
    car["features"] = selectedFs;
    // setCar({...car, features: selectedFs});
    ev.preventDefault();
    const payload = { ...car };
    if (payload.images) {
      payload.images = payload.image_urls;
    }
    delete payload.image_urls;

    axiosClient
      .put(`/car/${id}`, payload)
      .then((res) => {
        showToast("The car was updated!", "success");
        navigateR("/cars");
      })
      .catch((error) => {
        showToast(error.response.data.message, "danger");
      });
  };

  useEffect(() => {
    if (!userToken) {
      navigateR("/login");
    } else {
      checkUserRole();
    }
    setLoading(true);
    axiosClient
      .get(`/car/${id}`)
      .then(({ data }) => {
        // filter features
        const features = [];
        Object.entries(data.data.features).map((cf) => {
          if (cf[0] === "id" || cf[0] === "car_id") {
            return;
          }
          if (cf[1] === 1) {
            features.push(cf[0]);
          }
        });
        // checked each input features
        if (features) {
          features.map((f) => {
            var element = document.getElementById(`id_${f}`);
            if (element) {
              element.checked = true;
            }
          });
        }
        // add url image if image_path not null
        const images = [];
        data.data.img_urls.map((image) => {
          if (image.image_path !== null) {
            images.push(`${image.image_path}`);
          }
        });
        // update car/models/maker/cities/features
        setSelectedFs(features);
        setCar({
          ...data.data,
          features: features,
          images: [],
          image_urls: images ?? [],
          image_locals: data.data.img_locals ?? [],
        });
        setModels(maker_model[data.data.maker]);
        setCities(state_city[data.data.state]);
        setLoading(false);
      })
      .catch((error) => {
        navigateR(window.location.pathname, true, {
          code: error.response.status,
          mess: error.response.statusText,
        });
      });
  }, []);

  return (
    <PageComponent title={"Edit Car"}>
      {loading && <div className="text-center text-lg">Loading...</div>}
      {!loading && (
        <form action="#" method="POST" onSubmit={onSubmit}>
          <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="space-y-6 bg-white px-4 py-5 sm:p-6 sm:grid sm:grid-cols-3">
              {/* Left panel */}
              <div className="col-span-2 px-4">
                {/* Maker/Model/Year */}
                <div className="sm:grid sm:grid-cols-3 gap-4 pb-4">
                  {/* Maker Select */}
                  <div className="pb-2">
                    <label
                      htmlFor="maker"
                      className="block text-sm font-medium text-gray-700 pb-2"
                    >
                      Maker
                    </label>
                    <select
                      name="maker"
                      id="maker"
                      value={car.maker}
                      onChange={(ev) => {
                        const value = ev.target.value;
                        setCar({ ...car, maker: value, model: "" });
                        setModels(maker_model[value]);
                      }}
                      className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg
                        focus:ring-blue-500 focus:border-blue-500 block"
                    >
                      <option value="">Choose maker</option>
                      {Object.entries(maker_model).map(([maker, models]) => {
                        return (
                          <option key={`maker_${maker}`} value={maker}>
                            {maker}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  {/* Models Select */}
                  <div className="pb-2">
                    <label
                      htmlFor="model"
                      className="block text-sm font-medium text-gray-700 pb-2"
                    >
                      Model
                    </label>
                    <select
                      name="model"
                      id="model"
                      value={car.model}
                      onChange={(ev) => {
                        setCar({ ...car, model: ev.target.value });
                      }}
                      className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg
                        focus:ring-blue-500 focus:border-blue-500 block"
                    >
                      <option value="">Choose model</option>
                      {models &&
                        models.map((model) => {
                          return (
                            <option key={`model_${model}`} value={model}>
                              {model}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  {/*Year*/}
                  <div className="pb-2">
                    <label
                      htmlFor="year"
                      className="block text-sm font-medium text-gray-700 pb-2"
                    >
                      Year
                    </label>
                    <select
                      type="date"
                      name="year"
                      id="year"
                      value={car.year}
                      onChange={(ev) => {
                        setCar({ ...car, year: ev.target.value });
                      }}
                      className={`w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg
                        focus:ring-blue-500 focus:border-blue-500 block`}
                    >
                      <option value="">Choose year</option>
                      {years &&
                        years.map((year) => {
                          return (
                            <option key={`year_${year}`} value={year}>
                              {year}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>
                {/* CarType */}
                <div className="pb-4">
                  <span className="block text-sm font-medium text-gray-700 pb-2">
                    Car Type
                  </span>
                  <div className="flex flex-wrap w-full pb-2">
                    {carTypes.map((cartype, index) => (
                      <div
                        key={`car_type_${index}`}
                        className="flex mr-8 items-center w-20"
                      >
                        <input
                          id={cartype}
                          name="car_type"
                          value={cartype}
                          checked={car.car_type === cartype && true}
                          onChange={(ev) =>
                            setCar({ ...car, car_type: ev.target.value })
                          }
                          type="radio"
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                        />
                        <label
                          htmlFor={cartype}
                          className="ml-2 block text-sm font-small text-gray-700"
                        >
                          {cartype}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Price/Mileage/Vin */}
                <div className="sm:grid sm:grid-cols-3 gap-4 pb-4">
                  {/* Price */}
                  <div className="pb-2">
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium text-gray-700 pb-2"
                    >
                      Price
                    </label>
                    <input
                      name="price"
                      type="number"
                      id="price"
                      value={car.price}
                      onChange={(ev) => {
                        setCar({ ...car, price: ev.target.value });
                      }}
                      placeholder="Price"
                      className="w-full block w-auto rounded-md border-gray-300 shadow-sm 
                      focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  {/* Mileage */}
                  <div className="pb-2">
                    <label
                      htmlFor="mileage"
                      className="block text-sm font-medium text-gray-700 pb-2"
                    >
                      Mileage {"("}ml{")"}
                    </label>
                    <input
                      name="mileage"
                      type="number"
                      id="mileage"
                      value={car.mileage}
                      onChange={(ev) => {
                        setCar({ ...car, mileage: ev.target.value });
                      }}
                      placeholder="Mileage"
                      className="w-full block w-auto rounded-md border-gray-300 shadow-sm 
                      focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  {/* VIN */}
                  <div className="pb-2">
                    <label
                      htmlFor="vin"
                      className="block text-sm font-medium text-gray-700 pb-2"
                    >
                      Vin
                    </label>
                    <input
                      name="vin"
                      type="text"
                      id="vin"
                      value={car.vin}
                      onChange={(ev) => {
                        setCar({ ...car, vin: ev.target.value });
                      }}
                      placeholder="Vin"
                      className="w-full block w-auto rounded-md border-gray-300 shadow-sm 
                      focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                {/* FuelType */}
                <div className="pb-4">
                  <span className="block text-sm font-medium text-gray-700 pb-2">
                    Fuel Type
                  </span>
                  <div className="flex flex-wrap w-full pb-2">
                    {fuelTypes.map((fuel, index) => (
                      <div
                        key={`fuel_${index}`}
                        className="flex mr-8 items-center w-20"
                      >
                        <input
                          id={fuel}
                          name="fuel_type"
                          value={fuel}
                          checked={car.fuel_type === fuel && true}
                          onChange={(ev) =>
                            setCar({ ...car, fuel_type: ev.target.value })
                          }
                          type="radio"
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                        />
                        <label
                          htmlFor={fuel}
                          className="ml-2 block text-sm font-small text-gray-700"
                        >
                          {fuel}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                {/* State/City */}
                <div className="sm:grid sm:grid-cols-3 gap-4 pb-4">
                  {/* State select */}
                  <div className="">
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium text-gray-700 pb-2"
                    >
                      State/Region
                    </label>
                    <select
                      name="state"
                      id="state"
                      value={car.state}
                      onChange={(ev) => {
                        const value = ev.target.value;
                        setCar({ ...car, state: value, city: "" });
                        setCities(state_city[value]);
                      }}
                      className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg
                        focus:ring-blue-500 focus:border-blue-500 block"
                    >
                      <option value="">Choose state/region</option>
                      {Object.entries(state_city).map(([state, cities]) => {
                        return (
                          <option key={`state_${state}`} value={state}>
                            {state}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  {/* Cities select */}
                  <div className="">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700 pb-2"
                    >
                      City
                    </label>
                    <select
                      name="city"
                      id="city"
                      value={car.city}
                      onChange={(ev) => {
                        setCar({ ...car, city: ev.target.value });
                      }}
                      className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg
                        focus:ring-blue-500 focus:border-blue-500 block"
                    >
                      <option value="">Choose city</option>
                      {cities &&
                        cities.map((city) => {
                          return (
                            <option key={`city_${city}`} value={city}>
                              {city}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>
                {/* Phone/Address */}
                <div className="sm:grid sm:grid-cols-3 gap-4 pb-4">
                  {/* Phone */}
                  <div className="pb-2">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 pb-2"
                    >
                      Phone
                    </label>
                    <input
                      name="phone"
                      type="number"
                      id="phone"
                      value={car.phone}
                      onChange={(ev) => {
                        setCar({ ...car, phone: ev.target.value });
                      }}
                      placeholder="Phone"
                      className="w-full block w-auto rounded-md border-gray-300 shadow-sm 
                      focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  {/* Address */}
                  <div className="pb-2 col-span-2">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700 pb-2"
                    >
                      Address
                    </label>
                    <input
                      name="address"
                      type="text"
                      id="address"
                      value={car.address}
                      onChange={(ev) => {
                        setCar({ ...car, address: ev.target.value });
                      }}
                      placeholder="Address"
                      className="w-full block w-auto rounded-md border-gray-300 shadow-sm 
                      focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                {/* Features */}
                <div className="pb-4">
                  <span className="block text-sm font-medium text-gray-700 pb-2">
                    Car Features
                  </span>
                  <div className="flex flex-wrap w-full pb-2">
                    {carFeatures.map((cf, index) => (
                      <div
                        key={`cf_${cf}_${index}`}
                        className="flex mr-8 items-center w-40 pb-2"
                      >
                        <input
                          id={`id_${cf}`}
                          type="checkbox"
                          onChange={(ev) => {
                            onCheckboxChange(cf, ev);
                          }}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 
                            focus:ring-indigo-500"
                        />
                        <label
                          htmlFor={`id_${cf}`}
                          className="ml-2 block text-sm font-small text-gray-700"
                        >
                          {cf}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                {/*Description*/}
                <div className="col-span-3">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    value={car.description || ""}
                    onChange={(ev) => {
                      setCar({ ...car, description: ev.target.value });
                    }}
                    placeholder="Describe your car"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                      focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    rows={5}
                  ></textarea>
                </div>
                {/*Publish*/}
                <div className="flex items-start pt-4">
                  <div className="flex h-5 items-center">
                    <input
                      id="publish"
                      name="publish"
                      type="checkbox"
                      checked={car.publish}
                      onChange={(ev) =>
                        setCar({ ...car, publish: ev.target.checked })
                      }
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 
                        focus:ring-indigo-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label className="font-medium text-gray-700">Publish</label>
                    <p className="text-gray-500">
                      Whether to make car publicly available
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Panel */}
              <div className="px-4 border-l border-l-gray-200 sm:relative">
                {/* Images */}
                <div className="pb-6">
                  <small id="error-images" className="text-red-500"></small>
                  <span className="block text-sm font-medium text-gray-700">
                    Photos
                  </span>
                  {/* region images uploaded */}
                  <div className="mt-1 flex flex-wrap gap-4">
                    {car.image_urls && car.image_urls.length > 0 ? (
                      car.image_urls.map((url, index) => (
                        <div key={`photo_${index}`} className="relative">
                          <img src={url} className="w-32 h-32 object-cover" />
                          <button
                            type="button"
                            onClick={() => onDeleteImage(index)}
                            className="absolute top-0 right-0 size-6 text-red-500"
                          >
                            <MinusCircleIcon></MinusCircleIcon>
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="size-12 text-gray-500">
                        <PhotoIcon></PhotoIcon>
                      </div>
                    )}
                  </div>
                  {/* button add image */}
                  <div className="pt-4">
                    <Button outline color="gray" className="relative">
                      <input
                        type="file"
                        multiple
                        className="absolute left-0 top-0 right-0 bottom-0 opacity-0"
                        onChange={handleMaxImages}
                      />
                      Add Photos
                    </Button>
                  </div>
                </div>
                {/* Submit */}
                <div className="border-t border-t-gray-400 sm:absolute sm:bottom-0 w-full">
                  <div className="flex items-end gap-2 pt-2">
                    <Button outline color="blue" type="submit">
                      Save
                    </Button>
                    <span
                      onClick={(ev) => {
                        navigateR(0);
                        // setCar(templateCar);
                      }}
                      className="underline text-gray-500 pb-1 cursor-pointer hover:font-medium"
                    >
                      Clear
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </PageComponent>
  );
}
