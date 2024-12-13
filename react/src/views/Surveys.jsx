import React, { useEffect, useState } from "react";
import PageComponent from "../components/PageComponent";
import { useStateContext } from "../contexts/ContextProvider";
import SurveyListItem from "../components/SurveyListItem";
import TButton from "../components/core/TButton";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import axiosClient from "../axios";
import PaginationLinks from "../components/PaginationLinks";

export default function Surveys() {
  // const { surveys } = useStateContext();
  const [surveys, setSurveys] = useState([]);
  const [meta, setMeta] = useState({});
  const [links, setLinks] = useState({});
  const [loading, setLoading] = useState(false);

  const onDeleteClick = () => {
    console.log("on delete click");
  };

  const onPageClick = (url) => {
    getSurveys(url);
  };

  const getSurveys = (url) => {
    url = url || "/survey";
    setLoading(true);
    axiosClient.get(url).then(({ data }) => {
      setSurveys(data.data);
      setMeta(data.meta);
      setLinks(data.links);
      setLoading(false);
    });
  };

  useEffect(() => {
    getSurveys();
  }, []);

  const buttons = (
    <TButton color="green" to="/surveys/create">
      <PlusCircleIcon className="h-6 w-6 mr-2"></PlusCircleIcon>
      Create New
    </TButton>
  );

  return (
    <PageComponent title="Surveys" buttons={buttons}>
      {loading && <div className="text-center text-lg">Loading...</div>}

      {!loading && (
        <div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {surveys.map((survey) => (
              <SurveyListItem
                survey={survey}
                key={survey.id}
                onDeleteClick={onDeleteClick}
              ></SurveyListItem>
            ))}
          </div>
          {meta.links && (
            <PaginationLinks
              meta={meta}
              links={links}
              onPageClick={onPageClick}
            ></PaginationLinks>
          )}
        </div>
      )}
    </PageComponent>
  );
}
