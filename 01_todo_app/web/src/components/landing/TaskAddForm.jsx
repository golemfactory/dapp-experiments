import { useState } from "react";
import { addTask } from "../../store/index";
import { useDispatch } from "react-redux";

const TaskAddForm = () => {
  const dispatch = useDispatch();
  const [task, setTask] = useState("");

  const addNewTodo = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    dispatch(addTask(data));
  };
  return (
    <form
      onSubmit={(e) => {
        addNewTodo(e);
        setTask("");
      }}
    >
      <div>
        <p className="text-xs text-yellow-600 mt-1 rounded-md">
          Please be aware that data inside this app is not persisted, and will
          be lost at the end of the demo!
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
            className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md text-white text-lg bg-button hover:bg-button/80 px-8 md:px-24 py-2 "
          >
            Add
          </button>
        </div>
      </div>

      <div>
        <input type="hidden" value="NEW" name="status" />
      </div>
    </form>
  );
};

export default TaskAddForm;
