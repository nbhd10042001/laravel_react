import React from "react";
import PageComponent from "../components/PageComponent";
import TButton from "../components/core/TButton";
import axiosClient from "../axios";
import { CubeIcon } from "@heroicons/react/24/solid";
import { useStateContext } from "../contexts/ContextProvider";

export default function Dashboard() {
  const { showToast } = useStateContext();

  const seedSurveys = () => {
    axiosClient.post("/seedsurveys").then(() => {
      showToast("Seed data surveys success!", "warning");
    });
  };

  const btn1 = () => {
    showToast("Test 1 success!", "success");
  }

  const btn2 = () => {
    showToast("Test 2 warning!", "warning");
  }

  const btn3 = () => {
    showToast("Test 3 danger!", "danger");
  }

  const buttons = (
    <TButton color="green" onClick={() => seedSurveys()}>
      <CubeIcon className="h-6 w-6 mr-2"></CubeIcon>
      Seed Survey
    </TButton>
  );

  return (
    <PageComponent title="Dashboard" buttons={buttons}>
      <div className="w-[10rem] flex flex-col gap-1">
      <TButton color="green" onClick={() => btn1()}>
        <CubeIcon className="h-6 w-6 mr-2"></CubeIcon>
        Test 1
      </TButton>
      <TButton color="green" onClick={() => btn2()}>
        <CubeIcon className="h-6 w-6 mr-2"></CubeIcon>
        Test 2
      </TButton>
      <TButton color="green" onClick={() => btn3()}>
        <CubeIcon className="h-6 w-6 mr-2"></CubeIcon>
        Test 3
      </TButton>
      </div>
    </PageComponent>
  );
}
