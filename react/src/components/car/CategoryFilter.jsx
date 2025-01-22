import { useEffect, useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { ArrowUpCircleIcon, EyeIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { Button, Drawer, Dropdown, Sidebar, TextInput } from "flowbite-react";

const sortOptions = [
  { name: "Newest", id: "newest", icon: ArrowUpCircleIcon },
  { name: "Oldest", id: "oldest", icon: ArrowUpCircleIcon },
  {
    name: "Price: Low to High",
    id: "price_up",
    icon: ArrowUpCircleIcon,
  },
  {
    name: "Price: High to Low",
    id: "price_down",
    icon: ArrowUpCircleIcon,
  },
];

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

const filters = [
  {
    id: "car_type",
    name: "Type",
    options: [
      { value: "Sedan", label: "Sedan", checked: false },
      { value: "SUV", label: "SUV", checked: false },
      { value: "Truck", label: "Truck", checked: false },
      { value: "Van", label: "Van", checked: false },
      { value: "Coupe", label: "Coupe", checked: false },
      { value: "Crossover", label: "Crossover", checked: false },
    ],
  },
  {
    id: "fuel_type",
    name: "Fuel",
    options: [
      { value: "Gas", label: "Gas", checked: false },
      { value: "Diesel", label: "Diesel", checked: false },
      { value: "Electric", label: "Electric", checked: false },
      { value: "Hybird", label: "Hybird", checked: false },
    ],
  },
];

const Categories = [
  {
    name: "All",
    color: "hover:bg-gray-500 border-gray-500",
    active: "bg-gray-500 text-white",
  },
  {
    name: "Toyota",
    color: "hover:bg-indigo-500 border-indigo-500",
    active: "bg-indigo-500 text-white",
  },
  {
    name: "Honda",
    color: "hover:bg-yellow-500 border-yellow-500",
    active: "bg-yellow-500 text-white",
  },
  {
    name: "Nissan",
    color: "hover:bg-green-500 border-green-500",
    active: "bg-green-500 text-white",
  },
  {
    name: "Ford",
    color: "hover:bg-red-500 border-red-500",
    active: "bg-red-500 text-white",
  },
  {
    name: "Lexus",
    color: "hover:bg-purple-500 border-purple-500",
    active: "bg-purple-500 text-white",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const search = {
  maker: "all",
  model: "all",
  state: "all",
  city: "all",
  sort: "newest",
  car_type: [],
  fuel_type: [],
};

export default function CategoryFilter({
  title,
  children,
  loading,
  categoryClick,
  searchCarsClick,
}) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const handleClose = () => setMobileFiltersOpen(false);
  const [activeCate, setActiveCate] = useState(Categories[0].name);
  const [activeSort, setActiveSort] = useState(sortOptions[0].id);
  const [nameSort, setNameSort] = useState(sortOptions[0].name);
  const [models, setModels] = useState([]);
  const [cities, setCities] = useState([]);
  const [dataSearch, setDataSearch] = useState({ ...search });
  const [dataFilter, setDataFilter] = useState({
    car_type: [],
    fuel_type: [],
  });

  function onCheckboxFilter(event, filter, value) {
    const newDataFilter = { ...dataFilter };
    if (event.target.checked) {
      newDataFilter[filter].push(value);
    } else {
      newDataFilter[filter] = newDataFilter[filter].filter((f) => f != value);
    }
    setDataFilter({ ...newDataFilter });
  }

  function onClickCategory(ev, cate) {
    ev.preventDefault();
    setActiveCate(cate);
    if (cate === null) {
      return;
    }
    categoryClick(cate);
  }

  const onClickSort = (sort) => {
    setActiveSort(sort);
    setActiveCate(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
    const payload = {
      ...dataSearch,
      car_type: dataFilter["car_type"],
      fuel_type: dataFilter["fuel_type"],
      sort: sort,
    };
    searchCarsClick(payload);
  };

  const onClickSearch = () => {
    setActiveCate(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
    const payload = {
      ...dataSearch,
      car_type: dataFilter["car_type"],
      fuel_type: dataFilter["fuel_type"],
    };
    searchCarsClick(payload);
  };

  return (
    <div className="bg-white -mt-[5rem]">
      <div>
        {/* Mobile filter dialog */}
        <Drawer
          open={mobileFiltersOpen}
          onClose={handleClose}
          className=" no-scrollbar"
        >
          <Drawer.Header title="FILTERS" titleIcon={() => <></>} />
          <Drawer.Items>
            <Sidebar
              aria-label="Sidebar with multi-level dropdown example"
              className="[&>div]:bg-transparent [&>div]:p-0"
            >
              <div className="flex h-full flex-col justify-between py-2">
                <div>
                  <form className="pb-3 md:hidden">
                    <TextInput
                      icon={EyeIcon}
                      type="search"
                      placeholder="Search"
                      required
                      size={32}
                    />
                  </form>
                  <Sidebar.Items>
                    {/* Filters */}
                    {filters.map((filter, index) => {
                      return (
                        <Sidebar.ItemGroup key={`filter_${index}`}>
                          <Sidebar.Collapse
                            open={mobileFiltersOpen ? false : true}
                            icon={null}
                            label={filter.name}
                          >
                            {filter.options.map((op, ind) => {
                              return (
                                <Sidebar.Item key={`op_${ind}`} href={null}>
                                  {op.label}
                                </Sidebar.Item>
                              );
                            })}
                          </Sidebar.Collapse>
                        </Sidebar.ItemGroup>
                      );
                    })}
                  </Sidebar.Items>
                </div>
              </div>
            </Sidebar>
          </Drawer.Items>
        </Drawer>

        {/* Main body */}
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-indigo-800">
              {title}
            </h1>
            <div className="flex items-center">
              {/* Sort component */}
              <Dropdown
                renderTrigger={() => (
                  <div className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 hover:cursor-pointer">
                    Sort {`- ${nameSort}`}
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </div>
                )}
                size="sm"
                className="-ml-[4rem]"
              >
                <div className="py-1">
                  {sortOptions.map((option) => (
                    <Dropdown.Item
                      key={option.name}
                      icon={option.icon}
                      className={
                        `px-4 py-2 text-sm hover:bg-gray-100 hover:outline-none ` +
                        (activeSort === option.id
                          ? "font-medium text-gray-900"
                          : "text-gray-500")
                      }
                      onClick={(ev) => {
                        setNameSort(option.name);
                        onClickSort(option.id);
                      }}
                    >
                      {option.name}
                    </Dropdown.Item>
                  ))}
                </div>
              </Dropdown>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon aria-hidden="true" className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>

          {/* Car component */}
          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <div className="border-r border-gray-300">
                <form className="hidden lg:block p-2">
                  <h3 className="sr-only">Categories</h3>
                  {/* Maker / Model */}
                  <div className="border-b border-gray-200 pb-4">
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
                        onChange={(ev) => {
                          const value = ev.target.value;
                          setModels(maker_model[value]);
                          setDataSearch({
                            ...dataSearch,
                            maker: value,
                            model: "all",
                          });
                        }}
                        className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg
                        focus:ring-blue-500 focus:border-blue-500 block"
                      >
                        <option value="all">All</option>
                        {Object.entries(maker_model).map(([maker, models]) => {
                          return (
                            <option key={`maker_${maker}`} value={maker}>
                              {maker}
                            </option>
                          );
                        })}
                      </select>
                    </div>
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
                        onChange={(ev) => {
                          const value = ev.target.value;
                          setDataSearch({ ...dataSearch, model: value });
                        }}
                        className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg
                        focus:ring-blue-500 focus:border-blue-500 block"
                      >
                        <option value="all">All</option>
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
                  </div>
                  {/* State / City */}
                  <div className="border-b border-gray-200 pb-4">
                    <div className="pb-2">
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium text-gray-700 pb-2"
                      >
                        State
                      </label>
                      <select
                        name="state"
                        id="state"
                        onChange={(ev) => {
                          const value = ev.target.value;
                          setCities(state_city[value]);
                          setDataSearch({
                            ...dataSearch,
                            state: value,
                            city: "all",
                          });
                        }}
                        className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg
                        focus:ring-blue-500 focus:border-blue-500 block"
                      >
                        <option value="all">All</option>
                        {Object.entries(state_city).map(([state, cities]) => {
                          return (
                            <option key={`maker_${state}`} value={state}>
                              {state}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="pb-2">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700 pb-2"
                      >
                        City
                      </label>
                      <select
                        name="city"
                        id="city"
                        onChange={(ev) => {
                          const value = ev.target.value;
                          setDataSearch({ ...dataSearch, city: value });
                        }}
                        className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg
                        focus:ring-blue-500 focus:border-blue-500 block"
                      >
                        <option value="all">All</option>
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
                  {/* CarType / FuelType / State */}
                  {filters.map((section) => (
                    <Disclosure
                      key={section.id}
                      as="div"
                      className="border-b border-gray-200 my-6"
                    >
                      <h3 className="flow-root">
                        <DisclosureButton className="group flex w-full items-center justify-between bg-gray-300 rounded-lg my-2 p-2 text-sm text-gray-900 hover:text-gray-400">
                          <span className="font-medium text-gray-900">
                            {section.name}
                          </span>
                          <span className="ml-6 flex items-center">
                            <PlusIcon
                              aria-hidden="true"
                              className="size-5 group-data-[open]:hidden"
                            />
                            <MinusIcon
                              aria-hidden="true"
                              className="size-5 group-[&:not([data-open])]:hidden"
                            />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="py-2 mb-2 bg-gray-100 rounded-lg">
                        <div className="space-y-4 p-2">
                          {section.options.map((option, optionIdx) => (
                            <div key={option.value} className="flex gap-3">
                              <div className="flex h-5 shrink-0 items-center">
                                <div className="group grid size-4 grid-cols-1">
                                  <input
                                    defaultValue={option.value}
                                    defaultChecked={
                                      dataFilter[section.id] &&
                                      dataFilter[section.id].includes(
                                        option.value
                                      )
                                        ? true
                                        : option.checked
                                    }
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    type="checkbox"
                                    onChange={(ev) => {
                                      onCheckboxFilter(
                                        ev,
                                        section.id,
                                        option.value
                                      );
                                    }}
                                    className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                  />
                                  <svg
                                    fill="none"
                                    viewBox="0 0 14 14"
                                    className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                  >
                                    <path
                                      d="M3 8L6 11L11 3.5"
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="opacity-0 group-has-[:checked]:opacity-100"
                                    />
                                    <path
                                      d="M3 7H11"
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                    />
                                  </svg>
                                </div>
                              </div>
                              <label
                                htmlFor={`filter-${section.id}-${optionIdx}`}
                                className="text-sm text-gray-600"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </DisclosurePanel>
                    </Disclosure>
                  ))}
                  <Button onClick={onClickSearch} outline color="blue">
                    Show Result
                  </Button>
                </form>
              </div>

              {/* Car grid */}
              <div className="lg:col-span-3">
                {/* Your content */}
                {/* Category select */}
                <div className="border-b border-gray-200 pb-6 flex flex-wrap gap-2">
                  {Categories &&
                    Categories.map((category, index) => (
                      <button
                        key={`deskto_cate_${index}`}
                        onClick={(ev) => onClickCategory(ev, category.name)}
                        className={
                          `rounded-xl px-3.5 py-2.5 text-sm font-medium shadow-lg bg-gray-50 hover:text-white border border-2 ${category.color} ` +
                          (activeCate === category.name ? category.active : "")
                        }
                      >
                        {category.name}
                      </button>
                    ))}
                </div>
                {/* Car list */}
                {loading && (
                  <div className="text-center text-lg h-[24rem]">
                    Loading...
                  </div>
                )}
                {!loading && children}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
