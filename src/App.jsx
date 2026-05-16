import React, { useState } from "react";

function App() {
  const [todo, setTodo] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "Learn React",
      completed: false,
    },
  ]);

  // ADD TODO
  function addTodo() {
    if (todo.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      title: todo,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setTodo("");
  }

  // DELETE TODO
  function deleteTodo(id) {
    const updatedTodos = todos.filter((item) => item.id !== id);
    setTodos(updatedTodos);
  }

  // TOGGLE COMPLETE
  function toggleTodo(id) {
    const updatedTodos = todos.map((item) => {
      return item.id === id
        ? { ...item, completed: !item.completed }
        : item;
    });

    setTodos(updatedTodos);
  }

  // EDIT TODO
  function editTodo(id) {
    const updatedTitle = prompt("Edit your todo");

    if (!updatedTitle) return;

    const updatedTodos = todos.map((item) => {
      return item.id === id
        ? { ...item, title: updatedTitle }
        : item;
    });

    setTodos(updatedTodos);
  }

  // SEARCH + FILTER
  const filteredTodos = todos
    .filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((item) => {
      if (filter === "completed") return item.completed;

      if (filter === "incomplete") return !item.completed;

      return true;
    });

  return (
    <div className="min-h-screen bg-slate-900 text-white flex justify-center items-center p-5">
      <div className="w-full max-w-xl bg-slate-800 p-6 rounded-2xl shadow-lg">

        <h1 className="text-3xl font-bold text-center mb-6">
          Todo App
        </h1>

        {/* ADD TODO */}
        <div className="flex gap-3 mb-5">
          <input
            type="text"
            placeholder="Enter todo..."
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            className="flex-1 p-3 rounded-lg bg-slate-700 outline-none"
          />

          <button
            onClick={addTodo}
            className="bg-blue-500 hover:bg-blue-600 px-5 py-3 rounded-lg font-semibold"
          >
            Add
          </button>
        </div>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search todo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-lg bg-slate-700 outline-none mb-4"
        />

        {/* FILTER */}
        <div className="flex gap-3 mb-6">

          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg ${
              filter === "all"
                ? "bg-blue-500"
                : "bg-slate-700"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setFilter("completed")}
            className={`px-4 py-2 rounded-lg ${
              filter === "completed"
                ? "bg-green-500"
                : "bg-slate-700"
            }`}
          >
            Completed
          </button>

          <button
            onClick={() => setFilter("incomplete")}
            className={`px-4 py-2 rounded-lg ${
              filter === "incomplete"
                ? "bg-red-500"
                : "bg-slate-700"
            }`}
          >
            Incomplete
          </button>

        </div>

        {/* TODOS */}
        <div className="space-y-4">

          {filteredTodos.length > 0 ? (
            filteredTodos.map((item) => {
              return (
                <div
                  key={item.id}
                  className="bg-slate-700 p-4 rounded-xl flex justify-between items-center"
                >
                  {/* LEFT */}
                  <div className="flex items-center gap-3">

                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => toggleTodo(item.id)}
                      className="w-5 h-5"
                    />

                    <p
                      className={`text-lg ${
                        item.completed
                          ? "line-through text-gray-400"
                          : ""
                      }`}
                    >
                      {item.title}
                    </p>

                  </div>

                  {/* RIGHT */}
                  <div className="flex gap-2">

                    <button
                      onClick={() => editTodo(item.id)}
                      className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteTodo(item.id)}
                      className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>

                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-400">
              No todo found
            </p>
          )}

        </div>
      </div>
    </div>
  );
}

export default App;