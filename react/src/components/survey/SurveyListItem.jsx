import React from "react";
import TButton from "../core/TButton";
import {
  PencilIcon,
  TrashIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/solid";

export default function SurveyListItem({ survey, onDeleteClick }) {
  return (
    <>
      <div id={`survey_${survey.id}`} className="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[470px]">
        <img
          src={survey.img_url}
          alt={survey.title}
          className="w-full h-48 object-cover"
        />
        <h4 className="mt-4 text-lg font-bold">{survey.title}</h4>
        <div
          dangerouslySetInnerHTML={{ __html: survey.description }}
          className="overflow-hidden flex-1"
        ></div>

        <div className="flex justify-between items-center mt-3">
          <TButton to={`/admin/surveys/${survey.id}`}>
            <PencilIcon className="w-5 h-5 mr-2"></PencilIcon>
            Edit
          </TButton>
          <div className="flex items-center">
            <TButton href={`/survey/public/${survey.slug}`} circle link>
              <ArrowTopRightOnSquareIcon className="w-5 h-5"></ArrowTopRightOnSquareIcon>
            </TButton>

            {survey.id && (
              <TButton onClick={(ev) => onDeleteClick(survey.id)} circle link color="red">
                <TrashIcon className="w-5 h-5"></TrashIcon>
              </TButton>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
