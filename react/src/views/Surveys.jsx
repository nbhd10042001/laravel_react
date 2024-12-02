import React, { useState } from "react";
import PageComponent from "../components/PageComponent";
import { useStateContext } from "../contexts/ContextProvider";
import SurveyListItem from "../components/SurveyListItem";
import TButton from "../components/core/TButton";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

export default function Surveys() {
  const { surveys } = useStateContext();

  const onDeleteClick = () => {
    console.log("on delete click");
  }

  const buttons = (
    <TButton color="green" to="/surveys/create">
      <PlusCircleIcon className="h-6 w-6 mr-2"></PlusCircleIcon>
      Create New
    </TButton>
  );

  return (
    <PageComponent title="Surveys" buttons={ buttons }>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
        {surveys.map((survey) => (
          <SurveyListItem survey={survey} key={survey.id} onDeleteClick={onDeleteClick}></SurveyListItem>
        ))}
      </div>
    </PageComponent>
  );
}
