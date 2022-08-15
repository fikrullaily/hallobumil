import { buildAdminPath, extractAdmin } from ".";
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

    const adminId = req.query.adminId;
    const filePath = buildAdminPath();
    const adminData = extractAdmin(filePath);
    const selectedAdmin = adminData.findIndex((admin) => admin.id === adminId);

    const updateAdmin = {
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
    adminData.splice(selectedAdmin, 1, updateAdmin);
    fs.writeFileSync(filePath, JSON.stringify(adminData, null, 4));
    res.status(200).json({ adminData, selectedAdmin, msg: "Update Data" });
  } else if (req.method === "DELETE") {
    const adminId = req.query.adminId;
    const filePath = buildAdminPath();
    const adminData = extractAdmin(filePath);
    const selectedAdmin = adminData.findIndex((admin) => admin.id === adminId);
    adminData.splice(selectedAdmin, 1);
    fs.writeFileSync(filePath, JSON.stringify(adminData, null, 4));
    res.status(200).json({ adminData, selectedAdmin, msg: "Delete Data" });
  } else {
    const adminId = req.query.adminId;
    const filePath = buildAdminPath();
    const adminData = extractAdmin(filePath);
    const selectedAdmin = adminData.find((admin) => admin.id === adminId);
    fs.writeFileSync(filePath, JSON.stringify(adminData, null, 4));
    res.status(200).json({ admin: selectedAdmin });
  }
}

export default handler;
