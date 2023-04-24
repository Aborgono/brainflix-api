const express = require('express');
const router = express.Router()
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');

function readVideosFile() {
    const videosList = fs.readFileSync("./data/videos.json");
    const parsedData = JSON.parse(videosList);
    return parsedData;
}


router.get("/", (req, res) => {
    const videos = readVideosFile();
    res.json(videos);
});

router.get("/:videoID", (req, res) => {
    const videos = readVideosFile();
    const specificVideo = videos.find((video) => {
        return video.id === req.params.videoID
    })
    res.json(specificVideo);
});

module.exports = router;