import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import {
  addMessage,
  getMessages,
  updateMessage,
  deleteMessage,
} from "../../store/index";
import Footer from "./Footer";

const Index = () => {
  const [task, setTask] = useState("");
  const messages = useSelector((state) => state.app.messages);
  const dispatch = useDispatch();

  const addNewTodo = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    dispatch(addMessage(data));
  };

  const updateTodo = async (event, msg) => {
    event.preventDefault();
    dispatch(updateMessage(msg.id));
  };

  const deleteTodo = async (event, msg) => {
    event.preventDefault();
    dispatch(deleteMessage(msg.id));
  };

  useEffect(() => {
    dispatch(getMessages());
  }, []);

  return (
    <>
      <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-10">
        <div className="text-center border-b border-gray-400 mb-10">
          <div className="inline-block text-white">
            <div className="flex items-center justify-center align-center my-10">
              <img
                className="h-14 rounded-full mr-4"
                src="todo-app.png"
                alt="Golem Logo"
              />
              <h1 className="text-3xl uppercase font-bold">
                ToDo{" "}
                <span className="font-light -ml-2 text-gray-300">List</span>
              </h1>
            </div>
            <div className="flex justify-center align-center my-10">
              <div className="md:w-1/2">
                <p className="block text-normal text-gray-300">
                  The ToDo list app is a demo showcasing the capability of
                  running a simple app with a backend, frontend and a database
                  on the Golem Network. The purpose of this app is to
                  demonstrate the possibility of running these services on the
                  network.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <form
              onSubmit={(e) => {
                addNewTodo(e);
                setTask("");
              }}
            >
              <div>
                <p className="text-xs text-yellow-600 mt-1 rounded-md">
                  Please be aware that data inside this app is not persisted,
                  and will be lost at the end of the demo!
                </p>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="text"
                    required
                    value={task}
                    onChange={(event) => setTask(event.target.value)}
                    placeholder="Type your task"
                    className="px-6 text-lg py-4 block w-full rounded-none rounded-l-md bg-input text-white placeholder:text-gray-300"
                  />

                  <button
                    type="submit"
                    className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md text-white text-lg bg-button px-8 md:px-24 py-2 "
                  >
                    Add
                  </button>
                </div>
              </div>

              <div>
                <input type="hidden" value="NEW" name="status" />
              </div>
            </form>
          </div>
          <div className="grid grid-cols-12 mt-20 gap-x-8 md:gap-x-0 gap-y-10">
            {messages.map((message) => (
              <>
                <div className="col-span-1">
                  <input
                    type="checkbox"
                    value=""
                    name="checked"
                    onChange={(event) => updateTodo(event, message)}
                    checked={message.status === "DONE"}
                    className="bg-white border border-gray-400 rounded w-6 h-6 text-black p-0 accent-checked"
                  />
                </div>
                <div className="col-span-7 break-words md:col-span-9 text-white">
                  <span
                    className={`${
                      message.status == "DONE" ? "line-through" : ""
                    }		text-base`}
                  >
                    {message.text}
                  </span>
                </div>
                <div className="col-span-1"></div>
                <div className="col-span-3 md:col-span-1 flex justify-end">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5 text-gray-500 border border-gray-500 cursor-pointer hover:text-red-500 hover:border-red-500"
                    onClick={(event) => deleteTodo(event, message)}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 12h-15"
                    />
                  </svg>

                  <form onSubmit={(event) => deleteTodo(event, message)}></form>
                </div>
              </>
            ))}
          </div>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
};

export default Index;
