import React, { useEffect, useState } from "react";
import axiosClient from "../../axios";
import { useStateContext } from "../../contexts/ContextProvider";
import PageComponent from "../../components/PageComponent";
import TButton from "../../components/core/TButton";
import { Avatar } from "flowbite-react";
import { useNavigate } from "react-router-dom";

export default function UserProfileEdit() {
  const [profile, setProfile] = useState({
    name: "",
    address: "",
    phone: "",
    image: null,
    image_file: null,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { showToast, updateCurrentUser, userToken } = useStateContext();
  const [image, setImage] = useState("");

  const onSubmit = (ev) => {
    ev.preventDefault();
    const payload = { ...profile };
    delete payload.image_file;
    delete payload.user_name; // remove user_name in user
    axiosClient
      .put(`/profile/edit/${profile.user_name}`, payload)
      .then(() => {
        navigate("/profile");
        showToast("Your profile was updated!", "success");
        updateCurrentUser();
      })
      .catch((err) => {
        const errs = err.response.data.errors;
        if (errs.name) {
          setMessageError("fullname", errs.name);
        }
        if (errs.address) {
          setMessageError("address", errs.address);
        }
        if (errs.phone) {
          setMessageError("phone", errs.phone);
        }
      });
  };

  const setMessageError = (id, message) => {
    document.getElementById(id).classList.add("border-red-500");
    document.getElementById(`error_${id}`).innerHTML = message;
  };

  const removeMessageError = (id) => {
    document.getElementById(id).classList.remove("border-red-500");
    document.getElementById(`error_${id}`).innerHTML = "";
  };

  const classes = [
    "mt-1",
    "block w-full",
    "rounded-md",
    "border-gray-300",
    "shadow-sm",
    "focus:border-indigo-500",
    "focus:ring-indigo-500",
    "sm:text-sm",
  ];

  const onImageChoose = (ev) => {
    const file = ev.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setProfile({
        ...profile,
        image_file: file,
        image: reader.result,
      });
      ev.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  if(!userToken){
    navigate("/login");
  }

  useEffect(() => {
    if(!userToken){
      navigate("/login");
    }
    axiosClient
      .get("/me")
      .then(({ data }) => {
        setProfile({
          name: data.user.name,
          address: data.user.address,
          phone: data.user.phone,
          user_name: data.user.user_name,
        });
        setImage(data.user.image);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <PageComponent title={"Edit Profile"}>
      {loading && <div className="text-center text-lg">Loading...</div>}
      {!loading && profile && (
        <form action="#" method="POST" onSubmit={onSubmit}>
          <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
              {/* Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Avatar
                </label>
                <div className="mt-1 flex items-center">
                  <Avatar
                    img={profile.image ?? image}
                    size="xl"
                    rounded
                  ></Avatar>
                  <button
                    type="button"
                    className="relative ml-5 rounded-md border border-gray-300 bg-white py-2 px-3
                  text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <input
                      type="file"
                      className="absolute left-0 top-0 right-0 bottom-0 opacity-0"
                      onChange={(ev) => onImageChoose(ev)}
                    />
                    Change
                  </button>
                </div>
              </div>

              {/* Full Name */}
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="fullname"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullname"
                  id="fullname"
                  value={profile.name ?? ""}
                  onChange={(ev) => {
                    setProfile({ ...profile, name: ev.target.value });
                    removeMessageError("fullname");
                  }}
                  className={classes.join(" ")}
                />
                <small id="error_fullname" className="text-red-500" />
              </div>

              {/* Phone number */}
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  value={profile.phone ?? ""}
                  onChange={(ev) => {
                    setProfile({ ...profile, phone: ev.target.value });
                    removeMessageError("phone");
                  }}
                  className={classes.join(" ")}
                />
                <small id="error_phone" className="text-red-500" />
              </div>

              {/* Address */}
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={profile.address ?? ""}
                  onChange={(ev) => {
                    setProfile({ ...profile, address: ev.target.value });
                    removeMessageError("address");
                  }}
                  className={classes.join(" ")}
                />
                <small id="error_address" className="text-red-500" />
              </div>
            </div>

            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <TButton>Save</TButton>
            </div>
          </div>
        </form>
      )}
    </PageComponent>
  );
}
