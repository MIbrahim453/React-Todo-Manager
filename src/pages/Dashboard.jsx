import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTodo } from "../context/todoContext";

function Dashboard() {
  const { todos, deleteTodo } = useTodo();
  const navigate = useNavigate();

  const handleEdit = (todo) => {
    navigate("/add-todo", {
      state: { todo },
    });
  };

  const handleDelete = async (todo) => {
    const confirmed = window.confirm(`Delete "${todo.title}"?`);

    if (!confirmed) return;

    const result = await deleteTodo(todo);
    alert(result.message);
  };

  return (
    <div className="w-full min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-green-500 mb-6">My Todos</h1>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {todos.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-10 text-center text-blue-500"
                    >
                      No todos found
                    </td>
                  </tr>
                ) : (
                  todos.map((todo) => (
                    <tr key={todo.id} className="border-b border-blue-100">
                      <td className="px-6 py-4 font-semibold text-blue-700">
                        {todo.title}
                      </td>

                      <td className="px-6 py-4 text-blue-600">
                        {todo.description}
                      </td>

                      <td className="px-6 py-4 text-blue-600">
                        {todo.location}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleEdit(todo)}
                            className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(todo)}
                            aria-label={`Delete ${todo.title}`}
                            className="p-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
