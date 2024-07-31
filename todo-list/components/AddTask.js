import React, { useState } from 'react';

const AddTask = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAdd = () => {
    onAddTask({
      id: Date.now(),
      title,
      description,
      completed: false,
      updated_at: new Date().toISOString(),
    });
    setTitle('');
    setDescription('');
  };

  return (
    <div>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <button onClick={handleAdd}>Add Task</button>
    </div>
  );
};

export default AddTask;
