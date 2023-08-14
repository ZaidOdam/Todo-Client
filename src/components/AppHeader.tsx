import { useState } from "react";
import Button, { SelectButton } from "./Button";
import TodoModal from "./TodoModal";

function AppHeader() {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <div className="mt-4 flex justify-between">
            <Button onClick={() => setModalOpen(true)}>Add Task</Button>
            <SelectButton>
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
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
