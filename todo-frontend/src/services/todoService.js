const API_URL = "http://localhost:5206/todos";

export async function getTodos() {
    const response = await fetch(API_URL);
    return response.json();
}

export async function addTodo(title) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title,
            isComplete: false,
        }),
    });

    return response.json();
}

export async function updateTodo(todo) {
    await fetch(`${API_URL}/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
  }
  
  export async function deleteTodo(id) {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
  }

export async function reorderTodos(todoIds) {
    const response = await fetch(`${API_URL}/reorder`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(todoIds),
    });

    if (!response.ok) {
        throw new Error("Failed to reorder todos");
    }
}

