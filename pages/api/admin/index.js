import fs from "fs";
import path from "path";
import { dataAdmin } from "/db";

export function buildAdminPath() {
  return path.join(process.cwd(), "data", "admin.json");
}

export function extractAdmin(filePath) {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
}

function handler(req, res) {
  var randomstring = require("randomstring");

  if (req.method === "GET") {
    res.status(200).send(dataAdmin);
  } else if (req.method === "POST") {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const username = req.body.username;
    const phone = req.body.phone;
    const email = req.body.email;
    const password = req.body.password;
    const id_identifier = req.body.id_identifier;

    const newAdmin = {
      id: randomstring.generate(5),
      firstname: firstname,
      lastname: lastname,
      username: username,
      phone: phone,
      email: email,
      password: password,
      id_identifier: id_identifier,
      token: randomstring.generate(),
    };

    // store in database or a file
    const filePath = buildAdminPath();
    const data = extractAdmin(filePath);
    data.push(newAdmin);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
    res.status(201).json({ massage: "Success Register!!", admin: newAdmin });
  } else {
    const filePath = buildAdminPath();
    const data = extractAdmin(filePath);
    res.status(200).json({ admin: data });
  }
}

export default handler;
