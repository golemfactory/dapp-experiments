import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { getTasks } from "../../store/index";
import Footer from "./Footer";
import TaskAddForm from "./TaskAddForm";
import TaskListItem from "./TaskListItem";

const Index = () => {
  const tasks = useSelector((state) => state.app.tasks);
  const dispatch = useDispatch();
  console.log(tasks);
  useEffect(() => {
    dispatch(getTasks());
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-10">
      <div className="text-center border-b border-gray-400 mb-10">
        <div className="inline-block text-white">
          <div className="flex items-center justify-center align-center my-10">
            <img
              className="h-14 rounded-full mr-4"
              src="todo-app.png"
              alt="Golem Logo"
            />
            <h1 className="text-3xl uppercase font-bold">
              ToDo <span className="font-light -ml-2 text-gray-300">List</span>
            </h1>
          </div>
          <div className="flex justify-center align-center my-10">
            <div className="md:w-1/2">
              <p className="block text-normal text-gray-300">
                The ToDo list app is a demo showcasing the capability of running
                a simple app with a backend, frontend and a database on the
                Golem Network. The purpose of this app is to demonstrate the
                possibility of running these services on the network.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <TaskAddForm />
        </div>
        <div className="grid grid-cols-12 mt-20 gap-x-8 md:gap-x-0 gap-y-10">
          {tasks && tasks.map((task) => <TaskListItem task={task} />)}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
