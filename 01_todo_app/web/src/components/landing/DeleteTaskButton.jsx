import DeleteIcon from "./DeleteIcon"
import { deleteTask } from "../../store/index"
import { useDispatch } from "react-redux"

const DeleteTaskButton = ({ task }) => {
    const dispatch = useDispatch()
    const deleteTodo = async (event, msg) => {
        event.preventDefault()
        dispatch(deleteTask(msg.id))
    }
    return (
        <div onClick={(event) => deleteTodo(event, task)}>
            <DeleteIcon />
        </div>
    )
}

export default DeleteTaskButton
