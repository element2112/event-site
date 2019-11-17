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

function getUsers(user) {    
    // console.log(usr)
    return new Promise((resolve, reject) => {
        // let usr = []
        // let temp = {}
        // if(users){
            // for (user of users) {
                pool.query('SELECT * FROM users WHERE email = ?', user, async (err, results) => {
                    if (err) 
                        reject(err)
                    else
                        resolve(results)
                    // temp = {user_id:results[0].user_id, uni_id:results[0].uni_id }
                    // usr.push(temp)
                    // console.log(usr)
                })
            // }
            // resolve(usr)
        // }   
        // else{
        //     const error = new Error("not enough users")
        //     reject(error)
        // }
    });
}

function addRsoAdmin(admin) {
    return new Promise((resolve, reject) => {
        
        // for (user of users) {
            fields = {user_id,uni_id} = admin
            pool.query('INSERT INTO admins SET ?', fields, async (err, results) => {
                if (err) 
                    reject(err)
                // usr.push(results)
                console.log(results)
                resolve()
            })
        // }
       

    });
}

module.exports = {
    createRso,
    getRso,
    getUsers,
    addRsoAdmin
}