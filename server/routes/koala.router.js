const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION


// GET Erin
router.get('/', (req, res) => {
    let queryText = `SELECT * FROM "koalas";`
    pool.query(queryText).then((result)=>{
        console.log(result);
        res.send(result.rows); //result.rows will be an Aray
    }).catch((error)=> {
        console.log(`Error in getKoalas ${error}`);
        res.sendStatus(500);
    });
    console.log(`in GetKoals`);
}); 

// POST Anthony 


// PUT Tiana


// DELETE Nick 

module.exports = koalaRouter;