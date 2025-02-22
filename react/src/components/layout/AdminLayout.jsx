import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios";
import { useEffect, useState } from "react";
import { ToastCustom } from "../ToastCustom";
import router from "../../router";
import { Avatar } from "flowbite-react";

const navigation = [
  { name: "Dashboard", to: "/admin/dashboard" },
  { name: "Surveys", to: "/admin/surveys" },
  { name: "Cars", to: "/admin/cars" },
  { name: "Orders", to: "/admin/orders" },
  { name: "Users", to: "/admin/users" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AdminLayout() {
  const {
    currentUser,
    userToken,
    setCurrentUser,
    setUserToken,
    updateCurrentUser,
    userRole,
    checkUserRole,
    navigateR,
  } = useStateContext();
  const { boxToast } = useStateContext();

  const userNavigation = [
    {
      name: "Your Profile",
      href: "",
      onclick: (event) => router.navigate("/profile"),
    },
    { name: "Settings", href: "#", onclick: null },
    { name: "Sign out", href: "#", onclick: (event) => logout(event) },
  ];

  const logout = (event) => {
    event.preventDefault();
    axiosClient
      .post("/logout")
      .then((res) => {
        setCurrentUser({});
        setUserToken(null);
      })
      .catch((error) => {
        router.navigate(`/error/${error.response.status}`);
      });
  };

  useEffect(() => {
    if(!userToken){
      navigateR('/login');
    }
  }, [userToken])

  useEffect(() => {
    updateCurrentUser();
    checkUserRole();
    document.getElementById("box-toast").innerHTML = ""; // clear all toast
  }, []);

  return (
    <div className="min-h-full">
      <Disclosure as="nav" className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              {/* logo company */}
              <div className="shrink-0">
                <a href="/" className="-m-1.5 p-1.5">
                  <span className="sr-only">Your Company</span>
                  <img
                    alt=""
                    src={`${
                      import.meta.env.VITE_API_BASE_URL
                    }/images/logo_company/logo3.png`}
                    className="h-8 w-auto"
                  />
                </a>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.to}
                      className={({ isActive }) =>
                        classNames(
                          isActive
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )
                      }
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div className="flex flex-row text-right items-center">
                    <div className="font-medium text-xs text-white mr-2">
                      <div>{currentUser.name}</div>
                      <div className="text-xs text-gray-500">
                        {currentUser.email}
                      </div>
                    </div>
                    <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      {/* <img src={imageUrl} className="size-8 rounded-full" /> */}
                      <Avatar
                        img={currentUser.image}
                        rounded
                        className="hover:opacity-70"
                      ></Avatar>
                    </MenuButton>
                  </div>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    {userNavigation.map((item) => (
                      <MenuItem key={item.name}>
                        <a
                          href={item.href}
                          onClick={(event) => item.onclick(event)}
                          className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                        >
                          {item.name}
                        </a>
                      </MenuItem>
                    ))}
                  </MenuItems>
                </Menu>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              {/* Mobile menu button */}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block size-6 group-data-[open]:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden size-6 group-data-[open]:block"
                />
              </DisclosureButton>
            </div>
          </div>
        </div>

        {/* Mobile panel*/}
        <DisclosurePanel className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                className={({ isActive }) =>
                  classNames(
                    isActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>
          <div className="border-t border-gray-700 pb-3 pt-4">
            <div className="flex items-center px-5">
              <div className="shrink-0">
                {/* <img alt="" src={currentUser.image} className="size-10 rounded-full" /> */}
                <Avatar img={currentUser.image} rounded></Avatar>
              </div>
              <div className="ml-3">
                <div className="text-base/5 font-medium text-white">
                  {currentUser.name}
                </div>
                <div className="text-sm font-medium text-gray-400">
                  {currentUser.email}
                </div>
              </div>
            </div>
            <div className="mt-3 space-y-1 px-2">
              {userNavigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  href={item.href}
                  onClick={(event) => item.onclick(event)}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>

      {/* Your content */}
      <Outlet></Outlet>

      {/* Toast region */}
      <div
        id="box-toast"
        className="w-[20rem] fixed right-4 bottom-4 z-50 flex flex-col-reverse"
      >
        {boxToast.length > 0 &&
          boxToast.map((toast, index) => {
            return (
              <div key={index} id={toast.id}>
                <ToastCustom
                  message={toast.message}
                  type={toast.type}
                  id={toast.id}
                ></ToastCustom>
              </div>
            );
          })}
      </div>
    </div>
  );
}
