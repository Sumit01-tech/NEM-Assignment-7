const Task = require("../models/task.model");

// Add Task
exports.addTask = async (req, res, next) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json({ message: "Task added successfully", task });
    } catch (error) {
        next(error);
    }
};

// Update Task
exports.updateTask = async (req, res, next) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.taskId, req.body, {
            new: true,
            runValidators: true,
        });
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.json({ message: "Task updated successfully", task });
    } catch (error) {
        next(error);
    }
};

// Delete Task
exports.deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.taskId);
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        next(error);
    }
};

// Get All Tasks (with sorting)
exports.getAllTasks = async (req, res, next) => {
    try {
        const sort = req.query.sortBy || "dueDate";
        const tasks = await Task.find().sort({ [sort]: 1 });
        res.json(tasks);
    } catch (error) {
        next(error);
    }
};

// Get Tasks with Pagination
exports.getPaginatedTasks = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const skip = parseInt(req.query.skip) || 0;
        const tasks = await Task.find().skip(skip).limit(limit);
        res.json(tasks);
    } catch (error) {
        next(error);
    }
};

// Get Tasks by Status
exports.getTasksByStatus = async (req, res, next) => {
    try {
        const tasks = await Task.find({ status: req.params.status });
        res.json(tasks);
    } catch (error) {
        next(error);
    }
};

// Get High Priority Tasks
exports.getHighPriorityTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find({ priority: "high" });
        res.json(tasks);
    } catch (error) {
        next(error);
    }
};
