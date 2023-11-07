const express = require ('express')
const fs = require(`fs`);
const cors = require('cors');
const videos = require('./videos');
const upload = require('./upload')
const app = express()

app.use(cors());
app.use(express.json());

app.listen(8080, function(){
    console.log('Server is running on port 8080');
})

app.use(`/api/videos`, videos)
app.use(`/api/upload`, upload)

app.get('/', (req, res) => {
    res.send('Hey this is my API running 🥳')
})

module.exports = app