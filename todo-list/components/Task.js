import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const Task = ({ task, isExpanded, onExpand, onUpdateTask, onToggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleEdit = () => {
    if (isEditing) {
      onUpdateTask({ ...task, title, description, updated_at: new Date().toISOString() });
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className={`task ${task.completed ? 'completed' : ''}`}>
      <div className="task-header">
        <h2 onClick={() => onExpand(task.id)}>
          {task.title} 
          {task.completed && <FontAwesomeIcon icon={faCheckCircle} className="completed-icon" />}
        </h2>
        <button onClick={() => onToggleComplete(task.id)} className="mark-done-button">
          {task.completed ? 'Unmark' : 'Mark as Done'}
        </button>
      </div>
      {isExpanded && (
        <div>
          {isEditing ? (
            <div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="title-input"
              />
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="description-input"
              />
              <button onClick={handleEdit}>Save</button>
            </div>
          ) : (
            <div>
              <button onClick={handleEdit}>Edit</button>
            </div>
          )}
          <p>{task.description}</p>
          <p>Last updated: {new Date(task.updated_at).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default Task;
