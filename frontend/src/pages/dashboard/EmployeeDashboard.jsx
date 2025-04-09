import React, { useContext, useEffect, useState } from "react";
import DashboardNav from "../../components/dashboard/DashboardNav";
import TaskCard from "../../components/dashboard/TaskCard.jsx";
import DescCard from "../../components/dashboard/DescCard.jsx";
import { AuthContext } from "../../context/Authcontext/AuthContext.js";
import { TaskContext } from "../../context/TaskContext/TaskContext.js";
import { ClipLoader } from "react-spinners";

const EmployeeDashboard = () => {
  const { user } = useContext(AuthContext);
  const { token } = useContext(AuthContext);
  const [complete, setComplete] = useState(false);
  const [failed, setFailed] = useState(false);
  const { task, getData } = useContext(TaskContext);
  const [loading, setLoading] = useState(true);
  const completeTask = task.filter((task) => task.completeTask == true);
  const failedTask = task.filter((task) => task.failedTask == true);
  const nullTask = task.filter(
    (task) => task.failedTask == null && task.completeTask == null
  );
  const acceptedTask = task.filter(
    (task) => (task.failedTask && task.failedTask == true) || false
  );

  useEffect(() => {
    getData(token);
    if (task) {
      setLoading(false);
    }
    setComplete(false);
    setFailed(false);
  }, [complete, failed, token]);

  return (
    <div className="w-full h-full  px-9">
      <DashboardNav name={user} />

      <div className="flex justify-between w-full h-full mt-8 ">
        <TaskCard
          title="New Task"
          totalTask={nullTask.length}
          state={loading}
        />
        <TaskCard
          title="Completed Task"
          totalTask={completeTask.length}
          state={loading}
        />
        <TaskCard
          title="Accepted Task"
          totalTask={acceptedTask.length}
          state={loading}
        />
        <TaskCard
          title="Failed Task"
          totalTask={failedTask.length}
          state={loading}
        />
      </div>

      <div className="flex flex-shrink-0 w-full space-x-7  ">
        {loading ? (
          <div className="h-96 mb-7 mt-16 w-96 bg-pink-700 rounded-lg flex justify-center items-center">
            <ClipLoader />
          </div>
        ) : (
          <>
            {" "}
            {task.length > 0
              ? task.map((task) => (
                  <DescCard
                    key={task._id}
                    value={{ task, id: task._id }}
                    state={loading}
                    complete={setComplete}
                    failed={setFailed}
                  />
                ))
              : "No data"}
          </>
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;