// const express = require('express');
// const router = express.Router();
const pool = require('../connection');

function createRso(fields) {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO rsos SET ?', fields, async (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    });
}

function overlapping(location, start_time, end_time) {
    return new Promise((resolve, reject) => {
        // let notOverLapping = true;

        location.forEach((re) => {
            if (((new Date(re.end_time) - (new Date(start_time))) > 0) && ((new Date(end_time)) - new Date(re.start_time)) > 0) {
                // notOverlapping = false;
                const err = new Error("theres overlapping")
                reject(err)
            }
        })
        resolve(true)
       

    });
}

function getRso(name) {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM rsos WHERE name = ?', name, async (err, results) => {
            if (err) {
                reject(err)
            } else {
                // console.log(results)
                resolve(results)
            }
        })
    });
}

function getStuff(name, sql) {
    return new Promise((resolve, reject) => {
        pool.query(sql, name, async (err, results) => {
            if (err) {
                reject(err)
            } else {
                // console.log(results)
                const lastItem = results.pop()
                resolve(lastItem)
            }
        })
    });
}

function getLocation(location, sql) {
    return new Promise((resolve, reject) => {
        pool.query(sql, location, async (err, results) => {
            if (err) {
                reject(err)
            } else {
                // console.log(results)
                resolve(results)
            }
        })
    });
}

function addEvent(event, sql) {
    return new Promise((resolve, reject) => {
        pool.query(sql, event, async (err, results) => {
            if (err) {
                reject(err)
            } else {
                // console.log(results)
                resolve(results)
            }
        })
    });
}

function addRsoEvent(event, sql) {
    return new Promise((resolve, reject) => {
        pool.query(sql, event, async (err, results) => {
            if (err) {
                reject(err)
            } else {
                // console.log(results)
                resolve(results)
            }
        })
    });
}

function addRsoAdmin(admin) {
    return new Promise((resolve, reject) => {

        // for (user of users) {
        const fields = { user_id, uni_id } = admin
        pool.query('INSERT INTO admins SET ?', fields, async (err, results) => {
            if (err)
                reject(err)
            // usr.push(results)
            console.log(fields)
            resolve()
        })
        // }


    });
}

module.exports = {
    createRso,
    getRso,
    addRsoAdmin,
    overlapping,
    getStuff,
    getLocation,
    addEvent,
    addRsoEvent
}