const dotenv = require('dotenv')
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const restaurantRouter = require('./routers/restaurantRouter')

dotenv.config()
const port = process.env.PORT

const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/api/restaurant', restaurantRouter)

app.get('/', (req, res) => {
  res.send('The server is listening')
})

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.listen(port, () => {
  console.log('The server is running in port ' + port)
})
