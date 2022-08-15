import fs from "fs";
import path from "path";
import { dataCmsUser } from "/db";

export function buildCmsUserPath() {
  return path.join(process.cwd(), "data", "cmsuser.json");
}

export function extractCmsUser(filePath) {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
}

function handler(req, res) {
  var randomstring = require("randomstring");

  if (req.method === "GET") {
    res.status(200).send(dataCmsUser);
  } else if (req.method === "POST") {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const username = req.body.username;
    const phone = req.body.phone;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;

    const newCmsUser = {
      id: randomstring.generate(5),
      firstname: firstname,
      lastname: lastname,
      username: username,
      phone: phone,
      email: email,
      password: password,
      roleAccess: role,
      token: randomstring.generate(),
    };

    // store in database or a file
    const filePath = buildCmsUserPath();
    const data = extractCmsUser(filePath);
    data.push(newCmsUser);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
    res
      .status(201)
      .json({ massage: "Success Register!!", cmsuser: newCmsUser });
  } else {
    const filePath = buildCmsUserPath();
    const data = extractCmsUser(filePath);
    res.status(200).json({ cmsuser: data });
  }
}

export default handler;
