import { format } from "date-fns";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { deleteTodo, type TodoState } from "../redux/todoSlice";
import { useAppDispatch } from "../app/hooks";
import { toast } from "react-hot-toast";
import { useState } from "react";
import TodoModal from "./TodoModal";

interface TodoItemProps {
    todo: TodoState;
}

function TodoItem({ todo }: TodoItemProps) {
    const { id, title, status, createAt } = todo;
    const [modalOpen, setModalOpen] = useState(false);
    const dispatch = useAppDispatch();
    const handleDelete = () => {
        dispatch(deleteTodo(id));
        toast.success("Task Deleted Successfully");
    };

    const handleUpdate = () => {
        setModalOpen(true);
    };

    return (
        <>
            <div className="my-4 flex w-full justify-between bg-slate-300 p-2">
                <div className="flex gap-2">
                    [ ]
                    <div>
                        <p
                            className={
                                status === "complete" ? "line-through" : ""
                            }
                        >
                            {title}
                        </p>
                        <p>{format(new Date(createAt), "MM/dd/yyyy,p")}</p>
                    </div>
                </div>
                <div className="flex gap-4 p-2">
                    <button
                        onClick={handleDelete}
                        className=" bg-slate-200 p-2 "
                    >
                        <AiFillDelete />
                    </button>
                    <button
                        onClick={handleUpdate}
                        className=" bg-slate-200 p-2 "
                    >
                        <AiFillEdit />
                    </button>
                </div>
            </div>
            <TodoModal
                type="Update"
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                PropId={id}
                PropTitle={title}
                PropStatus={status}
            />
        </>
    );
}

export default TodoItem;
