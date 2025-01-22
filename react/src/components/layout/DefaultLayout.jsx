import { useEffect, useState } from "react";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import {
  ArchiveBoxIcon,
  ArrowRightEndOnRectangleIcon,
  ArrowRightStartOnRectangleIcon,
  ArrowUpTrayIcon,
  Bars3Icon,
  Cog6ToothIcon,
  FingerPrintIcon,
  IdentificationIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
import { Link, Outlet, redirect } from "react-router-dom";
import { ToastCustom } from "../ToastCustom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios";
import {
  Avatar,
  Button,
  Drawer,
  Dropdown,
  Sidebar,
  SidebarCollapse,
  SidebarItem,
  TextInput,
} from "flowbite-react";
import { FooterComponent } from "../FooterComponent";

const navigates = [
  {
    nameNav: "Car",
    itemNav: [
      {
        name: "Cars",
        description: "View all cars",
        to: "/cars",
        icon: ArchiveBoxIcon,
      },
      {
        name: "Surveys",
        description: "Answer surveys",
        to: "/surveys",
        icon: FingerPrintIcon,
      },
    ],
  },
  {
    roles: ["Seller", "Admin"],
    nameNav: "Manage",
    itemNav: [
      {
        name: "Your Cars",
        description: "View all your cars",
        to: `/your-cars`,
        icon: ArchiveBoxIcon,
      },
      {
        name: "Create Car",
        description: "Create new car",
        to: "/car/create",
        icon: ArchiveBoxIcon,
      },
    ],
  },
  {
    nameNav: "Company",
    itemNav: null,
    to: "/",
  },
  {
    nameNav: "About",
    itemNav: null,
    to: "/",
  },
];

const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
];

export default function DefaultLayout() {
  const {
    currentUser,
    userToken,
    setCurrentUser,
    setUserToken,
    userRole,
    updateCurrentUser,
    boxToast,
    navigateR,
  } = useStateContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);

  // navigates -----------------------------//
  const userNavigation = [
    {
      name: "Your Profile",
      href: "",
      handleClickEvent: (event) => {
        document.getElementById("link_profile").click();
      },
      icon: IdentificationIcon,
    },
    {
      roles: ["Seller", "Admin"],
      name: "Admin Board",
      href: "",
      handleClickEvent: (event) => {
        document.getElementById("link_adminboard").click();
      },
      icon: IdentificationIcon,
    },
    {
      name: "Settings",
      href: "",
      handleClickEvent: (event) => {},
      icon: Cog6ToothIcon,
    },
    {
      name: "Logout",
      href: "",
      handleClickEvent: (event) => logout(event),
      icon: ArrowRightStartOnRectangleIcon,
    },
  ];

  const logout = (event) => {
    event.preventDefault();
    axiosClient
      .post("/logout")
      .then((res) => {
        setCurrentUser({});
        setUserToken(null);
        window.location.href = '/';
      })
      .catch((error) => {
        navigateR(window.location.pathname, true, {
          code: error.response.status,
          mess: error.response.statusText,
        });
      });
  };

  useEffect(() => {
    document.getElementById("box-toast").innerHTML = ""; // clear all toast
    updateCurrentUser();
  }, []);

  return (
    <div className="overflow-hidden relative">
      {/* header */}
      <header className="bg-dark-custom shadow-md fixed w-full h-[5rem] z-20">
        <nav
          aria-label="Global"
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        >
          {/* Logo Company */}
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </a>
          </div>

          {/* Desktop render navigate */}
          <PopoverGroup className="hidden lg:flex lg:gap-x-12">
            {navigates.map((navigate, index) => {
              if (navigate.roles && !navigate.roles.includes(userRole)) {
                return;
              }
              return (
                <Popover className="relative" key={`navigate_${index}`}>
                  {/* title nav */}
                  <PopoverButton className="focus:outline-none flex items-center gap-x-1 text-sm/6 font-semibold text-white hover:text-gray-300">
                    <div className="group flex items-center">
                      {navigate.itemNav && (
                        <>
                          {navigate.nameNav}
                          <ChevronDownIcon
                            aria-hidden="true"
                            className="size-5 flex-none text-gray-400"
                          />
                        </>
                      )}
                      {!navigate.itemNav && (
                        <Link to={navigate.to}>{navigate.nameNav}</Link>
                      )}
                      <div className="absolute w-full h-1 bg-white top-10 hidden group-hover:block"></div>
                    </div>
                  </PopoverButton>

                  {/* items nav */}
                  <PopoverPanel
                    transition
                    className="absolute -left-8 top-full z-20 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <div className="p-4">
                      {navigate.itemNav &&
                        navigate.itemNav.map((item) => (
                          <div
                            key={item.name}
                            className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50"
                          >
                            <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                              <item.icon
                                aria-hidden="true"
                                className="size-6 text-gray-600 group-hover:text-indigo-600"
                              />
                            </div>
                            <div className="flex-auto">
                              <PopoverButton
                                as={Link}
                                to={item.to}
                                className="block font-semibold text-gray-900"
                              >
                                {item.name}
                                <span className="absolute inset-0" />
                              </PopoverButton>
                              <p className="mt-1 text-gray-600">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>

                    {/* Action */}
                    <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                      {navigate.nameNav === "Product" &&
                        callsToAction.map((item) => (
                          <Link
                            key={item.name}
                            to={item.to}
                            className="flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100"
                          >
                            <item.icon
                              aria-hidden="true"
                              className="size-5 flex-none text-gray-400"
                            />
                            {item.name}
                          </Link>
                        ))}
                    </div>
                  </PopoverPanel>
                </Popover>
              );
            })}
          </PopoverGroup>

          {/* Button menu for mobile */}
          <div className="flex lg:hidden">
            <button
              type="button"
              // onClick={() => setMobileMenuOpen(true)}
              onClick={() => setIsOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon color="white" aria-hidden="true" className="size-6" />
            </button>
          </div>

          {/* Login/logout desktop */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end text-white">
            {userToken && (
              <button type="button" onClick={() => setIsOpen(true)}>
                <span className="sr-only">Open main menu</span>
                <Avatar img={currentUser.image} rounded></Avatar>
              </button>
            )}
            {!userToken && (
              <div>
                <Link to="/login" className="flex text-dark font-medium">
                  Login
                  <ArrowRightEndOnRectangleIcon className="size-6 flex-none ml-1"></ArrowRightEndOnRectangleIcon>
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Drawer panel navigate */}
        <Drawer open={isOpen} onClose={handleClose} position="right">
          <Drawer.Header title="MENU" titleIcon={() => <></>} />
          <Drawer.Items>
            <Sidebar
              aria-label="Sidebar with multi-level dropdown example"
              className="[&>div]:bg-transparent [&>div]:p-0"
            >
              <div className="flex h-full flex-col justify-between py-2">
                <div>
                  <Sidebar.Items>
                    {/* navigation */}
                    <Sidebar.ItemGroup>
                      {navigates.map((navigate, index) => {
                        if (
                          navigate.roles &&
                          !navigate.roles.includes(userRole)
                        ) {
                          return;
                        }

                        return (
                          <div key={`nav-menu-${index}`}>
                            {/* if nav have child */}
                            {navigate.itemNav && (
                              <SidebarCollapse
                                open={isOpen ? false : true}
                                label={navigate.nameNav}
                              >
                                {navigate.itemNav.map((item, index) => {
                                  return (
                                    <div key={`item-menu-${index}`}>
                                      <Sidebar.Item
                                        className={`cursor-pointer`}
                                        onClick={() => {
                                          setIsOpen(false);
                                          navigateR(item.to);
                                        }}
                                      >
                                        {item.name}
                                      </Sidebar.Item>
                                    </div>
                                  );
                                })}
                              </SidebarCollapse>
                            )}
                            {/* if nav not have child */}
                            {!navigate.itemNav && (
                              <Sidebar.Item
                                className={`cursor-pointer`}
                                onClick={() => {
                                  setIsOpen(false);
                                  navigateR(navigate.to);
                                }}
                              >
                                {navigate.nameNav}
                              </Sidebar.Item>
                            )}
                          </div>
                        );
                      })}
                    </Sidebar.ItemGroup>

                    {/* user information - login/logout */}
                    <Sidebar.ItemGroup>
                      {/* if user login */}
                      {userToken && (
                        <SidebarCollapse
                          open={isOpen ? false : true}
                          label={
                            <div className="flex">
                              <Avatar img={currentUser.image} rounded></Avatar>
                              <div className="text-left ml-2 max-w-[10rem] ">
                                <span className="block truncate text-sm font-medium">
                                  {currentUser.name}
                                </span>
                                <span className="block truncate text-sm font-small">
                                  {currentUser.email}
                                </span>
                              </div>
                            </div>
                          }
                        >
                          {userNavigation.map((userNav, index) => {
                            if (
                              userNav.roles &&
                              !userNav.roles.includes(userRole)
                            ) {
                              return;
                            }
                            return (
                              <div key={`userNav-menu-${index}`}>
                                <Sidebar.Item
                                  className={`cursor-pointer`}
                                  onClick={(event) => {
                                    setIsOpen(false);
                                    userNav.handleClickEvent(event);
                                  }}
                                >
                                  {userNav.name}
                                </Sidebar.Item>
                              </div>
                            );
                          })}
                        </SidebarCollapse>
                      )}
                      {/* If user not login */}
                      {!userToken && (
                        <div>
                          <Sidebar.Item
                            className={`cursor-pointer`}
                            onClick={() => {
                              navigateR("/login");
                            }}
                          >
                            Login
                          </Sidebar.Item>
                          <Sidebar.Item
                            className={`cursor-pointer`}
                            onClick={() => {
                              navigateR("/signup");
                            }}
                          >
                            Signup
                          </Sidebar.Item>
                        </div>
                      )}
                    </Sidebar.ItemGroup>
                  </Sidebar.Items>
                </div>
              </div>
            </Sidebar>
          </Drawer.Items>
        </Drawer>

        {/* Mobile render navigate (not using this) */}
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-20" />
          <DialogPanel className="fixed inset-y-0 right-0 z-20 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            {/* logo company */}
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  alt=""
                  src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                  className="h-8 w-auto"
                />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            {/* Menu navigate mobile */}
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigates.map((navigate, index) => {
                    return (
                      <Disclosure
                        as="div"
                        className="-mx-3"
                        key={`mobileNav_${index}`}
                      >
                        {/* name Nav */}
                        {navigate.itemNav && (
                          <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                            {navigate.nameNav}
                            <ChevronDownIcon
                              aria-hidden="true"
                              className="size-5 flex-none group-data-[open]:rotate-180"
                            />
                          </DisclosureButton>
                        )}
                        {!navigate.itemNav && (
                          <Link
                            to={navigate.to}
                            onClick={(ev) => setMobileMenuOpen(false)}
                          >
                            <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                              {navigate.nameNav}
                            </DisclosureButton>
                          </Link>
                        )}

                        {/* items nav */}
                        <DisclosurePanel className="mt-2 space-y-2">
                          {navigate.itemNav &&
                            navigate.itemNav.map((item) => (
                              <Link
                                key={item.name}
                                to={item.to}
                                onClick={(ev) => setMobileMenuOpen(false)}
                                className="block rounded-lg py-2 pl-6 pr-3 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
                              >
                                {item.name}
                              </Link>
                            ))}
                          {navigate.nameNav === "Product" &&
                            callsToAction.map((item) => {
                              return (
                                <Link
                                  key={item.name}
                                  to={item.to}
                                  onClick={(ev) => setMobileMenuOpen(false)}
                                  className="block rounded-lg py-2 pl-6 pr-3 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
                                >
                                  {item.name}
                                </Link>
                              );
                            })}
                        </DisclosurePanel>
                      </Disclosure>
                    );
                  })}
                </div>

                {/* Login/Logout mobile*/}
                <div className="py-6">
                  {userToken && (
                    <Disclosure as="div" className="-mx-3">
                      {/* user information */}
                      <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base/7 text-gray-900 hover:bg-gray-50">
                        <div className="flex">
                          <Avatar img={currentUser.image} rounded></Avatar>
                          <div className="text-left ml-2 max-w-[16rem]">
                            <span className="block truncate text-sm font-medium">
                              {currentUser.name}
                            </span>
                            <span className="block truncate text-sm font-small">
                              {currentUser.email}
                            </span>
                          </div>
                        </div>
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="size-5 flex-none group-data-[open]:rotate-180"
                        />
                      </DisclosureButton>
                      {/* items nav */}
                      <DisclosurePanel className="mt-2 space-y-2">
                        {userNavigation.map((item, index) => (
                          <span
                            key={`userNav_${index}`}
                            className={
                              "block rounded-lg py-2 pl-6 pr-3 text-sm/7 font-semibold hover:bg-gray-50 " +
                              (item.name === "Logout"
                                ? "text-red-500"
                                : "text-gray-900")
                            }
                            onClick={(ev) => {
                              item.handleClickEvent(ev);
                              setMobileMenuOpen(false);
                            }}
                          >
                            {item.name}
                          </span>
                        ))}
                      </DisclosurePanel>
                    </Disclosure>
                  )}
                  {!userToken && (
                    <div className="flex flex-rows justify-center gap-x-12">
                      <Link
                        to="/login"
                        className="flex items-center text-blue-700 font-medium"
                      >
                        <ArrowRightEndOnRectangleIcon className="size-6 mr-2"></ArrowRightEndOnRectangleIcon>
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        className="flex items-center text-blue-700 font-medium"
                      >
                        <ArrowUpTrayIcon className="size-5 mr-2"></ArrowUpTrayIcon>
                        Sign Up
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      {/* Element Link */}
      <a id="link_profile" href="/profile" className="hidden"></a>
      <a id="link_adminboard" href="/dashboard" className="hidden"></a>

      {/* Body */}
      <div className=" mt-[5rem]">
        {/* Your content */}
        <Outlet></Outlet>
      </div>

      <FooterComponent></FooterComponent>

      {/* Toast Box */}
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
