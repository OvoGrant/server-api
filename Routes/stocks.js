const express = require('express')
const pool = require('../db')
const router = express.Router()
const db = require('../db')

router.get('/', async (req,res)=>{
    const results = await db.query('SELECT * FROM stocks ;')
    res.status(200).json(results.rows)  
})
     
router.post('/', async (req,res)=>{
    const symbol = req.body.symbol;
    const full_name = req.body.full_name;
    const country = req.body.country;
    const city = req.body.city;
    const queryString = `INSERT INTO stocks (symbol,full_name,country,city) VALUES ('${symbol}','${full_name}','${country}','${city}')`;
    try{
       await pool.query(queryString)
       res.status(201).send("created");
    }catch(err){
        res.status(500).json({message: err.message});
    }
})

router.get('/:symbol', async (req,res)=>{
    const symbol = req.params.symbol
    console.log(symbol)
    const querystring = `SELECT * FROM stocks WHERE symbol='${symbol}';`
    try{
        const response = await db.query(querystring);
        res.status(200).json(response.rows)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})


module.exports = router