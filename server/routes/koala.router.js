const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION


// GET


// POST


// PUT
router.put('/:id', (req,res) => {
    const queryText = `UPDATE "koalas" SET "ready_to_transfer" = true;`;
    pool.query(queryText, [req.params.id]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error into PUT "koalas" in "ready_to_transfer"');
    });
})

// DELETE

module.exports = koalaRouter;