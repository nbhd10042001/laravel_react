import { PaperClipIcon } from "@heroicons/react/20/solid";
import PageComponent from "../../components/PageComponent";
import { useEffect, useState } from "react";
import axiosClient from "../../axios";
import router from "../../router";
import { useParams } from "react-router-dom";
import TButton from "../../components/core/TButton";
import { PencilIcon } from "@heroicons/react/24/outline";
import { useStateContext } from "../../contexts/ContextProvider";
import { Avatar } from "flowbite-react";

export default function UserProfile() {
  const { currentUser } = useStateContext();
  const [user, setUser] = useState();
  const { name } = useParams();

  useEffect(() => {
    if (name) {
      axiosClient
        .get(`/profile/${name}`)
        .then(({ data }) => {
          setUser(data.user);
        })
        .catch((err) => {
          router.navigate(`/error/${err.response.status}`);
        });
    }
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
      <div>
        <div className="px-4 sm:px-0">
          <h3 className="text-base/7 font-semibold text-gray-900">Avatar</h3>
          <Avatar
            img={user ? user.image : currentUser.image}
            rounded
            size="xl"
          ></Avatar>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-200">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className={dtClasses.join(" ")}>Full name</dt>
              <dd className={ddClasses.join(" ")}>
                {user ? user.name : currentUser.name}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className={dtClasses.join(" ")}>User name</dt>
              <dd className={ddClasses.join(" ")}>
                {user ? user.user_name : currentUser.user_name}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className={dtClasses.join(" ")}>Email address</dt>
              <dd className={ddClasses.join(" ")}>
                {user ? user.email : currentUser.email}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className={dtClasses.join(" ")}>Phone Number</dt>
              <dd className={ddClasses.join(" ")}>
                {user ? user.phone : currentUser.phone}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className={dtClasses.join(" ")}>Address</dt>
              <dd className={ddClasses.join(" ")}>
                {user ? user.address : currentUser.address}
              </dd>
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
              <dd className={ddClasses.join(" ")}>
                {user ? user.created_at : currentUser.created_at}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className={dtClasses.join(" ")}>Role</dt>
              <dd className={ddClasses.join(" ")}>
                {user ? user.role : currentUser.role}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </PageComponent>
  );
}
