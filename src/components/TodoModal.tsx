import { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Button from "./Button";
import { addTodo, updateTodo } from "../redux/todoSlice";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-hot-toast";
import { useAppDispatch } from "../app/hooks";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

type Props = {
    type: "Add" | "Update";
    modalOpen: boolean;
    setModalOpen: (modalOpen: boolean) => void;
    PropId?: string;
    PropTitle?: string | undefined;
    PropStatus?: "incomplete" | "complete";
};

const dropIn = {
    hidden: {
        opacity: 0,
        transform: "scale(0.9)",
    },
    visible: {
        transform: "scale(1)",
        opacity: 1,
        transition: {
            duration: 0.1,
            type: "spring",
            damping: 25,
            stiffness: 500,
        },
    },
    exit: {
        transform: "scale(0.9)",
        opacity: 0,
    },
};

function TodoModal({
    type,
    modalOpen,
    setModalOpen,
    PropId = "",
    PropTitle = "",
    PropStatus = "incomplete",
}: Props) {
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState<"incomplete" | "complete">(
        "incomplete",
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        setTitle(PropTitle);
        setStatus(PropStatus);
    }, [PropTitle, PropStatus]);

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (title && status) {
            if (type === "Add") {
                dispatch(
                    addTodo({
                        id: uuidv4(),
                        title,
                        status,
                        createAt: new Date().toLocaleString(),
                    }),
                );
                toast.success("Task Added Successfully");
                setTitle("");
                setStatus("incomplete");
            } else {
                if (title !== PropTitle || status !== PropStatus) {
                    dispatch(
                        updateTodo({
                            id: PropId,
                            title,
                            status,
                        }),
                    );
                    toast.success("Task Updated Successfully");
                } else {
                    toast.error("No Changes Made");
                    return;
                }
            }
            setModalOpen(false);
        } else {
            toast.error("Title shouldn't be Empty");
        }
    };

    return (
        <AnimatePresence>
            {modalOpen && (
                <motion.div
                    className="fixed inset-0 flex items-center justify-center bg-gray-400 bg-opacity-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="relative w-3/4 md:w-1/3"
                        variants={dropIn}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <motion.div
                            className=" absolute -top-10 right-0 z-50 cursor-pointer bg-white p-2 hover:bg-red-500"
                            onClick={() => setModalOpen(false)}
                            initial={{ top: 40, opacity: 0 }}
                            animate={{ top: -40, opacity: 1 }}
                            exit={{ top: 40, opacity: 0 }}
                        >
                            <AiOutlineClose />
                        </motion.div>
                        <form className="z-50 rounded  bg-gray-100 p-4 shadow-lg">
                            <h1 className="mb-4 text-xl font-semibold text-gray-500">
                                {type} Todo
                            </h1>
                            <div className="mb-4">
                                <label
                                    htmlFor="title"
                                    className="mb-2 block text-sm font-bold text-gray-700"
                                >
                                    Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="focus:shadow-outline w-full rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
                                />
                            </div>
                            <div className="mb-6">
                                <label
                                    htmlFor="status"
                                    className="mb-2 block text-sm font-bold text-gray-700"
                                >
                                    Status
                                </label>
                                <select
                                    name="status"
                                    id="status"
                                    value={status}
                                    onChange={(e) =>
                                        setStatus(
                                            e.target.value as
                                                | "incomplete"
                                                | "complete",
                                        )
                                    }
                                    className="focus:shadow-outline w-full rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
                                >
                                    <option value="incomplete">
                                        Incomplete
                                    </option>
                                    <option value="complete">Complete</option>
                                </select>
                            </div>
                            <div className=" mb-4 flex gap-2">
                                <Button
                                    type="submit"
                                    onClick={(e) => handleSubmit(e)}
                                >
                                    {`${type} Task`}
                                </Button>
                                <Button
                                    variant="secondary"
                                    onClick={() => setModalOpen(false)}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default TodoModal;
