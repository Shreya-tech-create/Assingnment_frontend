import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from '../Components/TaskForm';
import TaskCard from '../Components/TaskCard';

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token'); // ✅ fetch token
      const res = await axios.get('http://localhost:8000/api/task', {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true, // ✅ cookies if needed
      });
      setTasks(res.data.tasks || []);
    } catch (err) {
      alert('Failed to fetch tasks');
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  return (
    <div className="container mt-5">
      <h2>Dashboard</h2>
      <TaskForm refresh={fetchTasks} />
      <div className="row mt-4">
        {tasks.map(task => (
          <TaskCard key={task._id} task={task} refresh={fetchTasks} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
