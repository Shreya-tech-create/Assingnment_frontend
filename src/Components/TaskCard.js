import React, { useState } from "react";
import axios from "axios";

function TaskCard({ task, refresh }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const token = localStorage.getItem("token");

  // Delete Task
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/task/${task._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      refresh();
    } catch (err) {
      console.error(err);
    }
  };

  // Update Task
  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:8000/api/task/${task._id}`,
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsEditing(false);
      refresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="col-md-4 mt-3">
      <div className="card shadow-sm rounded-4 border-0">
        <div className="card-body">
          {isEditing ? (
            <>
              <input
                type="text"
                className="form-control mb-2 rounded-3"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task Title"
              />
              <textarea
                className="form-control mb-3 rounded-3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Task Description"
              />
              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={handleUpdate}
                >
                  Save
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h5 className="card-title">{task.title}</h5>
              <p className="card-text text-muted">{task.description}</p>
              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => setIsEditing(true)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskCard;