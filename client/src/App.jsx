import { useEffect, useState } from "react";

import API from "./services/taskAPI";

import TaskForm from "./components/TaskForm";
import TaskCard from "./components/TaskCard";
import FilterBar from "./components/FilterBar";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] =
    useState("all");

  const [editingTask, setEditingTask] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // Fetch Tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);

      const res = await API.get("/");

      let taskData = [];

      if (Array.isArray(res.data)) {
        taskData = res.data;
      } else if (
        Array.isArray(res.data.tasks)
      ) {
        taskData = res.data.tasks;
      }

      setTasks(taskData);
    } catch (error) {
      console.log(error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add Task
  const addTask = async (taskData) => {
    try {
      const res = await API.post(
        "/",
        taskData
      );

      setTasks((prevTasks) =>
        Array.isArray(prevTasks)
          ? [res.data, ...prevTasks]
          : [res.data]
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Task
  const deleteTask = async (id) => {
    try {
      await API.delete(`/${id}`);

      setTasks((prevTasks) =>
        Array.isArray(prevTasks)
          ? prevTasks.filter(
              (task) =>
                task._id !== id
            )
          : []
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Complete Task
  const toggleStatus = async (id) => {
    try {
      const res = await API.patch(
        `/${id}/status`
      );

      setTasks((prevTasks) =>
        Array.isArray(prevTasks)
          ? prevTasks.map((task) =>
              task._id === id
                ? res.data
                : task
            )
          : []
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Update Task
  const updateTask = async (
    id,
    updatedData
  ) => {
    try {
      const res = await API.put(
        `/${id}`,
        updatedData
      );

      setTasks((prevTasks) =>
        Array.isArray(prevTasks)
          ? prevTasks.map((task) =>
              task._id === id
                ? res.data
                : task
            )
          : []
      );

      setEditingTask(null);
    } catch (error) {
      console.log(error);
    }
  };

  // Filter Tasks
  const filteredTasks =
    Array.isArray(tasks)
      ? tasks.filter((task) => {
          if (filter === "completed")
            return task.completed;

          if (filter === "pending")
            return !task.completed;

          return true;
        })
      : [];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-500 mb-8">
          Task Manager
        </h1>

        <TaskForm
          addTask={addTask}
          editingTask={editingTask}
          updateTask={updateTask}
        />

        <FilterBar
          filter={filter}
          setFilter={setFilter}
        />

        <div className="grid gap-4">
          {loading ? (
            <p className="text-center text-lg font-semibold text-blue-500">
              Loading tasks...
            </p>
          ) : filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                deleteTask={deleteTask}
                toggleStatus={
                  toggleStatus
                }
                setEditingTask={
                  setEditingTask
                }
              />
            ))
          ) : (
            <p className="text-center text-gray-500">
              No tasks found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;