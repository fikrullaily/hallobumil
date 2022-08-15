import { buildUsersPath, extractUsers } from "../users";
import fs from "fs";

function handler(req, res) {
  if (req.method === "PUT") {
    const id = req.body.id;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const username = req.body.username;
    const phone = req.body.phone;
    const email = req.body.email;
    const password = req.body.password;
    const token = req.body.token;

    const userId = req.query.userId;
    const filePath = buildUsersPath();
    const userData = extractUsers(filePath);
    const selectedUser = userData.findIndex((user) => user.id === userId);

    const updateUser = {
      id: id,
      firstname: firstname,
      lastname: lastname,
      username: username,
      phone: phone,
      email: email,
      password: password,
      id_identifier: id_identifier,
      token: token,
    };
    userData.splice(selectedUser, 1, updateUser);
    fs.writeFileSync(filePath, JSON.stringify(userData, null, 4));
    res.status(200).json({ userData, selectedUser, msg: "Update Data" });
  } else if (req.method === "DELETE") {
    const userId = req.query.userId;
    const filePath = buildUsersPath();
    const userData = extractUsers(filePath);
    const selectedUser = userData.findIndex((user) => user.id === userId);
    userData.splice(selectedUser, 1);
    fs.writeFileSync(filePath, JSON.stringify(userData, null, 4));
    res.status(200).json({ userData, selectedUser, msg: "Delete Data" });
  } else {
    const userId = req.query.userId;
    const filePath = buildUsersPath();
    const userData = extractUsers(filePath);
    const selectedUser = userData.find((user) => user.id === userId);
    fs.writeFileSync(filePath, JSON.stringify(userData, null, 4));
    res.status(200).json({ user: selectedUser });
  }
}

export default handler;
