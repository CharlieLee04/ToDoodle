import "./TodoFilters.css";

function TodoFilters({ filter, setFilter }) {
    return (
        <div className="todo-filters">
            <button
                className={filter === "all" ? "filter-button active" : "filter-button"}
                onClick={() => setFilter("all")}
                >
                    All
            </button>

            <button
                className={filter === "active" ? "filter-button active" : "filter-button"}
                onClick={() => setFilter("active")}
                >
                    Active
            </button>

            <button
                className={filter === "completed" ? "filter-button active" : "filter-button"}
                onClick={() => setFilter("completed")}
                >
                    Completed
            </button>
        </div>
    ); 
} 

export default TodoFilters;