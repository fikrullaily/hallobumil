import fs from "fs";
import path from "path";
import { dataVideo } from "/db";

export function buildVideoPath() {
  return path.join(process.cwd(), "data", "videoedukasi.json");
}

export function extractVideo(filePath) {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
}

function handler(req, res) {
  var randomstring = require("randomstring");

  if (req.method === "GET") {
    res.status(200).send(dataVideo);
  } else if (req.method === "POST") {
    const title = req.body.title;
    const url = req.body.url;
    const publish = req.body.publish;

    const newVideo = {
      id: randomstring.generate(5),
      title: title,
      publish: publish,
      url: url,
    };

    // store in database or a file
    const filePath = buildVideoPath();
    const data = extractVideo(filePath);
    data.push(newVideo);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
    res
      .status(201)
      .json({ massage: "Success Add New Video!!", videos: newVideo });
  } else {
    const filePath = buildVideoPath();
    const data = extractVideo(filePath);
    res.status(200).json({ videos: data });
  }
}

export default handler;
