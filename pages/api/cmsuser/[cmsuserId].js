import { buildCmsUserPath, extractCmsUser } from "../cmsuser";
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
    const id_identifier = req.body.id_identifier;
    const token = req.body.token;

    const cmsuserId = req.query.cmsuserId;
    const filePath = buildCmsUserPath();
    const cmsuserData = extractCmsUser(filePath);
    const selectedCmsUser = cmsuserData.findIndex(
      (cmsuser) => cmsuser.id === cmsuserId
    );

    const updateCmsUser = {
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
    cmsuserData.splice(selectedCmsUser, 1, updateCmsUser);
    fs.writeFileSync(filePath, JSON.stringify(cmsuserData, null, 4));
    res.status(200).json({ cmsuserData, selectedCmsUser, msg: "Update Data" });
  } else if (req.method === "DELETE") {
    const cmsuserId = req.query.cmsuserId;
    const filePath = buildCmsUserPath();
    const cmsuserData = extractCmsUser(filePath);
    const selectedCmsUser = cmsuserData.findIndex(
      (cmsuser) => cmsuser.id === cmsuserId
    );
    cmsuserData.splice(selectedCmsUser, 1);
    fs.writeFileSync(filePath, JSON.stringify(cmsuserData, null, 4));
    res.status(200).json({ cmsuserData, selectedCmsUser, msg: "Delete Data" });
  } else {
    const cmsuserId = req.query.cmsuserId;
    const filePath = buildCmsUserPath();
    const cmsuserData = extractCmsUser(filePath);
    const selectedCmsUser = cmsuserData.find(
      (cmsuser) => cmsuser.id === cmsuserId
    );
    fs.writeFileSync(filePath, JSON.stringify(cmsuserData, null, 4));
    res.status(200).json({ cmsuser: selectedCmsUser });
  }
}

export default handler;
