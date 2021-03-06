const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors') 

connectToMongo();
const app = express()
const PORT =process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use(express.static(__dirname+'../public/'))  //All the uplaods will be transfered in public folder

// Available Routes
app.use('', require('./routes/auth'))
app.use('', require('./routes/profile'))
app.use('', require('./routes/livechat'))


app.listen(PORT, () => {
  console.log(`kr1da backend listening at http://localhost:${PORT}`)
})