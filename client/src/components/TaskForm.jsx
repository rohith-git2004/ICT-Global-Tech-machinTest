import { useEffect, useState } from "react";

function TaskForm({
  addTask,
  editingTask,
  updateTask,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title) return;

    const taskData = {
      title,
      description,
    };

    if (editingTask) {
      updateTask(editingTask._id, taskData);
    } else {
      addTask(taskData);
    }

    setTitle("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-5 rounded-xl shadow-md mb-6"
    >
      <h2 className="text-2xl font-bold mb-4">
        {editingTask
          ? "Update Task"
          : "Add Task"}
      </h2>

      <input
        type="text"
        placeholder="Task Title"
        className="w-full border p-3 rounded-lg mb-3"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <textarea
        placeholder="Task Description"
        className="w-full border p-3 rounded-lg mb-3"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      <button className="bg-blue-500 text-white px-5 py-2 rounded-lg">
        {editingTask ? "Update" : "Add"}
      </button>
    </form>
  );
}

export default TaskForm;