import React, { useEffect, useState, useCallback } from 'react';
import { database, auth } from '../firebase';
import { ref, set, get, update, remove } from 'firebase/database';
import './StudyPlanner.css';

const StudyPlanner = () => {
  const [tasks, setTasks] = useState({});
  const [newTask, setNewTask] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newCategory, setNewCategory] = useState('General');
  const [newPriority, setNewPriority] = useState('Medium');
  const [progress, setProgress] = useState(0);
  const [userId, setUserId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('All');

  const fetchTasks = useCallback(async (userId) => {
    const userRef = ref(database, `users/${userId}/studyPlanner`);
    try {
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        const tasksData = snapshot.val();
        setTasks(tasksData);
        updateProgress(tasksData);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }, []);

  const updateProgress = (tasks) => {
    const totalTasks = Object.keys(tasks || {}).length;
    const completedTasks = Object.values(tasks || {}).filter((task) => task.completed).length;
    setProgress(totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0);
  };

  const addTask = async () => {
    if (!newTask || !newDate) {
      alert('Please enter both task and date');
      return;
    }

    const taskId = `${newDate}-${Date.now()}`;
    const newTaskData = {
      taskText: newTask,
      taskDate: newDate,
      category: newCategory,
      priority: newPriority,
      completed: false,
    };

    try {
      await set(ref(database, `users/${userId}/studyPlanner/${taskId}`), newTaskData);
      setTasks((prev) => ({ ...prev, [taskId]: newTaskData }));
      setNewTask('');
      setNewDate('');
      setNewCategory('General');
      setNewPriority('Medium');
      updateProgress({ ...tasks, [taskId]: newTaskData });
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const markTaskCompleted = async (taskId) => {
    const taskRef = ref(database, `users/${userId}/studyPlanner/${taskId}`);
    try {
      await update(taskRef, { completed: true });
      setTasks((prev) => ({
        ...prev,
        [taskId]: { ...prev[taskId], completed: true },
      }));
      updateProgress({ ...tasks, [taskId]: { ...tasks[taskId], completed: true } });
    } catch (error) {
      console.error('Error marking task as completed:', error);
    }
  };

  const deleteTask = async (taskId) => {
    const taskRef = ref(database, `users/${userId}/studyPlanner/${taskId}`);
    try {
      await remove(taskRef);
      const updatedTasks = { ...tasks };
      delete updatedTasks[taskId];
      setTasks(updatedTasks);
      updateProgress(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const filteredTasks = Object.entries(tasks).filter(([_, task]) =>
    (filter === 'All' || task.category === filter) &&
    task.taskText.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        fetchTasks(user.uid);
      } else {
        alert('Please log in to access your study planner');
      }
    });

    return () => unsubscribe();
  }, [fetchTasks]);

  return (
    <div className={`study-planner ${darkMode ? 'dark-mode' : ''}`}>
      <header className="header">
        <h1>Study Planner</h1>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </header>

      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}>
          {Math.round(progress)}%
        </div>
      </div>

      <div className="task-form">
        <input
          type="text"
          placeholder="Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <input
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
        />
        <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
          <option value="General">General</option>
          <option value="Homework">Homework</option>
          <option value="Exam Prep">Exam Prep</option>
          <option value="Project">Project</option>
        </select>
        <select value={newPriority} onChange={(e) => setNewPriority(e.target.value)}>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="General">General</option>
          <option value="Homework">Homework</option>
          <option value="Exam Prep">Exam Prep</option>
          <option value="Project">Project</option>
        </select>
      </div>

      <div className="task-list">
        {filteredTasks.map(([taskId, task]) => (
          <div key={taskId} className={`task-box ${task.completed ? 'completed' : ''}`}>
            <span>
              {task.taskText} - {task.taskDate} ({task.category}, {task.priority})
            </span>
            {!task.completed && (
              <button onClick={() => markTaskCompleted(taskId)}>Mark as Completed</button>
            )}
            <button onClick={() => deleteTask(taskId)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyPlanner;
