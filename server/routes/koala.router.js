const express = require('express');
const koalaRouter = express.Router();

const pg = require('pg');
const Pool = pg.Pool; //class


// DB CONNECTION
const pool = new Pool({
    database: 'koalla-holla', //the agreed upon name
    host: 'localhost', // we all have our own on our comps
    port: 5432, //default
    max: 10, //to prevent overload
    idleTimeoutMillis: 10000 //10 secs to not waste time
});

// GET


// POST
koalaRouter.post('/', (req, res) => {
    const newKoala = req.body;
    console.log(newKoala);
    
    let queryText = `INSERT INTO "koalas" ("name", "gender", "age", "ready_to_transfer", "notes")
                     VALUES ($1, $2, $3, $4, $5);`;
    pool.query(queryText, [newKoala.name, newKoala.gender, newKoala.age, newKoala.ready_to_transfer, newKoala.notes]).then((dbres) => {
        console.log(dbres);
        res.sendStatus(201);
    }).catch((error) => {
        console.log('error in POST /koala', error);
        res.sendStatus(500);
    })
})

// PUT


// DELETE
//
koalaRouter.delete('/:id', (req, res) => {
    console.log('Params',req.params); 
    const queryText = `DELETE * FROM "koalas" WHERE "id" = $1;`;
    pool.query(queryText, [req.params.id]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('Error in DELETE /koala', error);
        res.sendStatus(500);
    });
});

module.exports = koalaRouter;