import { PlusIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import QuestionEditor from "../question/QuestionEditor";

// define 2 props
export default function ({ questions, onQuestionsUpdate }) {
  const [myQuestions, setMyQuestions] = useState([...questions]);

  const addQuestion = (index) => {
    // if index undefined, then set index = length of myQuestions
    index = index !== undefined ? index : myQuestions.length;
    // add new element in myQuestions 
    myQuestions.splice(index, 0, {
      id: uuidv4(),
      type: "text",
      question: "",
      description: "",
      data: {},
      is_require: false,
    });

    setMyQuestions([...myQuestions]);
    onQuestionsUpdate(myQuestions);
  };

  const questionChange = (question) => {
    if (!question) return;
    const newQuestions = myQuestions.map((q) => {
      if (q.id == question.id) {
        return { ...question };
      }
      return q;
    });
    setMyQuestions(newQuestions);
    onQuestionsUpdate(newQuestions);
  };

  const deleteQuestion = (question) => {
    const newQuestions = myQuestions.filter((q) => q.id !== question.id);

    setMyQuestions(newQuestions);
    onQuestionsUpdate(newQuestions);
  };

  useEffect(() => {
    setMyQuestions(questions);
  }, [questions]);

  return (
    <>
      <div className="flex justify-between">
        <h3 className="text-2xl font-bold">Questions</h3>
        <button
          type="button"
          className="flex items-center text-sm py-1 px-4 rounded-sm text-white bg-gray-600 hover:bg-gray-700"
          onClick={() => addQuestion()}
        >
          <PlusIcon className="w-4 mr-2" />
          Add question
        </button>
      </div>
      
      {/* Load/Update questionEditors */}
      {myQuestions.length ? (
        myQuestions.map((q, ind) => (
          <QuestionEditor
            key={`ques_${q.id}`}
            index={ind}
            question={q}
            questionChange={questionChange}
            addQuestion={addQuestion}
            deleteQuestion={deleteQuestion}
          />
        ))
      ) : (
        <div className="text-gray-400 text-center py-4">
          You don't have any questions created
        </div>
      )}
    </>
  );
}
