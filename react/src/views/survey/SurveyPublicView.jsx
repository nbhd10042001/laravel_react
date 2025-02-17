import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../axios";
import QuestionPublicView from "../question/QuestionPublicView";
import router from "../../router";
import { Button } from "flowbite-react";

export default function SurveyPublicView() {
  const [survey, setSurvey] = useState({});
  const [loading, setLoading] = useState(false);
  const { slug } = useParams();
  const [answers, setAnswers] = useState([]);
  const [surveyFinished, setSurveyFinished] = useState(false);
  const bodyRect = document.body.getBoundingClientRect();

  useEffect(() => {
    setLoading(true);
    axiosClient.get(`survey/get-by-slug/${slug}`).then(({ data }) => {
      setSurvey(data.data);
      setLoading(false);
      data.data.questions.map((question, index) => {
        answers[index] = {
          ques_id: question.id,
          is_require: question.is_require,
          value: null,
        };
      });
    });
  }, []);

  const onAnswerChanged = (question, value, index) => {
    answers[index] = {
      ques_id: question.id,
      is_require: question.is_require,
      value: value,
    };
    // console.log(question, value);
    // console.log(answers);
  };

  function onSubmit(ev) {
    ev.preventDefault();
    axiosClient
      .post(`/survey/${survey.id}/answer`, {
        answers,
      })
      .then((response) => {
        setSurveyFinished(true);
      })
      .catch((err) => {
        if (err.response.data.errors.message) {
          let id = err.response.data.errors.id;
          var message = err.response.data.errors.message;
          var element = document.getElementById(`err_ques_${id}`);
          element.innerHTML = message;
          // scroll to question error
          var elementRect = element.getBoundingClientRect();
          window.scrollTo(0, elementRect.top - bodyRect.top);
        }
      });
  }

  return (
    <>
      <div>
        {/* <pre>{JSON.stringify(survey, undefined, 2)}</pre> */}
        {loading && (
          <div className="flex justify-center text-lg">Loading...</div>
        )}
        {!loading && (
          <form
            onSubmit={(ev) => onSubmit(ev)}
            className="container mx-auto p-4 max-w-[64rem]"
          >
            <div className="md:grid md:grid-cols-5">
              <div className="max-w-[14rem] mb-10 mx-2">
                <img src={survey.img_url} alt="" />
              </div>
              <div className="md:col-span-2">
                <h1 className="text-3xl mb-3">{survey.title}</h1>
                <p className="text-gray-500 text-sm">
                  <i>Expire Date: {survey.expire_date}</i>
                </p>
                <p className="text-gray-500 text-md">
                  Description: {survey.description}
                </p>
              </div>
            </div>

            {/* Finish Survey */}
            {surveyFinished && (
              <div className="p-4 m-2 bg-gray-500 text-white text-center text-[20px]">
                Thank you for participating in the survey
                <div className="flex justify-center mt-4">
                  <Button
                    color="blue"
                    onClick={() => {
                      // window.location.href = "/";
                      window.close();
                    }}
                  >
                    Close Survey
                  </Button>
                </div>
              </div>
            )}

            {/* Load Questions */}
            {!surveyFinished && (
              <>
                <div>
                  <div></div>
                  {survey.questions &&
                    survey.questions.map((question, index) => {
                      return (
                        <QuestionPublicView
                          key={question.id}
                          question={question}
                          index={index}
                          answerChanged={(val) => {
                            onAnswerChanged(question, val, index);
                            document.getElementById(
                              `err_ques_${question.id}`
                            ).innerHTML = "";
                          }}
                        ></QuestionPublicView>
                      );
                    })}
                </div>
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent 
                  shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 
                  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit
                </button>
              </>
            )}
          </form>
        )}
      </div>
    </>
  );
}
