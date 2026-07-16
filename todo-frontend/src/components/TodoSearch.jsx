import "./TodoSearch.css";

function TodoSearch({ searchText, setSearchText }) {
    return (
        <input
            className="todo-search"
            type="search"
            placeholder="Search todos..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
        />
    );
}

export default TodoSearch;