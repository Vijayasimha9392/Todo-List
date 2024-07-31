import React, { useState } from 'react';
import Task from './Task';

const TaskList = ({ tasks, onUpdateTask, onToggleComplete }) => {
  const [expandedTaskId, setExpandedTaskId] = useState(null);

  const handleExpand = (taskId) => {
    setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
  };

  return (
    <div>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          isExpanded={expandedTaskId === task.id}
          onExpand={handleExpand}
          onUpdateTask={onUpdateTask}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </div>
  );
};

export default TaskList;
