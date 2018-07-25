const database = require('../database')
const express = require('express');
const util = require('../util')

const router = express.Router();

router.get('/history/count', (req, res) => {
    let userId = util.getUserId(req);
    let fromTime = req.query && req.query.fromTime ? req.query.fromTime : 0;
    let toTime = req.query && req.query.toTime ? req.query.toTime : new Date().getTime();

    database.queryAll(userId, fromTime, toTime)
    .then(workouts => {
        res.status(200);
        res.json(!workouts ? 0 : workouts.length);
    })
})

router.get('/history/:id', (req, res) => {
    let userId = util.getUserId(req);
    let id = req.params.id;

    database.queryAll(userId, 0, new Date().getTime())
    .then(workouts => {
        let workout = workouts.find(w => w.id === id);

        if (workout) {
            res.status(200);
            res.json(workout);
        }
        else {
            res.status(404);
            res.json();
        }
    })
    .catch(error => {
        res.status(500);
        res.json(error);
    })
})

router.put('/history/:id', (req, res) => {
    let userId = util.getUserId(req);
    let id = req.params.id;
    let workout = req.body;

    database.queryAll(userId, 0, new Date().getTime())
    .then(workouts => {
        let foundWorkout = workouts.find(w => w.id == id);

        database.delete(userId, foundWorkout.endTime)
        .then(response => {
            database.put(userId, workout)
            .then(response => {
                res.status(200);
                res.json(workout);
            }, error => {
                res.status(500);
                res.json(error);
            })
        })
    });
});

router.delete('/history/:id', (req, res) => {
    let userId = util.getUserId(req);
    let id = req.params.id;

    database.queryAll(userId, 0, new Date().getTime())
    .then(workouts => {
        let workout = workouts.find(w => w.id === id);

        database.delete(userId, workout.endTime)
        .then(response => {
            res.status(204);
            res.json();
        }, error => {
            res.status(500);
            res.json(error);
        })
    })
})

// pagination - /workouts?limit=N&offset=M
// sort - /workouts?order=<ASC|DESC>
// filter by routine - /workouts?routineId=guid
// filter by date range = /workouts?fromDate=<unix timestamp>&toDate=<unix timestamp>
router.get('/history', (req, res) => {
    let userId = util.getUserId(req);
    let order = req.query && req.query.order ? req.query.order.toLowerCase() : undefined;
    let routineId = req.query && req.query.routineId ? req.query.routineId.toLowerCase() : undefined;
    let limit = req.query && req.query.limit ? req.query.limit : undefined;
    let offset = req.query && req.query.offset ? req.query.offset : undefined;
    let fromTime = req.query && req.query.fromTime ? req.query.fromTime : 0;
    let toTime = req.query && req.query.toTime ? req.query.toTime : new Date().getTime();

    database.queryAll(userId, fromTime, toTime)
    .then(workouts => {
        if (fromTime && toTime) {
            workouts = workouts.filter(w => w.endTime >= fromTime && w.endTime <= toTime);
        }
        
        if (routineId) {
            workouts = workouts.filter(w => w.routine.id === routineId);
        }

        res.header('X-Total-Count', workouts.length);

        if (order) {
            if (order === 'asc' || order === 'desc') {
                workouts = workouts.sort(util.sortByProp('endTime', order))
            }
            else {
                res.status(400);
                res.json('Invalid order predicate \'' + order + '\'; specify ASC or DESC')
            }
        }

        if (offset && limit) {
            workouts = workouts.slice(+offset, +offset + +limit);
        }

        res.status(200);
        res.json(workouts);
    })
    .catch(err => {
        res.status(500);
        res.json(err);
    })
})

module.exports = router;