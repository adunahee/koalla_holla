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

// GET Erin **working as of 2:04 pm**
koalaRouter.get('/:colName', (req, res) => {
    //console.log('in /koalas GET and colName is', req.params.colName);
    let colName = req.params.colName;
    if( colName == "name" || colName == "age" || colName == "gender" || colName == "ready_to_transfer"){
        //scrubbing col name doesnt allow sorting
        let queryText = `SELECT * FROM "koalas" ORDER BY ${req.params.colName};`;

        pool.query(queryText, [req.params.colName]).then((result) => {
            //console.log(result);

            res.send(result.rows); //result.rows will be an Aray
        }).catch((error) => {
            console.log(`Error in getKoalas ${error}`);
            res.sendStatus(500);
        });
    } else {
        console.log(`In GET, colName is not valid`, colName);
        res.sendStatus(500);
    }
    
    
    //console.log(`in GetKoalas`);
}); 

// POST
koalaRouter.post('/', (req, res) => {
    const newKoala = req.body;
    //console.log('in post', newKoala);
    
    let queryText = `INSERT INTO "koalas" ("name", "gender", "age", "ready_to_transfer", "notes")
                     VALUES ($1, $2, $3, $4, $5);`;
    pool.query(queryText, [newKoala.name, newKoala.gender, newKoala.age, newKoala.ready_to_transfer, newKoala.notes]).then((dbres) => {
        //console.log(dbres);
        res.sendStatus(201);
    }).catch((error) => {
        console.log('error in POST /koala', error);
        res.sendStatus(500);
    })
})

// PUT
//Tianas.... working
koalaRouter.put('/transfer/:id', (req,res) => {
    //console.log('in PUT', req.params.id );
    
    const queryText = `UPDATE "koalas" SET "ready_to_transfer" = NOT "ready_to_transfer" WHERE "id" = $1;`;
    pool.query(queryText, [req.params.id]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error into PUT "koalas" in "ready_to_transfer"', error);
        res.sendStatus(500);
    });
})

// DELETE
koalaRouter.delete('/:id', (req, res) => {
    //console.log('Params',req.params); 
    const queryText = `DELETE FROM "koalas" WHERE "id" = $1;`;
    pool.query(queryText, [req.params.id]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        //console.log('Error in DELETE /koala', error);
        res.sendStatus(500);
    });
});

module.exports = koalaRouter;