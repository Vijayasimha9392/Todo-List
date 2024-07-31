import { useState, useEffect } from 'react';
import fs from 'fs';
import path from 'path';
import TaskList from '../components/TaskList';
import AddTask from '../components/AddTask';

export default function Home({ initialTasks }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get('search') || '';
    setSearchTerm(search);
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('search', searchTerm);
    window.history.replaceState(null, '', `${window.location.pathname}?${urlParams.toString()}`);
  }, [searchTerm]);

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
  };

  const handleToggleComplete = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={filteredTasks}
        onUpdateTask={handleUpdateTask}
        onToggleComplete={handleToggleComplete}
      />
    </div>
  );
}

export async function getServerSideProps() {
  const filePath = path.join(process.cwd(), 'public', 'data.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const initialTasks = JSON.parse(jsonData);

  return {
    props: {
      initialTasks,
    },
  };
}
