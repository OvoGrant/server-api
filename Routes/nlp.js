const express = require('express')
const pool = require('../db')
const router = express.Router()


router.get('/', async (req,res)=>{
    try{
        const result = await pool.query(`SELECT * FROM nlp`);
        res.status(200).json(result.rows);
    }catch(err){
        res.status(400).send({message: err.message});
    }
})

router.post('/', async (req,res)=>{
    const symbol = req.body.symbol
    const compound = req.body.compound
    const date = req.body.Date
    const source = req.body.source
    try{
        await pool.query(`INSERT INTO nlp (symbol,compound, source, "Date") VALUES ('${symbol}','${compound}','${source}', '${date}');`);
        res.status(201).send("Good Job little guy");
    }catch(err){
        res.status(404).send({message: err.message})
    }
})

router.get('/:stock_id/:start/:end', async (req,res)=>{
    const stock = req.stock_id;
    const start = req.body.start;
    const end = req.body.end;
    try{
        const result = await pool.query(`SELECT * FROM nlp where symbol is '${stock}' AND date BETWEEN ${start} AND ${end};`);
        res.status(200).json(result.rows);
    }catch(err){
        res.status(400).send({message: err.message});
    }
})


module.exports = router