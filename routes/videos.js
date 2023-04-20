const express = require('express');
const router = express.Router() // To use router, insrtantiate it like this
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


// POST endpoint to add a athlete
router.post("/upload", (req, res) => {    
    // Make a new athlete with a unique id
    console.log(req.body);
    const newVideo = {
        id: uuidv4(),
        title: req.body.title,
        description: req.body.description,
    };

    // 1. Read the current athletes array
    // 2. Add to the athletes array
    // 3. Write the entire new athletes array to the file
    const videos = readVideosFile();
    videos.push(newVideo);
    fs.writeFileSync("../data/videos.json", JSON.stringify(videos));

    // Respond with the athlete that was created
    res.status(201).json(newVideo);
});

module.exports = router;