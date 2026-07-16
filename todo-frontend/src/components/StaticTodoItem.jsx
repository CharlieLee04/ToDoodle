import TodoItem from "./TodoItem";

function StaticTodoItem({
  todo,
  toggleTodo,
  editTodo,
}) {
  return (
    <li
      className="todo-card"
      onDoubleClick={() => toggleTodo(todo)}
    >
      <TodoItem
        todo={todo}
        toggleTodo={toggleTodo}
        editTodo={editTodo}
      />
    </li>
  );
}

export default StaticTodoItem;