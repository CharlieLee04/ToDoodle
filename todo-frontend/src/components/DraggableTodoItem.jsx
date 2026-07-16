import { Reorder } from "motion/react";
import { useState } from "react";
import TodoItem from "./TodoItem";

const DELETE_THRESHOLD = 180;

function DraggableTodoItem({
  todo,
  toggleTodo,
  deleteTodo,
  editTodo,
  onReorderComplete,
  setIsDragging,
  setIsDeleteZoneActive,
}) {
  const [isOverDeleteZone, setIsOverDeleteZone] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  function handleDragStart() {
    setIsDragging(true);
  }

  function handleDrag(event, info) {
    const enteredDeleteZone =
      info.offset.x > DELETE_THRESHOLD;

    if (enteredDeleteZone !== isOverDeleteZone) {
      setIsOverDeleteZone(enteredDeleteZone);
      setIsDeleteZoneActive(enteredDeleteZone);
    }
  }

  function handleDragEnd() {
    setIsDragging(false);
    setIsDeleteZoneActive(false);

    if (isOverDeleteZone) {
      setIsDeleting(true);
      return;
    }

    setIsOverDeleteZone(false);
    onReorderComplete();
  }

  async function handleDeleteAnimationComplete() {
    if (!isDeleting) {
      return;
    }

    await deleteTodo(todo.id);
  }

  return (
    <Reorder.Item
      value={todo}
      as="li"
      className={
        isOverDeleteZone
          ? "todo-card delete-zone-active"
          : "todo-card"
      }
      drag
      dragMomentum={false}
      dragSnapToOrigin={!isDeleting}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      onAnimationComplete={handleDeleteAnimationComplete}
      onDoubleClick={() => toggleTodo(todo)}
      whileHover={
        isDeleting
          ? undefined
          : {
              y: -2,
              scale: 1.01,
              boxShadow:
                "0 10px 20px rgba(0, 0, 0, 0.08)",
            }
      }
      whileDrag={{
        boxShadow:
          "0 16px 32px rgba(0, 0, 0, 0.16)",
        zIndex: 10,
      }}
      animate={
        isDeleting
          ? {
              x: window.innerWidth,
              y: 200,
              rotate: 25,
              scale: 0.25,
              opacity: 0,
            }
          : {
              rotate: isOverDeleteZone
                ? [0, -1.5, 1.5, -1.5, 1.5, 0]
                : 0,
            }
      }
      transition={
        isDeleting
          ? {
              duration: 0.45,
              ease: "easeIn",
            }
          : {
              rotate: {
                duration: 0.32,
                repeat: isOverDeleteZone
                  ? Infinity
                  : 0,
              },
            }
      }
    >
      <TodoItem
        todo={todo}
        toggleTodo={toggleTodo}
        editTodo={editTodo}
      />
    </Reorder.Item>
  );
}

export default DraggableTodoItem;