import "./TodoForm.css";

function TodoForm({ newTodo, setNewTodo, addTodo}) {
    return (
        <div className="todo-form">
            <input
                className="todo-input"
                type="text"
                placeholder="Enter a new todo..."
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        addTodo();
                    }
                }}
            />

            <button
            className="add-button" 
            onClick={addTodo}>
                Add Todo
            </button>
        </div>
    );
}

export default TodoForm;
