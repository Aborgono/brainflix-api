const fs = require(`fs`);
const { v4: uuidv4 } = require('uuid');
const express = require('express');
const router = express.Router();

function readVideosFile() {
    const videosList = fs.readFileSync("../data/videos.json");
    const parsedData = JSON.parse(videosList);
    return parsedData;
}

router.post("/", (req, res) => {    
    const newVideo = {
        id: uuidv4(),
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        timestamp: Date.now(),
        channel: req.body.channel
    };

    const videos = readVideosFile();
    videos.push(newVideo);
    fs.writeFileSync("./data/videos.json", JSON.stringify(videos));


    res.status(201).json(videos);
});


module.exports = router;