const Task = require('../models/Task');

// TODO: Fix this endpoint - it should return all tasks from MongoDB
// INTERVIEW TASK 1: This endpoint currently throws a 500 error
const getAllTasks = async (req, res) => {
  try {
    // HINT: Use the Task model to find all tasks
    // BONUS: Add pagination support using req.query.page and req.query.limit
    
    // This is intentionally broken - candidate should fix it
    const tasks = await Task.findAll(); // Wrong method - should be find()
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

const createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(400).json({ error: 'Failed to create task' });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(400).json({ error: 'Failed to update task' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(400).json({ error: 'Failed to delete task' });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask
};
