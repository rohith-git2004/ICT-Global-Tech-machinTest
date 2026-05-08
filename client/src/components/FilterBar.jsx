function FilterBar({
  filter,
  setFilter,
}) {
  return (
    <div className="flex gap-3 mb-6">
      <button
        onClick={() => setFilter("all")}
        className={`px-4 py-2 rounded-lg ${
          filter === "all"
            ? "bg-blue-500 text-white"
            : "bg-white"
        }`}
      >
        All
      </button>

      <button
        onClick={() =>
          setFilter("completed")
        }
        className={`px-4 py-2 rounded-lg ${
          filter === "completed"
            ? "bg-blue-500 text-white"
            : "bg-white"
        }`}
      >
        Completed
      </button>

      <button
        onClick={() =>
          setFilter("pending")
        }
        className={`px-4 py-2 rounded-lg ${
          filter === "pending"
            ? "bg-blue-500 text-white"
            : "bg-white"
        }`}
      >
        Pending
      </button>
    </div>
  );
}

export default FilterBar;