import React, { useEffect, useState } from "react";
import axiosClient from "../../axios";
import { Navigate, useParams } from "react-router-dom";
import router from "../../router";

export default function SeedPage() {
  const [success, setSuccess] = useState(false);
  const {text} = useParams();

  if (success) {
    return <Navigate to="/"></Navigate>;
  } else {
    if(text === "admin"){
      axiosClient.post("/seed-user-admin")
      .then(() => {
        setSuccess(true);
      })
      .catch(error => {
        router.navigate(`/error/${error.response.status}`);
      });
    }

    if(text === "cars"){
      axiosClient.get("/seed-cars")
      .then(() => {
        setSuccess(true);
      })
      .catch(error => {
        router.navigate(`/error/${error.response.status}`);
      });
    }
  }

  return <div className="text-center text-lg">Loading....</div>;
}
