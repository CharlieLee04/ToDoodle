import { Reorder } from "motion/react";
import DraggableTodoItem from "./DraggableTodoItem";
import StaticTodoItem from "./StaticTodoItem";
import "./TodoList.css";

function TodoList({
  todos,
  toggleTodo,
  deleteTodo,
  editTodo,
  onReorder,
  onReorderComplete,
  canReorder,
  setIsDragging,
  setIsDeleteZoneActive,
}) {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <p>No todos found.</p>
        <span>Try adding a todo or changing your filters.</span>
      </div>
    );
  }

  if (!canReorder) {
    return (
      <ul className="todo-list">
        {todos.map((todo) => (
          <StaticTodoItem
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>
    );
  }

  return (
    <Reorder.Group
      axis="y"
      values={todos}
      onReorder={onReorder}
      as="ul"
      className="todo-list"
    >
      {todos.map((todo) => (
        <DraggableTodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
          onReorderComplete={onReorderComplete}
          setIsDragging={setIsDragging}
          setIsDeleteZoneActive={setIsDeleteZoneActive}
        />
      ))}
    </Reorder.Group>
  );
}

export default TodoList;