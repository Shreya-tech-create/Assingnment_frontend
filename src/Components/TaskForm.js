import React, { useState } from 'react';
import axios from 'axios';

function TaskForm({ refresh }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:8000/api/task', { title, description }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTitle('');
      setDescription('');
      refresh();
    } catch (err) {
      alert('Failed to create task');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="row g-2">
      <div className="col-md-4">
        <input className="form-control" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
      </div>
      <div className="col-md-6">
        <input className="form-control" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
      </div>
      <div className="col-md-2">
        <button className="btn btn-success w-100">Add Task</button>
      </div>
    </form>
  );
}

export default TaskForm;
