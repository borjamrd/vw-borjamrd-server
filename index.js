

const express = require('express'),
      cors = require('cors'),
      bodyParser = require('body-parser')

const app = express()
const port = 3002;
app.use(cors());
app.use(bodyParser.json());

const logger = require('./middleware/logger404')


app.use('/api', require('./routes'))
app.use(logger)
app.use((req, res) => {
    res.status(404).json({error:'not found'})

})

app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})





