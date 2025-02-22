import React, { useEffect, useState } from "react";
import PageComponent from "../../components/PageComponent.jsx";
import { LinkIcon, PhotoIcon, TrashIcon } from "@heroicons/react/24/solid";
import axiosClient from "../../axios.js";
import TButton from "../../components/core/TButton.jsx";
import { useParams } from "react-router-dom";
import SurveyQuestions from "../../components/survey/SurveyQuestions.jsx";
import { useStateContext } from "../../contexts/ContextProvider.jsx";

export default function SurveyView() {
  const { showToast, navigateR } = useStateContext();
  const { id } = useParams();
  const [errorQuestions, setErrorQuestions] = useState("");
  const [errorExpireDate, setErrorExpireDate] = useState("");
  const [errorTitle, setErrorTitle] = useState("");
  const [errorTitleQuestion, setErrorTitleQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [survey, setSurvey] = useState({
    title: "",
    slug: "",
    status: false,
    description: "",
    image: null,
    image_url: null,
    expire_date: "",
    questions: [],
  });

  const onImageChoose = (ev) => {
    const file = ev.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setSurvey({
        ...survey,
        image: file,
        image_url: reader.result,
      });
      ev.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    const payload = { ...survey };
    if (payload.image) {
      payload.image = payload.image_url;
    }
    delete payload.image_url;

    let response = null;
    if (id) {
      // put(param1, param2)
      // param1: route + id, then laravel will auto find survey with id provide
      // param2: data update of survey
      response = axiosClient.put(`/survey/${id}`, payload);
    } else {
      // if id not exist, then create new survey
      response = axiosClient.post("/survey", payload);
    }

    response
      .then((res) => {
        navigateR("/admin/surveys");
        if (id) {
          showToast("The survey was updated!", "success");
        } else {
          showToast("The survey was created!", "success");
        }
      })
      .catch((err) => {
        if(err.response.data.message){
          showToast(err.response.data.message, "danger");
        }
        // check response if error, then show error on form
        if (err.response.data.errors) {
          const errors = err.response.data.errors;
          if (errors["title"]) {
            setErrorTitle(errors["title"]);
          }
          if (errors["expire_date"]) {
            setErrorExpireDate(errors["expire_date"]);
          }
          if (errors["questions"]) {
            setErrorQuestions(errors["questions"]);
          }
          // error 422 (custom in SurveyController)
          //when question has not title and add border red
          if (errors["message"]) {
            setErrorTitleQuestion(errors["message"]);
            renderRedBorderTitleQuestion(errors["id"]);
          }
        }
      });
  };

  function renderRedBorderTitleQuestion(id) {
    let element = document.querySelector(`#question_${id}`);
    element.classList.add("border-red-500");
  }

  function onQuestionsUpdate(questions) {
    // when questions onChange, then delete message error question title field
    setErrorTitleQuestion("");
    // if have questions, delete message error questions field
    if (questions.length > 0) {
      setErrorQuestions("");
    }
    setSurvey({
      ...survey, // clone survey
      questions, // update questions in survey
    });
  }

  useEffect(() => {
    if (id) {
      setLoading(true);
      axiosClient.get(`/survey/${id}`).then(({ data }) => {
        setSurvey(data.data);
        setLoading(false);
      })
      .catch(error => {
        navigateR(window.location.pathname, true, {
          code: error.response.status,
          mess: error.response.statusText,
        });
      });
    }
  }, []);

  const onClickDelete = () => {

  }

  const buttons = (
    <div className="flex flex-row gap-2">
      <TButton color="indigo" href={`/survey/public/${survey.slug}`}>
        <LinkIcon className="h-6 w-6 mr-2"></LinkIcon>
        Public Link
      </TButton>
      <TButton color="red" onClick={onClickDelete}>
        <TrashIcon className="h-6 w-6 mr-2"></TrashIcon>
        Delete
      </TButton>
    </div>
  );

  return (
    <PageComponent
      buttons={buttons}
      title={id ? "Update Survey" : "Create new Survey"}
    >
      {loading && <div className="text-center text-lg">Loading...</div>}
      {!loading && (
        <form action="#" method="POST" onSubmit={onSubmit}>
          <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
              {/* Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Photo
                </label>

                <div className="mt-1 flex items-center">
                  {survey.img_url && (
                    <img
                      src={survey.img_url}
                      className="w-32 h-32 object-cover"
                    />
                  )}
                  {!survey.img_url && (
                    <span
                      className="flex justify-center items-center text-gray-400 h-12 w-12
                                overflow-hidden rounded-full bg-gray-100"
                    >
                      <PhotoIcon className="w-8 h-8"></PhotoIcon>
                    </span>
                  )}

                  <button
                    type="button"
                    className="relative ml-5 rounded-md border border-gray-300 bg-white py-2 px-3
                    text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <input
                      type="file"
                      className="absolute left-0 top-0 right-0 bottom-0 opacity-0"
                      onChange={onImageChoose}
                    />
                    Change
                  </button>
                </div>
              </div>
              {/* Image */}

              {/* Title */}
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Survey Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={survey.title}
                  onChange={(ev) => {
                    setSurvey({ ...survey, title: ev.target.value });
                    setErrorTitle("");
                  }}
                  placeholder="Survey Title"
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                    focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm 
                    ${errorTitle ? "border-red-500" : ""}`}
                />
              </div>
              <small className="text-red-500">
                <i>{errorTitle}</i>
              </small>
              {/* Title */}

              {/*Description*/}
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                {/* <pre>{ JSON.stringify(survey, undefined, 2) }</pre> */}
                <textarea
                  name="description"
                  id="description"
                  value={survey.description || ""}
                  onChange={(ev) => {
                    setSurvey({ ...survey, description: ev.target.value });
                  }}
                  placeholder="Describe your survey"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                    focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  rows={5}
                ></textarea>
              </div>
              {/*Description*/}

              {/*Expire Date*/}
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="expire_date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Expire Date
                </label>
                <input
                  type="date"
                  name="expire_date"
                  id="expire_date"
                  value={survey.expire_date}
                  onChange={(ev) => {
                    setSurvey({ ...survey, expire_date: ev.target.value });
                    setErrorExpireDate("");
                  }}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                    focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm 
                    ${errorExpireDate ? "border-red-500" : ""}`}
                />
              </div>
              <small className="text-red-500">
                <i>{errorExpireDate}</i>
              </small>
              {/*Expire Date*/}

              {/*Active*/}
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="status"
                    name="status"
                    type="checkbox"
                    checked={survey.status}
                    onChange={(ev) =>
                      setSurvey({ ...survey, status: ev.target.checked })
                    }
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 
                    focus:ring-indigo-500 {}"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label className="font-medium text-gray-700">Active</label>
                  <p className="text-gray-500">
                    Whether to make survey publicly available
                  </p>
                </div>
              </div>
              {/*Active*/}

              {/* import component SurveyQuestions*/}
              <div>
                <small className="text-red-500">
                  <i>{errorQuestions ? errorQuestions : errorTitleQuestion}</i>
                </small>
              </div>
              {/* Load/Update questions */}
              <SurveyQuestions
                questions={survey.questions}
                onQuestionsUpdate={onQuestionsUpdate}
              ></SurveyQuestions>
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
