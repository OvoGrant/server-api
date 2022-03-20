const express = require('express')
const pool = require('../db')
const router = express.Router()
const db = require('../db')



router.post('/', async (req,res)=>{
    const user_id = req.body.user_id;
    const symbol = req.body.symbol;
    console.log(user_id);
    console.log(symbol)
    const queryString = `INSERT INTO watchlist (user_id,symbol) VALUES ('${user_id}','${symbol}');`;
    try{
        await pool.query(queryString);
        res.status(201).send(`${symbol} was successfully added to your watchlist`);
    }catch(err){
        res.status(404).send(err.message);
    }
})

router.delete('/',async (req,res)=>{
    const user_id = req.body.user_id;
    const symbol = req.body.symbol;
    const queryString = `DELETE  FROM watchlist where symbol = '${symbol} and user_id = '${user_id}'`;
    try{
        await pool.query(queryString);
        res.status(404).send(`${symbol} was successfully removed from your watchlist`);
    }catch(err){
        res.status(404).send("failures");
    }
})

router.get('/:id', async (req,res)=>{
    const user_id = req.params.id;
    const queryString = `SELECT * FROM watchlist WHERE id='${user_id}';`;
    try{
        const response = await pool.query(queryString);
        console.log(response.rows)
        res.status(200).json(response.rows);
    }catch(err){

    }
})



module.exports = router
