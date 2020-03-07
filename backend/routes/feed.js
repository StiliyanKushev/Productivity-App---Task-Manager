const express = require('express');
const Task = require('../models/Task');
const authCheck = require("../config/token").verifyToken;
const router = new express.Router();

function validate(payload) {
    const errors = {};
    let isFormValid = true;

    if (!payload || !payload.date || ! new Date(payload.date).getMonth || typeof new Date(payload.date).getMonth !== 'function') {
        isFormValid = false
        errors.date = 'Date is not given'
    }

    if (!payload || typeof Number(payload.importantcyLevel) !== 'number' || Number(payload.importantcyLevel) < 1 || Number(payload.importantcyLevel) > 3) {
        isFormValid = false
        errors.importantcyLevel = 'importantcy Level is invalid or not given. Must be >= 1 and <= 3'
    }

    if (!payload || typeof payload.description !== 'string' || payload.description.trim().length < 5 || payload.description.trim().length > 50) {
        isFormValid = false
        errors.description = 'description must be at least 5 chars long and 50 at most'
    }

    return {
        success: isFormValid,
        errors
    }
}

function getTaskCell(req, res, next) {
    let year = req.params.year;
    let month = req.params.month;
    let day = req.params.day;

    let fromDate = new Date(year,month,day);
    let toDate = new Date(year,month,day,23,59,59); // last moment of the day

    Task.find({
        $and:[
            {
                date: {
                    $gte: fromDate.toISOString(),
                    $lte: toDate.toISOString()
                }
            },
            {
                author: req.user.username
            }
        ]
        })
        .then((tasks) => {
            res
                .status(200)
                .json({
                    message: 'Fetched cell tasks successfully.',
                    tasks
                });
        })
        .catch((error) => {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            next(error);
        });
}

function getTasks(req, res, next) {
    let year = req.params.year;
    let month = req.params.month;

    let fromDate = new Date(`${year}-${month}-01`);
    let copy = new Date(fromDate.getTime());
    let toDate = new Date(copy.setMonth(copy.getMonth() + 1));

    Task.find({
        $and:[
            {
                date: {
                    $gte: fromDate.toISOString(),
                    $lt: toDate.toISOString()
                }
            },
            {
                author: req.user.username
            }
        ]
        })
        .then((tasks) => {
            res
                .status(200)
                .json({
                    message: 'Fetched tasks successfully.',
                    tasks
                });
        })
        .catch((error) => {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            next(error);
        });
}

async function createTask(req, res, next) {
    const validationResult = validate(req.body)
    if (!validationResult.success) {
        return res.status(200).json({
            success: false,
            errors: validationResult.errors
        })
    }

    await new Task({
        //pass the req.values to the scheme
        importantcyLevel: req.body.importantcyLevel,
        description: req.body.description,
        date: req.body.date,
        author: req.user.username,
    }).save();

    return res.status(200).json({
        success: true,
        message: "Task created."
    })
}

router.post("/tasks/get/:year/:month/:day",authCheck, getTaskCell);
router.post("/tasks/get/:year/:month",authCheck, getTasks);
router.post("/tasks/create",authCheck, createTask);
// router.post("/tasks/remove/:id", authCheck, removeTask);
// router.post("/tasks/edit/:id", authCheck, editTask);

module.exports = router;