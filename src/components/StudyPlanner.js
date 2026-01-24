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
  const [darkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [motivationalQuote, setMotivationalQuote] = useState('Stay positive and keep pushing forward!');

  // Fetch tasks from Firebase
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

  // Update progress bar
  const updateProgress = (tasks) => {
    const totalTasks = Object.keys(tasks || {}).length;
    const completedTasks = Object.values(tasks || {}).filter((task) => task.completed).length;
    setProgress(totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0);
    if (completedTasks > 0) {
      setPoints((prev) => prev + completedTasks * 10); // 10 points per completed task
      setStreak((prev) => prev + 1);
    }
  };

  // Add or update task
  const addOrUpdateTask = async () => {
    if (!newTask || !newDate) {
      alert('Please enter both task and date');
      return;
    }

    const taskId = editingTaskId || `${newDate}-${Date.now()}`;
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
      resetForm();
      updateProgress({ ...tasks, [taskId]: newTaskData });
    } catch (error) {
      console.error('Error adding/updating task:', error);
    }
  };

  // Mark task as completed
  const markTaskCompleted = async (taskId) => {
    const taskRef = ref(database, `users/${userId}/studyPlanner/${taskId}`);
    try {
      await update(taskRef, { completed: true, completedAt: new Date().toISOString() });
      setTasks((prev) => ({
        ...prev,
        [taskId]: { ...prev[taskId], completed: true, completedAt: new Date().toISOString() },
      }));
      updateProgress({ ...tasks, [taskId]: { ...tasks[taskId], completed: true } });
    } catch (error) {
      console.error('Error marking task as completed:', error);
    }
  };

  // Delete task
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

  // Clear completed tasks
  const clearCompletedTasks = async () => {
    try {
      const completedTaskIds = Object.keys(tasks).filter((id) => tasks[id].completed);
      for (const taskId of completedTaskIds) {
        await deleteTask(taskId);
      }
    } catch (error) {
      console.error('Error clearing completed tasks:', error);
    }
  };

  // Reset form
  const resetForm = () => {
    setNewTask('');
    setNewDate('');
    setNewCategory('General');
    setNewPriority('Medium');
    setEditingTaskId(null);
  };

  // Set task for editing
  const setTaskToEdit = (taskId) => {
    const task = tasks[taskId];
    if (task) {
      setNewTask(task.taskText);
      setNewDate(task.taskDate);
      setNewCategory(task.category);
      setNewPriority(task.priority);
      setEditingTaskId(taskId);
    }
  };

  // Filtered tasks based on search and category
  const filteredTasks = Object.entries(tasks).filter(([_, task]) =>
    (filter === 'All' || task.category === filter) &&
    task.taskText.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get Firebase user ID
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

  // Fetch motivational quotes
  useEffect(() => {
    const quotes = [
      'Believe in yourself and all that you are.',
      'The future depends on what you do today.',
      'Success is the sum of small efforts repeated day in and day out.',
      'Hard work beats talent when talent doesn’t work hard.',
    ];
    setMotivationalQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  return (
    <div className={`study-planner ${darkMode ? 'dark-mode' : ''}`}>
      <header className="header">
        <h1>Study Planner</h1>
       
       
      </header>

      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}>
          {Math.round(progress)}%
        </div>
      </div>

      <div className="motivational-quote">
        <em>{motivationalQuote}</em>
      </div>

      <div className="gamification">
        <p>Points: {points}</p>
        <p>Streak: {streak} days</p>
      </div>

      {/* Task Form */}
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
        <button onClick={addOrUpdateTask}>
          {editingTaskId ? 'Update Task' : 'Add Task'}
        </button>
        {editingTaskId && <button onClick={resetForm}>Cancel Edit</button>}
      </div>

      {/* Filters */}
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
        <button onClick={clearCompletedTasks}>Clear Completed</button>
      </div>

      {/* Task List */}
      <div className="task-list">
        {filteredTasks.map(([taskId, task]) => (
          <div
            key={taskId}
            className={`task-box ${task.completed ? 'completed' : ''}`}
            style={{ borderLeft: `5px solid ${getPriorityColor(task.priority)}` }}
          >
            <div className="task-details">
              <strong>{task.taskText}</strong> - {task.taskDate}
              <br />
              <span className="task-meta">
                {task.category}, {task.priority}
                {task.completed && <em> (Completed on {new Date(task.completedAt).toLocaleDateString()})</em>}
              </span>
            </div>
            <div className="task-actions">
              {!task.completed && (
                <button onClick={() => markTaskCompleted(taskId)}>Complete</button>
              )}
              <button onClick={() => setTaskToEdit(taskId)}>Edit</button>
              <button onClick={() => deleteTask(taskId)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'High':
      return 'red';
    case 'Medium':
      return 'orange';
    case 'Low':
      return 'green';
    default:
      return 'gray';
  }
};

export default StudyPlanner;
