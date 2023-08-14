import { useAppSelector } from "../app/hooks";
import TodoItem from "./TodoItem";

function AppContent() {
  const todoList = useAppSelector((state) => state.todo);

  const sortedTodoList = [...todoList];
  sortedTodoList.sort(
    (a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
  );

  return (
    <div>
      {sortedTodoList.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}

export default AppContent;
