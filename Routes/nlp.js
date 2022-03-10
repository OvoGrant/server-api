const express = require('express')
const pool = require('../db')
const router = express.Router()


router.get('/', async (req,res)=>{
    const date = req.body.date
    try{
        const result = await pool.query(`SELECT * FROM nlp WHERE data = $1`,[date]);
        res.status(200).json(result.rows);
    }catch(err){
        res.status(400).send({message: err.message});
    }
})


router.get('/stock/:id', async (req,res)=>{
    const stock = req.params.id;
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