import fs from "fs";
import path from "path";
import { dataUsers } from "/db";

export function buildUsersPath() {
  return path.join(process.cwd(), "data", "users.json");
}

export function extractUsers(filePath) {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
}
function handler(req, res) {
  var randomstring = require("randomstring");

  if (req.method === "GET") {
    res.status(200).send(dataUsers);
  } else if (req.method === "POST") {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const username = req.body.username;
    const phone = req.body.phone;
    const email = req.body.email;
    const password = req.body.password;
    const id_identifier = req.body.id_identifier;

    const newUsers = {
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
    const filePath = buildUsersPath();
    const data = extractUsers(filePath);
    data.push(newUsers);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ massage: "Success Register!!", users: newUsers });
  } else {
    const filePath = buildUsersPath();
    const data = extractUsers(filePath);
    res.status(200).json({ users: data });
  }
}

export default handler;
