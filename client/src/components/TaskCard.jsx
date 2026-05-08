function TaskCard({
  task,
  deleteTask,
  toggleStatus,
  setEditingTask,
}) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5">
      
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          {task.title}
        </h2>

        {task.completed && (
          <span className="bg-green-100 text-green-600 text-sm px-3 py-1 rounded-full">
            Completed
          </span>
        )}
      </div>

      <p className="text-gray-600 mt-3">
        {task.description}
      </p>

      <div className="flex gap-3 mt-5">

        {!task.completed && (
          <button
            onClick={() =>
              toggleStatus(task._id)
            }
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            Complete
          </button>
        )}

        <button
          onClick={() =>
            setEditingTask(task)
          }
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
        >
          Edit
        </button>

        <button
          onClick={() =>
            deleteTask(task._id)
          }
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Delete
        </button>

      </div>
    </div>
  );
}

export default TaskCard;