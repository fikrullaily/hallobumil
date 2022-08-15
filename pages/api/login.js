import { dataAdmin, dataCmsUser } from "../../db";
import { dataUsers } from "../../db";

export default function handler(req, res) {
  const { email, password } = req.body;

  const findUser = dataUsers.find(
    (u) => u.email === email && u.password === password
  );

  const findAdmin = dataAdmin.find(
    (a) => a.email === email && a.password === password
  );

  const findCmsUser = dataCmsUser.find(
    (a) => a.email === email && a.password === password
  );

  if (findUser) {
    res.status(200).json({
      user: findUser,
      massage: "Success Login",
      username: findUser.username,
      token: findUser.token,
      roleAccess: findUser.roleAccess,
    });
  } else if (findAdmin) {
    res.status(200).json({
      user: findAdmin,
      massage: "Success Login",
      username: findAdmin.username,
      token: findAdmin.token,
      roleAccess: findAdmin.roleAccess,
    });
  } else if (findCmsUser) {
    res.status(200).json({
      user: findCmsUser,
      massage: "Success Login",
      username: findCmsUser.username,
      token: findCmsUser.token,
      roleAccess: findCmsUser.roleAccess,
    });
  } else {
    res.status(400).json({ massage: "You're Not Login" });
  }
}
