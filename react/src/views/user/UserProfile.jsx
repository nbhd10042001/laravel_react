import PageComponent from "../../components/PageComponent";
import { useEffect, useState } from "react";
import axiosClient from "../../axios";
import { useParams } from "react-router-dom";
import TButton from "../../components/core/TButton";
import { PencilIcon } from "@heroicons/react/24/outline";
import { useStateContext } from "../../contexts/ContextProvider";
import { Avatar } from "flowbite-react";

export default function UserProfile() {
  const { userToken, navigateR } = useStateContext();
  const [user, setUser] = useState();
  const { name } = useParams();

  useEffect(() => {
    if (!userToken) {
      navigateR("/login");
    }
    
    var url = "/profile";
    if (name) {
      url = `/profile/${name}`;
    }
    axiosClient
      .get(url)
      .then(({ data }) => {
        setUser(data.user);
      })
      .catch((error) => {
        navigateR(window.location.pathname, true, {
          code: error.response.status,
          mess: error.response.statusText,
        });
      });
  }, []);

  const button = (
    <TButton to="/profile/edit">
      <PencilIcon
        stroke="orange"
        strokeWidth={1.2}
        className="h-5 w-5 mr-2"
      ></PencilIcon>
      Edit
    </TButton>
  );

  const dtClasses = ["text-md/6", "font-medium", "text-gray-900"];
  const ddClasses = [
    "mt-1",
    "text-md/6",
    "text-gray-700",
    "sm:col-span-2",
    "sm:mt-0",
  ];

  return (
    <PageComponent title="User Profile" buttons={button}>
      <div className="bg-white p-4">
        <div className="px-4 sm:px-0">
          <h3 className="text-base/7 font-semibold text-gray-900">Avatar</h3>
          <Avatar img={user && user.image} rounded size="xl"></Avatar>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-200">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className={dtClasses.join(" ")}>Full name</dt>
              <dd className={ddClasses.join(" ")}>{user && user.name}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className={dtClasses.join(" ")}>User name</dt>
              <dd className={ddClasses.join(" ")}>{user && user.user_name}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className={dtClasses.join(" ")}>Email address</dt>
              <dd className={ddClasses.join(" ")}>{user && user.email}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className={dtClasses.join(" ")}>Phone Number</dt>
              <dd className={ddClasses.join(" ")}>{user && user.phone}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className={dtClasses.join(" ")}>Address</dt>
              <dd className={ddClasses.join(" ")}>{user && user.address}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className={dtClasses.join(" ")}>About</dt>
              <dd className={ddClasses.join(" ")}>
                Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
                incididunt cillum culpa consequat. Excepteur qui ipsum aliquip
                consequat sint. Sit id mollit nulla mollit nostrud in ea officia
                proident. Irure nostrud pariatur mollit ad adipisicing
                reprehenderit deserunt qui eu.
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className={dtClasses.join(" ")}>Created at</dt>
              <dd className={ddClasses.join(" ")}>{user && user.created_at}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className={dtClasses.join(" ")}>Role</dt>
              <dd className={ddClasses.join(" ")}>{user && user.role}</dd>
            </div>
          </dl>
        </div>
      </div>
    </PageComponent>
  );
}
