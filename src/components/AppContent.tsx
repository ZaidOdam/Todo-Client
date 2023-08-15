import { useAppSelector } from "../app/hooks";
import TodoItem from "./TodoItem";
import { AnimatePresence, motion } from "framer-motion";

const container = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const child = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
    },
};

function AppContent() {
    const todoList = useAppSelector((state) => state.todo.todoList);
    const filterStatus = useAppSelector((state) => state.todo.filterStatus);

    const sortedTodoList = [...todoList];
    sortedTodoList.sort(
        (a, b) =>
            new Date(b.createAt).getTime() - new Date(a.createAt).getTime(),
    );

    const filteredTodoList = sortedTodoList.filter((todo) => {
        if (filterStatus == "all") {
            return true;
        }
        return todo.status === filterStatus;
    });

    return (
        <motion.div variants={container} initial="hidden" animate="visible">
            <AnimatePresence>
                {filteredTodoList && filteredTodoList.length > 0 ? (
                    filteredTodoList.map((todo) => (
                        <TodoItem key={todo.id} todo={todo} />
                    ))
                ) : (
                    <motion.div
                        className="mt-10 flex items-center justify-center bg-gray-200 px-4 py-1 text-xl font-bold text-gray-700"
                        variants={child}
                    >
                        No Todo Found
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default AppContent;
