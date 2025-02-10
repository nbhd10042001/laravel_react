import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";
import { Spinner } from "flowbite-react";

export default function LoginGoogle() {
  const location = useLocation();
  const { setCurrentUser, setUserToken } = useStateContext();

  useEffect(() => {
    axiosClient
      .get(`/auth/google/callback${location.search}`)
      .then(({ data }) => {
        setCurrentUser(data.user);
        setUserToken(data.access_token);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="flex flex-col justify-center my-36 items-center">
      <span className="font-medium text-2xl text-indigo-700">
        Please wait for the server to process...{" "}
      </span>
      <div className="mt-4">
        <Spinner color="success"></Spinner>
      </div>
    </div>
  );
}
