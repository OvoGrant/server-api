const {Pool , Client} = require('pg')
const conn = process.env.DATABASE_URL
const pool = new Pool({conn})
  
module.exports = pool