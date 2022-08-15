import { buildArtikelPath, extractArtikel } from "../artikelmingguan";
import fs from "fs";

function handler(req, res) {
  if (req.method === "PUT") {
    const id = req.body.id;
    const title = req.body.title;
    const url = req.body.url;
    const publish = req.body.publish;
    const artikel = req.body.artikel;

    const artikelId = req.query.artikelId;
    const filePath = buildArtikelPath();
    const artikelData = extractArtikel(filePath);
    const selectedArtikel = artikelData.findIndex(
      (artikel) => artikel.id === artikelId
    );

    const updateArtikel = {
      id: id,
      title: title,
      url: url,
      publish: publish,
      artikel: artikel,
    };
    artikelData.splice(selectedArtikel, 1, updateArtikel);
    fs.writeFileSync(filePath, JSON.stringify(artikelData, null, 4));
    res.status(200).json({ artikelData, selectedArtikel, msg: "Update Data" });
  } else if (req.method === "DELETE") {
    const artikelId = req.query.artikelId;
    const filePath = buildArtikelPath();
    const artikelData = extractArtikel(filePath);
    const selectedArtikel = artikelData.findIndex(
      (artikel) => artikel.id === artikelId
    );
    artikelData.splice(selectedArtikel, 1);
    fs.writeFileSync(filePath, JSON.stringify(artikelData, null, 4));
    res.status(200).json({ artikelData, selectedArtikel, msg: "Delete Data" });
  } else {
    const artikelId = req.query.artikelId;
    const filePath = buildArtikelPath();
    const artikelData = extractArtikel(filePath);
    const selectedArtikel = artikelData.find(
      (artikel) => artikel.id === artikelId
    );
    fs.writeFileSync(filePath, JSON.stringify(artikelData, null, 4));
    res.status(200).json({ artikels: selectedArtikel });
  }
}

export default handler;
