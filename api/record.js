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

function getInsertedRso() {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM rsos', async (err, results) => {
            if (err) {
                reject(err)
            } else {
                const lastItem = results.pop()
                resolve(lastItem)
            }
        })
    });
}

function deleteRso(id) {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM rsos WHERE rso_id = ?', id, async (err, results) => {
            if (err) {
                reject(err)
            } else {
                // const lastItem = results.pop()
                resolve(results)
            }
        })
    });
}

function deleteRsoUsers(id) {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM rso_members WHERE rso_id = ?', id, async (err, results) => {
            if (err) {
                reject(err)
            } else {
                // const lastItem = results.pop()
                resolve(results)
            }
        })
    });
}

function deleteRsoEvents(id) {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM rso_event WHERE rso_id = ?', id, async (err, results) => {
            if (err) {
                reject(err)
            } else {
                // const lastItem = results.pop()
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

function editComment(values, sql) {
    return new Promise((resolve, reject) => {
        pool.query(sql, values, async (err, results) => {
            if (err) {
                reject(err)
            } else {
                // console.log(results)
                // const lastItem = results.pop()
                resolve(results)
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
    getInsertedRso,
    addRsoAdmin,
    overlapping,
    getStuff,
    getLocation,
    addEvent,
    addRsoEvent,
    deleteRso,
    deleteRsoUsers,
    deleteRsoEvents,
    editComment

}