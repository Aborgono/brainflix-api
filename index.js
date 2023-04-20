const express = require ('express')
const fs = require(`fs`);
const process =  require(`process`);
const cors = require('cors');
const videos = require('./routes/videos');
const app = express()

app.use(cors());
app.use(express.json());

app.listen(8080, function(){
    console.log('Server is running on port 8080');
})

app.use(`/videos`, videos)
// app.use(`/upload`, upload)