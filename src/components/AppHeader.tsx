import { useState } from "react";
import Button, { SelectButton } from "./Button";
import TodoModal from "./TodoModal";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { updateFilterStatus } from "../redux/todoSlice";

function AppHeader() {
    const [modalOpen, setModalOpen] = useState(false);
    const filterStatus = useAppSelector((state) => state.todo.filterStatus);
    const dispatch = useAppDispatch();

    const updateFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log("update?");
        dispatch(
            updateFilterStatus(
                e.target.value as "all" | "complete" | "incomplete",
            ),
        );
    };
    return (
        <div className="mt-4 flex justify-between">
            <Button onClick={() => setModalOpen(true)}>Add Task</Button>
            <SelectButton value={filterStatus} onChange={updateFilter}>
                <option value="all">All</option>
                <option value="complete">Completed</option>
                <option value="incomplete">Incomplete</option>
            </SelectButton>
            <TodoModal
                type="Add"
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
            />
        </div>
    );
}

export default AppHeader;
