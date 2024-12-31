import React, { useEffect, useState } from "react";
import PageComponent from "../../components/PageComponent";
import { useStateContext } from "../../contexts/ContextProvider";
import SurveyListItem from "../../components/survey/SurveyListItem";
import TButton from "../../components/core/TButton";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import axiosClient from "../../axios";
import PaginationLinks from "../../components/PaginationLinks";
import router from "../../router";

export default function Surveys() {
  const { showToast } = useStateContext();
  const [surveys, setSurveys] = useState([]);
  const [meta, setMeta] = useState({});
  const [links, setLinks] = useState({});
  const [loading, setLoading] = useState(false);

  const onDeleteClick = (id) => {
    if (window.confirm("Are you sure you want to delete this survey?")) {
      axiosClient.delete(`/survey/${id}`).then(() => {
        // router.navigate('/surveys');
        // const element = document.getElementById(`survey_${id}`)
        // element.remove();
        getSurveys();
        showToast("The survey was deleted!", 'danger');
      });
    }
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
          {surveys.length === 0 && (
              <div className="text-center text-lg text-gray-700 py-8">
                You don't have any surveys created
              </div>
            )}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {surveys.map((survey, index) => (
              <SurveyListItem
                survey={survey}
                key={`survey_${survey.id}`}
                onDeleteClick={onDeleteClick}
              ></SurveyListItem>
            ))}
          </div>
          {surveys.length > 0 && meta.links && (
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
