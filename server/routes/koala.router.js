const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION


// GET


// POST


// PUT


// DELETE
//
router.delete('/:id', (req, res) => {
    console.log('Params',req.params); 
    const queryText = `DELETE FROM "koala" WHERE "id" = $1`;
    pool.query(queryText, [req.params.id]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('Error in DELETE /koala', error);
        res.sendStatus(500);
    });
});
module.exports = koalaRouter;