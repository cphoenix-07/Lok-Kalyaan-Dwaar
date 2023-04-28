const fs = require('fs');
const Employee = require('../models/employeeModel');

exports.checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.totalXp) {
        return res.status(400).json({
            'status': 'bad request',
            'message': `The body doesn't contain either name or total xp!`
        })
        next();
    }
}

exports.getAllEmployee = async (req, res) => {
    try {
        const employee = await Employee.find();

        res.status(200).json({
            status: 'success',
            data: {
                results: employee.length,
                employee,
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'Request Failed!',
            message: 'Invalid Query!'
        })
    }
}

exports.getEmployee = async (req, res) => {
    try {
        const employee = await Employee;
        res.status(200).json({
            status: 'success',
            data: {
                employee,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'Invalid Request',
            message: 'Could not find the data!'
        })
    }

}

exports.addEmployee = async (req, res) => {
    try {
        const employee = await Employee.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                report: employee,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail request',
            message: 'Invalid Data Sent!'
        });
    }
};

exports.updateEmployee = (req, res) => {
    res.status(200).json({
        data: {
            tour: '<Updated Tour Here...',
        },
    });
};

exports.deleteEmployee = (req, res) => {
    req.status(204).json({
        data: {
            status: 'success',
            data: null,
        },
    });
};
