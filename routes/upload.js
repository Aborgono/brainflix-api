const fs = require(`fs`);
const { v4: uuidv4 } = require('uuid');
const express = require('express');
const router = express.Router();

function readVideosFile() {
    const videosList = fs.readFileSync("./data/videos.json");
    const parsedData = JSON.parse(videosList);
    return parsedData;
}


// router.get("/", (req, res) => {
//     const videos = readVideosFile();
//     console.log(videos);
//     res.json(videos);
// });

// POST endpoint to add a athlete
router.post("/", (req, res) => {    
    // Make a new athlete with a unique id
    console.log(req.body);
    const newVideo = {
        id: uuidv4(),
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        timestamp: Date.now(),
        channel: req.body.channel
    };

    // 1. Read the current athletes array
    // 2. Add to the athletes array
    // 3. Write the entire new athletes array to the file
    const videos = readVideosFile();
    console.log(videos);
    console.log(newVideo);
    videos.push(newVideo);
    fs.writeFileSync("./data/videos.json", JSON.stringify(videos));

    // Respond with the athlete that was created
    res.status(201).json(videos);
});

router.delete("/:videoID", (req, res) => {
    /* TODO: ACTUALLY DELETE NOTE */

    /* TODO: ACTUALLY DO THESE STEPS */
    // 1. Read from the file
    // 2. Mutate the array to remove the athlete with that id
    // 3. Write the new array to the file
    const videos = readVideosFile();
    const remainingVideos = videos.filter((video) => {
        return video.id !== req.params.videoID
    });
    fs.writeFileSync("./data/videos.json", JSON.stringify(remainingVideos));

    // Respond with a message that the athlete has been deleted
    res.status(200).send('Successfully deleted video');
});

module.exports = router;