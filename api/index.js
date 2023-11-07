// import { promises as fs} from 'fs'
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


// ,
//     "headers": [
//       {
//         "source": "/api/(.*)",
//         "headers": [
//           { "key": "Access-Control-Allow-Credentials", "value": "true" },
//           { "key": "Access-Control-Allow-Origin", "value": "*" },
//           { "key": "Access-Control-Allow-Methods", "value": "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
//           { "key": "Access-Control-Allow-Headers", "value": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" }
//         ]
//       }
//     ]