const fs = require('fs');
const Task = require('../models/taskModel');

exports.checkBody = (req, res, next) => {
    if (!req.body.task || !req.body.employeeId) {
        return res.status(400).json({
            'status': 'bad request',
            'message': `The body doesn't contain either task or employeeId!`
        })
        next();
    }
}

exports.getAllTasks = async (req, res) => {
    try {
        const task = await Task.find();

        res.status(200).json({
            status: 'success',
            data: {
                results: task.length,
                task,
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'Request Failed!',
            message: 'Invalid Query!'
        })
    }
}

exports.gettask = async (req, res) => {
    try {
        const task = await Task;
        res.status(200).json({
            status: 'success',
            data: {
                task,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'Invalid Request',
            message: 'Could not find the data!'
        })
    }

}

exports.addtask = async (req, res) => {
    try {
        const task = await task.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                report: task,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail request',
            message: 'Invalid Data Sent!'
        });
    }
};

exports.updatetask = (req, res) => {
    res.status(200).json({
        data: {
            tour: '<Updated Tour Here...',
        },
    });
};

exports.deletetask = (req, res) => {
    req.status(204).json({
        data: {
            status: 'success',
            data: null,
        },
    });
};
