const express = require('express');
const router = express.Router()
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');

async function readVideosFile() {
    try {
        const videosList = await fs.readFile(process.cwd() + "./data/videos.json", 'utf-8');
        const parsedData = JSON.parse(videosList);
        return parsedData;
    } catch (error) {
        // Handle the error and send an appropriate response
        console.error("Error reading or parsing videos file:", error);
        throw error; // You can choose to re-throw the error or send a response
    }
}

router.get("/", async (req, res) => {
    try {
        const videos = await readVideosFile();
        res.json(videos);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/:videoID", async (req, res) => {
    try {
        const videos = await readVideosFile();
        const specificVideo = videos.find((video) => {
            return video.id === req.params.videoID;
        });
        if (specificVideo) {
            res.json(specificVideo);
        } else {
            res.status(404).json({ error: "Video not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// function readVideosFile() {
//     const videosList = fs.readFileSync("./data/videos.json");
//     const parsedData = JSON.parse(videosList);
//     return parsedData;
// }


// router.get("/", (req, res) => {
//     const videos = readVideosFile();
//     res.json(videos);
// });

// router.get("/:videoID", (req, res) => {
//     const videos = readVideosFile();
//     const specificVideo = videos.find((video) => {
//         return video.id === req.params.videoID
//     })
//     res.json(specificVideo);
// });

module.exports = router;