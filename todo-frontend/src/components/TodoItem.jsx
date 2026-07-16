import { useState } from "react";
import "./TodoItem.css";

function TodoItem({
  todo,
  toggleTodo,
  editTodo,
}) {
  const [isEditing, setIsEditing] =
    useState(false);

  const [editedTitle, setEditedTitle] =
    useState(todo.title);

  async function saveEdit() {
    if (editedTitle.trim() === "") {
      return;
    }

    await editTodo(todo, editedTitle);
    setIsEditing(false);
  }

  function cancelEdit() {
    setEditedTitle(todo.title);
    setIsEditing(false);
  }

  return (
    <>
      <div className="todo-left">
        <input
          className="todo-checkbox"
          type="checkbox"
          checked={todo.isComplete}
          onClick={(event) =>
            event.stopPropagation()
          }
          onChange={() => toggleTodo(todo)}
        />

        {isEditing ? (
          <input
            className="todo-edit-input"
            value={editedTitle}
            autoFocus
            onClick={(event) =>
              event.stopPropagation()
            }
            onChange={(event) =>
              setEditedTitle(event.target.value)
            }
            onKeyDown={(event) => {
              event.stopPropagation();

              if (event.key === "Enter") {
                saveEdit();
              }

              if (event.key === "Escape") {
                cancelEdit();
              }
            }}
          />
        ) : (
          <span
            className={
              todo.isComplete
                ? "todo-title completed"
                : "todo-title"
            }
          >
            {todo.title}
          </span>
        )}
      </div>

      {isEditing ? (
        <div className="edit-actions">
          <button
            className="save-edit-button"
            onClick={(event) => {
              event.stopPropagation();
              saveEdit();
            }}
          >
            Save
          </button>

          <button
            className="cancel-edit-button"
            onClick={(event) => {
              event.stopPropagation();
              cancelEdit();
            }}
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          className="edit-button"
          onClick={(event) => {
            event.stopPropagation();
            setIsEditing(true);
          }}
        >
          Edit
        </button>
      )}
    </>
  );
}

export default TodoItem;