import "./App.css";
import { useEffect, useState } from "react";
import {
  getTodos,
  addTodo as addTodoApi,
  updateTodo,
  deleteTodo as deleteTodoApi,
  reorderTodos,
} from "./services/todoService"
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoFilters from "./components/TodoFilters";
import TodoSearch from "./components/TodoSearch";
import TrashZone from "./components/TrashZone";
import { eachAxis } from "motion/react";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isDeleteZoneActive, setIsDeleteZoneActive] = useState(false);

  useEffect(() => {
    async function loadTodos() {
      try {
        const data = await getTodos();
        setTodos(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadTodos();
  }, []);

  async function addTodo() {
    if (newTodo.trim() === "") {
      return
    }

    const todo = await addTodoApi(newTodo);

    setTodos([...todos, todo]);
    setNewTodo("");
  }

  async function toggleTodo(todo) {
    const updatedTodo = {
      ...todo,
      isComplete: !todo.isComplete,
    };

    await updateTodo(updatedTodo);

    setTodos(
      todos.map((t) =>
        t.id === todo.id ? updatedTodo : t
      )
    );
  }

  async function deleteTodo(id) {

    await deleteTodoApi(id);
    
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function handleReorder(reorderedTodos) {
    setTodos(reorderedTodos);
  }

  async function saveTodoOrder() {
    const todoIds = todos.map((todo) => todo.id);
  
    try {
      await reorderTodos(todoIds);
    } catch (error) {
      console.error("Could not save todo order:", error);
    }
  }

  async function editTodo(todo, newTitle) {
    const trimmedTitle = newTitle.trim();

    if (trimmedTitle === "") {
      return;
    }

    const updatedTodo = {
      ...todo,
      title: trimmedTitle,
    };

    await updateTodo(updateTodo);

    setTodos(
      todos.map((existingTodo) => 
      existingTodo.id === todo.id 
      ? updatedTodo
      : existingTodo
      )
    );
  }


  const completedCount = todos.filter((todo) => todo.isComplete).length;
  const remainingCount = todos.length - completedCount;

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.title
    .toLowerCase()
    .includes(searchText.toLowerCase());

    if (!matchesSearch) {
      return false;
    }
 
    if (filter === "active") {
      return !todo.isComplete;
    }

    if (filter === "completed") {
      return todo.isComplete;
    }

    return true;
  })

  const canReorder = 
    filter === "all" &&
    searchText.trim() === "";

  return (
    <div className="app">
      <h1>ToDoodle</h1>

      <p className="todo-summary">
        {remainingCount} remaining · {completedCount} completed 
      </p>

      <TodoForm
        newTodo={newTodo}
        setNewTodo={setNewTodo}
        addTodo={addTodo}
      />

      <TodoSearch
        searchText={searchText}
        setSearchText={setSearchText}
      />

      <TodoFilters
        filter={filter}
        setFilter={setFilter}
      />

      <TodoList
        todos={filteredTodos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
        onReorder={handleReorder}
        onReorderComplete={saveTodoOrder}
        canReorder={canReorder}
        setIsDragging={setIsDragging}
        setIsDeleteZoneActive={setIsDeleteZoneActive}
      />

      <TrashZone
        isDragging={isDragging}
        isActive={isDeleteZoneActive}
      />
    </div>
  );
}

 export default App;
