import React, { useEffect, useState } from "react";
import axiosClient from "../../axios";
import { Navigate } from "react-router-dom";
import router from "../../router";

export default function SeedAdmin() {
  const [success, setSuccess] = useState(false);

  if (success) {
    return <Navigate to="/"></Navigate>;
  } else {
    axiosClient.post("/seed-user-admin")
      .then(() => {
        setSuccess(true);
      })
      .catch(error => {
        router.navigate(`/error/${error.response.status}`);
      });
  }

  return <div className="text-center text-lg">Loading....</div>;
}
