import { buildVideoPath, extractVideo } from "../videoedukasi";
import fs from "fs";

function handler(req, res) {
  if (req.method === "PUT") {
    const id = req.body.id;
    const title = req.body.title;
    const url = req.body.url;
    const publish = req.body.publish;

    const videoId = req.query.videoId;
    const filePath = buildVideoPath();
    const videoData = extractVideo(filePath);
    const selectedVideo = videoData.findIndex((video) => video.id === videoId);

    const updateVideo = {
      id: id,
      title: title,
      url: url,
      publish: publish,
    };
    videoData.splice(selectedVideo, 1, updateVideo);
    fs.writeFileSync(filePath, JSON.stringify(videoData, null, 4));
    res.status(200).json({ videoData, selectedVideo, msg: "Update Data" });
  } else if (req.method === "DELETE") {
    const videoId = req.query.videoId;
    const filePath = buildVideoPath();
    const videoData = extractVideo(filePath);
    const selectedVideo = videoData.findIndex((video) => video.id === videoId);
    videoData.splice(selectedVideo, 1);
    fs.writeFileSync(filePath, JSON.stringify(videoData, null, 4));
    res.status(200).json({ videoData, selectedVideo, msg: "Delete Data" });
  } else {
    const videoId = req.query.videoId;
    const filePath = buildVideoPath();
    const videoData = extractVideo(filePath);
    const selectedVideo = videoData.find((video) => video.id === videoId);
    fs.writeFileSync(filePath, JSON.stringify(videoData, null, 4));
    res.status(200).json({ videos: selectedVideo });
  }
}

export default handler;
