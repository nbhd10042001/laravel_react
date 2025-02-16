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
  PlusCircleIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
import { Link, Outlet, redirect } from "react-router-dom";
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
import { ToastCustom } from "../ToastCustom";
import { DialogComponent } from "../DialogComponent";
import Cart from "../core/Cart";

const navigates = [
  {
    nameNav: "Cars",
    to: "/cars",
    itemNav: null,
  },
  {
    nameNav: "Surveys",
    to: "/surveys",
    itemNav: null,
  },
  {
    nameNav: "Contact",
    itemNav: null,
    to: "/contact",
  },
  {
    nameNav: "Policy",
    itemNav: null,
    to: "/policy",
  },
  {
    roles: ["Seller", "Admin", "Member"],
    nameNav: "Manage",
    itemNav: [
      {
        name: "Create Car",
        description: "Create your new car",
        to: "/car/create",
        icon: PlusCircleIcon,
      },
      {
        name: "Your Cars",
        description: "View all your cars created",
        to: `/your-cars`,
        icon: ArchiveBoxIcon,
      },
    ],
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
  const handleClose = () => setMobileMenuOpen(false);

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
      name: "Your Orders",
      href: "",
      handleClickEvent: (event) => {
        document.getElementById("link_orders").click();
      },
      icon: ShoppingBagIcon,
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
        window.location.href = "/";
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
      <div className="bg-dark-custom shadow-md fixed w-full h-[5rem] z-20">
        <nav
          aria-label="Global"
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        >
          {/* Logo Company */}
          <div className="flex lg:flex-1">
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

          {/* Desktop render navigates */}
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
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon color="white" aria-hidden="true" className="size-6" />
            </button>
          </div>

          {/* Login/logout desktop */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end text-white">
            {userToken && (
              <button type="button" onClick={() => setMobileMenuOpen(true)}>
                <span className="sr-only">Open main menu</span>
                <Avatar
                  img={currentUser.image}
                  rounded
                  className="hover:opacity-70"
                ></Avatar>
              </button>
            )}
            {!userToken && (
              <div>
                <Link
                  to="/login"
                  className="flex text-dark font-medium hover:opacity-70"
                >
                  Login
                  <ArrowRightEndOnRectangleIcon className="size-6 flex-none ml-1"></ArrowRightEndOnRectangleIcon>
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Drawer panel navigate */}
        <Drawer open={mobileMenuOpen} onClose={handleClose} position="right">
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
                                className="hover:text-indigo-600"
                                open={mobileMenuOpen ? false : true}
                                label={
                                  <span className="font-medium">
                                    {navigate.nameNav}
                                  </span>
                                }
                              >
                                <div>
                                  {navigate.itemNav.map((item, index) => {
                                    return (
                                      <Sidebar.Item
                                        key={`item-menu-${index}`}
                                        className={
                                          "cursor-pointer hover:text-indigo-500"
                                        }
                                        onClick={() => {
                                          setMobileMenuOpen(false);
                                          navigateR(item.to);
                                        }}
                                      >
                                        <div className="flex gap-2 items-center">
                                          <div className="bg-gray-100 p-2 rounded-lg text-indigo-700">
                                            <item.icon className="w-4 h-4"></item.icon>
                                          </div>
                                          <span>{item.name}</span>
                                        </div>
                                      </Sidebar.Item>
                                    );
                                  })}
                                </div>
                              </SidebarCollapse>
                            )}
                            {/* if nav not have child */}
                            {!navigate.itemNav && (
                              <Sidebar.Item
                                className={`cursor-pointer hover:text-indigo-600`}
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  navigateR(navigate.to);
                                }}
                              >
                                <span className="font-medium">
                                  {navigate.nameNav}
                                </span>
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
                          open={mobileMenuOpen ? false : true}
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
                                  className={`cursor-pointer hover:text-indigo-600`}
                                  onClick={(event) => {
                                    setMobileMenuOpen(false);
                                    userNav.handleClickEvent(event);
                                  }}
                                >
                                  <div
                                    className={`flex gap-2 items-center ${
                                      userNav.name === "Logout"
                                        ? "text-red-500 font-medium"
                                        : ""
                                    }`}
                                  >
                                    <userNav.icon className="size-5"></userNav.icon>
                                    <span>{userNav.name}</span>
                                  </div>
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
                            <span className="font-medium text-indigo-700">
                              Login
                            </span>
                          </Sidebar.Item>
                          <Sidebar.Item
                            className={`cursor-pointer`}
                            onClick={() => {
                              navigateR("/signup");
                            }}
                          >
                            <span className="font-medium text-indigo-700">
                              Signup
                            </span>
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
      </div>

      {/* Element Link */}
      <a id="link_profile" href="/profile" className="hidden"></a>
      <a id="link_orders" href="/orders" className="hidden"></a>
      <a id="link_adminboard" href="/dashboard" className="hidden"></a>

      {/* Body */}
      <div className=" mt-[5rem]">
        {/* Your content */}
        <Outlet></Outlet>
      </div>

      {/* Modal */}
      <DialogComponent></DialogComponent>

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

      {/* Shoping Cart */}
      {userToken && <Cart></Cart>}

      {/* Footer */}
      <FooterComponent></FooterComponent>
    </div>
  );
}
