import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTodo } from "../context/todoContext";

function TodoForm() {
  const { addTodo, updateTodo } = useTodo();

  const location = useLocation();
  const navigate = useNavigate();

  const editingTodo = location.state?.todo;

  const [form, setForm] = useState({
    title: editingTodo?.title || "",
    description: editingTodo?.description || "",
    location: editingTodo?.location || "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = editingTodo
      ?  await updateTodo(editingTodo.id, form)
      : await addTodo(form.title, form.description, form.location);

    alert(result.message);

    if (result.success) {
      setForm({ title: "", description: "", location: "" });
      navigate("/");
    }
  };

  return (
    <div className="w-full max-w-2xl bg-green-500 rounded-2xl p-6 shadow-xl">
      <div className="mb-5 text-center">
        <h2 className="text-3xl font-bold text-white">
          {editingTodo ? "Edit Todo" : "Create Todo"}
        </h2>

        <p className="text-green-100 mt-1">
          {editingTodo
            ? "Update your task details."
            : "Add a task and stay on track."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="title" className="text-sm font-semibold text-white">
            Title
          </label>

          <input
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter todo title"
            className="w-full bg-gray-100 rounded-lg px-4 py-2.5 text-black placeholder-gray-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="description"
            className="text-sm font-semibold text-white"
          >
            Description
          </label>

          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter description"
            rows="4"
            className="w-full bg-gray-100 rounded-lg px-4 py-2.5 text-black placeholder-gray-500 resize-none focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="location"
            className="text-sm font-semibold text-white"
          >
            Location
          </label>

          <input
            id="location"
            name="location"
            type="text"
            value={form.location}
            onChange={handleChange}
            placeholder="Enter location"
            className="w-full bg-gray-100 rounded-lg px-4 py-2.5 text-black placeholder-gray-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-white text-green-700 py-2.5 rounded-lg font-semibold hover:bg-green-100 transition mt-1"
        >
          {editingTodo ? "Update Todo" : "Create Todo"}
        </button>
      </form>
    </div>
  );
}

export default TodoForm;
