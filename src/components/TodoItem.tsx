import { format } from "date-fns";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { deleteTodo, updateTodo, type TodoState } from "../redux/todoSlice";
import { useAppDispatch } from "../app/hooks";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import TodoModal from "./TodoModal";
import CheckButton from "./CheckButton";
import { motion } from "framer-motion";

interface TodoItemProps {
    todo: TodoState;
}

const child = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
    },
};

function TodoItem({ todo }: TodoItemProps) {
    const { id, title, status, createAt } = todo;
    const [modalOpen, setModalOpen] = useState(false);
    const [checked, setChecked] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (status === "complete") {
            setChecked(true);
        } else {
            setChecked(false);
        }
    }, [status]);

    const handleDelete = () => {
        dispatch(deleteTodo(id));
        toast.success("Task Deleted Successfully");
    };

    const handleUpdate = () => {
        setModalOpen(true);
    };

    const handleCheck = () => {
        setChecked(!checked);
        dispatch(
            updateTodo({
                id: id,
                title,
                status: checked ? "incomplete" : "complete",
            }),
        );
    };

    return (
        <>
            <motion.div
                className="my-4 flex w-full justify-between bg-slate-300 p-2"
                variants={child}
            >
                <div className="flex gap-4">
                    <CheckButton checked={checked} handleCheck={handleCheck} />
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
            </motion.div>
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
