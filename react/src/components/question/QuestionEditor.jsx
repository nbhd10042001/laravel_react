import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import { useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";

export default function QuestionEditor({
  index = 0,
  question,
  addQuestion,
  deleteQuestion,
  questionChange,
}) {
  const [model, setModel] = useState({ ...question });
  const { questionTypes } = useStateContext();

  useEffect(() => {
    questionChange(model);
  }, [model]);

  // upper case first word every item in questionTypes
  function upperCaseFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // return true if type is select/radio/checkbox
  function shouldHaveOptions(type = null) {
    // if param null, then get type from model
    type = type || model.type;
    return ["select", "radio", "checkbox"].includes(type);
  }

  function onTypeChange(ev) {
    const newModel = {
      ...model,
      type: ev.target.value,
    };
    // nếu model.type trước đó không thuộc type haveOptions
    // và value của thẻ select thuộc type haveOptions
    if (!shouldHaveOptions(model.type) && shouldHaveOptions(ev.target.value)) {
      // nếu model chưa có options thì tạo mới options cho modelmodel
      if (!model.data.options) {
        newModel.data = {
          // uuid: là mã định danh duy nhất
          options: [{ uuid: uuidv4(), text: "" }],
        };
      }
    }
    setModel(newModel);
  }

  // thêm 1 phần tử mới vào options của model
  function addOption() {
    model.data.options.push({
      uuid: uuidv4(),
      text: "",
    });
    setModel({ ...model });
  }

  function deleteOption(op) {
    model.data.options = model.data.options.filter(
      (option) => option.uuid != op.uuid
    );
    setModel({ ...model });
  }

  return (
    <>
      <div>
        <div className="flex justify-between mb-3">
          <h4>
            {index + 1}. {model.question}
          </h4>
          <div className="flex items-center">
            <button
              type="button"
              className="flex items-center text-xs py-1 px-3 mr-2 rounded-sm
                text-white bg-gray-600 hover:bg-gray-700"
              onClick={() => addQuestion(index + 1)}
            >
              <PlusIcon className="w-4" />
              add
            </button>
            <button
              type="button"
              className=" flex items-center text-xs py-1 px-3 rounded-sm 
                border border-transparent text-red-500 hover:border-red-600 font-semibold"
              onClick={() => deleteQuestion(question)}
            >
              <TrashIcon className="w-4" />
              Delete
            </button>
          </div>
        </div>
        <div className="flex gap-3 justify-between mb-3">
          {/* Question Text */}
          <div className="flex-1">
            <label
              htmlFor={`question_${index}`}
              className="block text-sm font-medium text-gray-700"
            >
              Question
            </label>
            <input
              type="text"
              name="question"
              id={`question_${index}`}
              value={model.question}
              onChange={(ev) => {
                setModel({ ...model, question: ev.target.value });
                // when input question change, then remove border red
                ev.target.classList.remove(["border-red-500"]);
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          {/* Question Text */}

          {/* Question Type */}
          <div>
            <label
              htmlFor={`questionType_${index}`}
              className="block text-sm font-medium text-gray-700 w-40"
            >
              Question Type
            </label>
            <select
              id={`questionType_${index}`}
              name="questionType"
              value={model.type}
              onChange={onTypeChange}
              className="mt-1 block w-full rounded-md border border-gray-300 
                bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            >
              {questionTypes.map((type, index) => (
                <option value={type} key={index}>
                  {upperCaseFirst(type)}
                </option>
              ))}
            </select>
          </div>
          {/* Question Type */}
        </div>

        {/*Description*/}
        <div className="mb-3">
          <label
            htmlFor={`questionDescription_${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            name="questionDescription"
            id={`questionDescription_${index}`}
            value={model.description || ""}
            onChange={(ev) =>
              setModel({ ...model, description: ev.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          ></textarea>
        </div>
        {/*Description*/}

        {/* Require? */}
        <div>
          <input
            name="isRequire"
            id={`isRequire_${index}`}
            type="checkbox"
            checked={model.is_require}
            onChange={(ev) =>
              setModel({ ...model, is_require: ev.target.checked })
            }
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 
                    focus:ring-indigo-500 mr-4"
          ></input>
          <label
            htmlFor={`isRequire_${index}`}
            className="text-sm font-medium text-gray-700"
          >
            Required to fill?
          </label>
        </div>

        {/* Options */}
        <div>
          {shouldHaveOptions() && (
            <div>
              <h4 className="text-sm font-semibold mb-1 flex justify-between items-center ">
                Options
                <button
                  onClick={addOption}
                  type="button"
                  className="flex items-center text-xs py-1 px-2 rounded-sm text-white 
                    bg-gray-600 hover:bg-gray-700"
                >
                  Add
                </button>
              </h4>

              {model.data.options.length === 0 && (
                <div className="text-xs text-gray-600 text-center py-3">
                  You don't have any options defined
                </div>
              )}
              {model.data.options.length > 0 && (
                <div>
                  {model.data.options.map((op, ind) => (
                    <div
                      key={`op_${op.uuid}`}
                      className="flex items-center mb-1"
                    >
                      <span className="w-6 text-sm">{ind + 1}.</span>
                      <input
                        type="text"
                        value={op.text}
                        onInput={(ev) => {
                          op.text = ev.target.value;
                          setModel({ ...model });
                        }}
                        className="w-full rounded-sm py-1 px-2 text-xs border border-gray-300 
                            focus:border-indigo-500"
                      />
                      <button
                        onClick={(ev) => deleteOption(op)}
                        type="button"
                        className="h-6 w-6 rounded-full flex items-center justify-center border border-transparent 
                            transition-colors hover:border-red-100"
                      >
                        <TrashIcon className="w-3 h-3 text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <hr />
    </>
  );
}
