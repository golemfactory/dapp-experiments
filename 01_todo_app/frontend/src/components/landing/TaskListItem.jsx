import { updateTask } from "../../store/index";
import { useDispatch } from "react-redux";
import DeleteTaskButton from "./DeleteTaskButton";

const TaskListItem = ({ task }) => {
  const dispatch = useDispatch();

  const updateTodo = async (event, msg) => {
    event.preventDefault();
    dispatch(updateTask(msg.id));
  };
  return (
    <>
      <div className="col-span-1">
        <input
          type="checkbox"
          value=""
          name="checked"
          onChange={(event) => updateTodo(event, task)}
          checked={task.status === "DONE"}
          className="bg-white border border-gray-400 rounded w-6 h-6 text-black p-0 accent-checked"
        />
      </div>
      <div className="col-span-7 break-words md:col-span-9 text-white">
        <span
          className={`${task.status == "DONE" ? "line-through" : ""}		text-base`}
        >
          {task.text}
        </span>
      </div>
      <div className="col-span-1"></div>
      <div className="col-span-3 md:col-span-1 flex justify-end">
        <DeleteTaskButton task={task} />
      </div>
    </>
  );
};
export default TaskListItem;
