import React from "react";
import { ClipLoader } from "react-spinners";

const TaskCard = ({title , totalTask,state}) => {
  
  return (
    !title && !totalTask && state ? (
      <div className="h-44 w-[20%] bg-pink-700 rounded-lg flex items-center justify-center">
        <ClipLoader/>
        </div>
  ):
    <div className="h-44 w-[20%] bg-pink-700 rounded-lg py-4 px-8 text-[25px] font-medium text-white">
      <span>{totalTask}</span>
      <br></br>
  <span>{title}</span>
    </div>
  );
};

export default TaskCard;
