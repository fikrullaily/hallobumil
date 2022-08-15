import fs from "fs";
import path from "path";
import { dataArtikel } from "/db";

export function buildArtikelPath() {
  return path.join(process.cwd(), "data", "artikelmingguan.json");
}

export function extractArtikel(filePath) {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
}

function handler(req, res) {
  var randomstring = require("randomstring");

  if (req.method === "GET") {
    res.status(200).send(dataArtikel);
  } else if (req.method === "POST") {
    const title = req.body.title;
    const url = req.body.url;
    const publish = req.body.publish;
    const artikel = req.body.artikel;

    const newArtikel = {
      id: randomstring.generate(5),
      title: title,
      publish: publish,
      url: url,
      artikel: artikel,
    };

    // store in database or a file
    const filePath = buildArtikelPath();
    const data = extractArtikel(filePath);
    data.push(newArtikel);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
    res
      .status(201)
      .json({ massage: "Success Add New Artikel!!", artikels: newArtikel });
  } else {
    const filePath = buildArtikelPath();
    const data = extractArtikel(filePath);
    res.status(200).json({ artikels: data });
  }
}

export default handler;
