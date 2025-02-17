import React, { useEffect, useState } from "react";
import PageComponent from "../../components/PageComponent";
import axiosClient from "../../axios";
import { Button, Card, Spinner } from "flowbite-react";
import PaginationLinks from "../../components/PaginationLinks";

export default function SurveyPublicList() {
  const [surveyPublics, setSurveyPublics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState({});
  const [links, setLinks] = useState({});

  useEffect(() => {
    getSurveyPublics();
  }, []);

  const onPageClick = (url) => {
    getSurveyPublics(url);
  };

  const getSurveyPublics = (url) => {
    url = url || "/get-survey-public";

    setLoading(true);
    axiosClient
      .get(url)
      .then(({ data }) => {
        setSurveyPublics(data.data);
        setMeta(data.meta);
        setLinks(data.links);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <PageComponent title={"Surveys Public"}>
      {loading && (
        <div className="text-center text-lg text-medium my-32">
          Loading data... <Spinner color="warning"></Spinner>
        </div>
      )}
      {!loading && (
        <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md overflow-x-auto">
          <div className="flex flex-wrap gap-2">
            {surveyPublics &&
              surveyPublics.map((survey, index) => {
                return (
                  <Card
                    key={`survey-public-${index}`}
                    className="max-w-[100%] sm:max-w-[30%]"
                    imgAlt="Meaningful alt text for an image that is not purely decorative"
                    imgSrc={survey.img_url}
                  >
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {survey.title}
                    </h5>
                    <div className="italic text-sm">{survey.expire_date}</div>
                    <p className="font-normal text-gray-700 dark:text-gray-400 truncate">
                      {survey.description}
                    </p>
                    <div>
                      <Button
                        onClick={() => {
                          window.open(
                            `/survey/public/${survey.slug}`,
                            "_blank"
                          );
                        }}
                        color="green"
                      >
                        Answer Survey
                      </Button>
                    </div>
                  </Card>
                );
              })}
          </div>
        </div>
      )}
      {meta.links && (
        <PaginationLinks
          meta={meta}
          links={links}
          onPageClick={onPageClick}
        ></PaginationLinks>
      )}
    </PageComponent>
  );
}
