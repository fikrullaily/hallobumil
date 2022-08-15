import React, { useEffect, useState, useRef } from "react";
import styles from "../styles/CmsAdmin.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPen,
  faWindowClose,
  faInfoCircle,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import ModalAdmin from "react-modal";
import AdminDetail from "react-modal";
import EditAdmin from "react-modal";
import Swal from "sweetalert2";
import Layout from "./components/Layout";
import Head from "next/dist/shared/lib/head";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAdmin,
  editAdmin,
  getAdmin,
} from "../redux/actions/adminActions";
import Cookie from "js-cookie";
import { requireAuthentication } from "../utils/useAuth";

(ModalAdmin, AdminDetail, EditAdmin).setAppElement();

export default function CmsAdmin(props) {
  // MODAL
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [descModalIsOpen, setdescModalIsOpen] = useState(false);
  const [editModalIsOpen, seteditModalIsOpen] = useState(false);

  // Visible or Non Visible Password
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  // Get Data
  const dispatch = useDispatch();
  const allAdmin = useSelector((state) => state.Admin);
  const { loading, error, admins } = allAdmin;

  // LOAD DATA
  useEffect(() => {
    dispatch(getAdmin());
  }, []);

  //Add Data
  const firstname = useRef();
  const lastname = useRef();
  const username = useRef();
  const phone = useRef();
  const email = useRef();
  const password = useRef();
  const id_identifier = useRef();

  function submitHandler(e) {
    e.preventDefault();

    const enteredFirstname = firstname.current.value;
    const enteredLastname = lastname.current.value;
    const enteredUsername = username.current.value;
    const enteredPhone = phone.current.value;
    const enteredEmail = email.current.value;
    const enteredPassword = password.current.value;
    const enteredId_Identifier = id_identifier.current.value;

    const reqBody = {
      firstname: enteredFirstname,
      lastname: enteredLastname,
      username: enteredUsername,
      phone: enteredPhone,
      email: enteredEmail,
      password: enteredPassword,
      id_identifier: enteredId_Identifier,
    };

    fetch("/api/admin", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));

    Swal.fire(
      "Success Register New Admin!",
      "Admin " + firstname.current.value + " as New Admin!",
      "success"
    );

    firstname.current.value = "";
    lastname.current.value = "";
    username.current.value = "";
    phone.current.value = "";
    email.current.value = "";
    password.current.value = "";
  }

  // Detail Admin
  const [adminDetail, setAdminDetail] = useState({
    firstname: "",
    lastname: "",
    username: "",
    phone: "",
    email: "",
    id_identifier: "",
  });

  const handleDetail = (admin) => {
    setAdminDetail({
      firstname: admin.firstname,
      lastname: admin.lastname,
      username: admin.username,
      phone: admin.phone,
      email: admin.email,
      id_identifier: admin.id_identifier,
    });
    console.log("Detail Admin " + admin.username);
  };

  // EDIT DATA
  const handleChangeEdit = (e) => {
    let data = { ...adminEdit };
    data[e.target.name] = e.target.value;
    setAdminEdit(data);
  };

  const [adminEdit, setAdminEdit] = useState({
    firstname: "",
    lastname: "",
    username: "",
    phone: "",
    email: "",
    password: "",
    id_identifier: "",
  });

  const handleEdit = (admin) => {
    setAdminEdit({
      id: admin.id,
      token: admin.token,
      firstname: admin.firstname,
      lastname: admin.lastname,
      username: admin.username,
      phone: admin.phone,
      email: admin.email,
      password: admin.password,
      id_identifier: admin.id_identifier,
    });
    console.log("Admin = " + admin.id);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    dispatch(
      editAdmin({
        id: adminEdit.id,
        firstname: adminEdit.firstname,
        lastname: adminEdit.lastname,
        username: adminEdit.username,
        phone: adminEdit.phone,
        email: adminEdit.email,
        password: adminEdit.password,
        id_identifier: adminEdit.id_identifier,
        token: adminEdit.token,
      })
    );

    Swal.fire(
      "Success Edit Admin!",
      "Admin " + adminEdit.username + " Update!",
      "success"
    );

    setAdminEdit({
      firstname: "",
      lastname: "",
      username: "",
      phone: "",
      email: "",
      password: "",
    });
  };

  // SEARCH DATA
  const [inputSearch, setInputSearch] = useState("");
  const handleChangeSearch = (e) => {
    e.preventDefault();
    setInputSearch(e.target.value);
  };

  return (
    <>
      <Head>
        <title>Super Admin</title>
      </Head>

      <Layout />

      {/* MODAL ADD ADMIN */}
      <ModalAdmin
        isOpen={modalIsOpen}
        ariaHideApp={false}
        style={{
          content: {
            top: "90px",
            left: "230px",
            right: "40px",
            bottom: "40px",
            backgroundColor: "rgba(245, 140, 139, 1)",
          },
          overlay: { backgroundColor: "#C4C4C4" },
        }}
      >
        <button
          onClick={() => setModalIsOpen(false)}
          style={{ float: "right" }}
          className={styles.btnAction}
        >
          <FontAwesomeIcon
            icon={faWindowClose}
            size="2x"
            style={{ color: "black" }}
          />
        </button>
        <h1 className="title-modal" style={{ fontSize: "30px" }}>
          New SuperAdmin
        </h1>
        <div className="form-cont">
          <form id="form" className="form">
            <div className="form-group">
              <input
                type="input"
                className="input-form"
                placeholder="firstname"
                name="Fname"
                ref={firstname}
              />

              <input
                type="input"
                className="input-form"
                placeholder="lastname"
                name="lastname"
                ref={lastname}
              />
            </div>
            <div className="form-group">
              <input
                type="input"
                className="input-form"
                placeholder="username"
                name="username"
                ref={username}
              />

              <input
                type="input"
                className="input-form"
                placeholder="phone"
                name="phone"
                ref={phone}
              />
            </div>
            <div className="form-group">
              <input
                type="input"
                className="input-form1"
                placeholder="email"
                name="email"
                ref={email}
              />
            </div>
            <div className="form-group">
              <input
                type={passwordShown ? "text" : "password"}
                className="input-form1"
                placeholder="password"
                name="password"
                ref={password}
              />
              <FontAwesomeIcon
                icon={passwordShown ? faEye : faEyeSlash}
                onClick={togglePassword}
                className="icon-visible"
              />
            </div>
            <div className="form-group" style={{ display: "none" }}>
              <input
                type="text"
                name="id_identifier"
                placeholder="id_identifier"
                className="input-form1"
                ref={id_identifier}
                value="2"
                disabled
              />
            </div>
            <div className="form-group">
              <div className="button">
                <button
                  className="btnCreate"
                  type="button"
                  onClick={submitHandler}
                >
                  <span>Submit</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </ModalAdmin>

      {/* MODAL DETAIL ADMIN >> datanya msh manual */}
      <AdminDetail
        isOpen={descModalIsOpen}
        ariaHideApp={false}
        style={{
          content: {
            top: "90px",
            left: "230px",
            right: "40px",
            bottom: "40px",
            backgroundColor: "rgba(245, 140, 139, 1)",
          },
          overlay: { backgroundColor: "#C4C4C4" },
        }}
      >
        <button
          onClick={() => setdescModalIsOpen(false)}
          style={{ float: "right" }}
          className={styles.btnAction}
        >
          <FontAwesomeIcon
            icon={faWindowClose}
            size="2x"
            style={{ color: "black" }}
          />
        </button>
        <h1 className="title-modal" style={{ fontSize: "30px" }}>
          Detail SuperAdmin
        </h1>
        <section className={styles.card}>
          <div className={styles.items}>
            <div className={styles.item}>Email</div>
            <div className={styles.item}>Username</div>
            <div className={styles.item}>Firstname</div>
            <div className={styles.item}>Lastname</div>
            <div className={styles.item}>Number Phone</div>
            <div className={styles.item}>Id Identifier</div>
          </div>
        </section>
        <section className={styles.card2}>
          <div className={styles.items}>
            <div className={styles.item}>{adminDetail.email}</div>
            <div className={styles.item}>{adminDetail.username}</div>
            <div className={styles.item}>{adminDetail.firstname}</div>
            <div className={styles.item}>{adminDetail.lastname}</div>
            <div className={styles.item}>{adminDetail.phone}</div>
            <div className={styles.item}>{adminDetail.id_identifier}</div>
          </div>
        </section>
      </AdminDetail>

      {/* MODAL EDIT ADMIN */}
      <EditAdmin
        isOpen={editModalIsOpen}
        ariaHideApp={false}
        style={{
          content: {
            top: "90px",
            left: "230px",
            right: "40px",
            bottom: "40px",
            backgroundColor: "rgba(245, 140, 139, 1)",
          },
          overlay: { backgroundColor: "#C4C4C4" },
        }}
      >
        <button
          onClick={() => seteditModalIsOpen(false)}
          style={{ float: "right" }}
          className={styles.btnAction}
        >
          <FontAwesomeIcon
            icon={faWindowClose}
            size="2x"
            style={{ color: "black" }}
          />
        </button>
        <h1 className="title-modal" style={{ fontSize: "30px" }}>
          Edit SuperAdmin
        </h1>
        <div className="form-cont">
          <form id="form" className="form">
            <div className="form-group" style={{ display: "none" }}>
              <input
                type="input"
                className="input-form"
                placeholder="id"
                name="id"
                value={adminEdit.id}
                disabled
              />
              <input
                type="input"
                className="input-form"
                placeholder="token"
                name="token"
                value={adminEdit.token}
                disabled
              />
            </div>
            <div className="label">
              <label>firstname</label>
            </div>
              <div className="form-group">
              <input
                type="input"
                className="input-form"
                placeholder="firstname"
                name="firstname"
                onChange={handleChangeEdit}
                value={adminEdit.firstname}
              />
            <div className="label">
              <label>lastname</label>
            </div>
              <input
                type="input"
                className="input-form"
                placeholder="lastname"
                name="lastname"
                onChange={handleChangeEdit}
                value={adminEdit.lastname}
              />
            </div>
            <div className="label">
              <label>username</label>
            </div>
            <div className="form-group">
              <input
                type="input"
                className="input-form"
                placeholder="username"
                name="username"
                onChange={handleChangeEdit}
                value={adminEdit.username}
              />
            <label>number phone</label>
              <input
                type="input"
                className="input-form"
                placeholder="phone"
                name="phone"
                onChange={handleChangeEdit}
                value={adminEdit.phone}
              />
            </div>
            <div className="label">
              <label>email</label>
            </div>
            <div className="form-group">
              <input
                type="input"
                className="input-form1"
                placeholder="email"
                name="email"
                onChange={handleChangeEdit}
                value={adminEdit.email}
              />
            </div>
            <div className="label">
              <label>password</label>
            </div>
            <div className="form-group">
              <input
                type={passwordShown ? "text" : "password"}
                className="input-form1"
                placeholder="password"
                name="password"
                onChange={handleChangeEdit}
                value={adminEdit.password}
              />
              <FontAwesomeIcon
                icon={passwordShown ? faEye : faEyeSlash}
                onClick={togglePassword}
                className="icon-visible"
              />
            </div>
            <div className="form-group" style={{ display: "none" }}>
              <input
                type="input"
                className="input-form1"
                placeholder="role"
                name="id_identifier"
                onChange={handleChangeEdit}
                value={adminEdit.id_identifier}
                disabled
              />
            </div>
            <div className="form-group">
              <div className="button">
                <button
                  className="btnCreate"
                  type="button"
                  onClick={handleUpdate}
                >
                  <span>Update</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </EditAdmin>

      <section className="article">
        <div className="header">
          {Cookie.get("id_identifier") === "2" ? (
            <button className="btnCreate" onClick={() => setModalIsOpen(true)}>
              New Super Admin
            </button>
          ) : (
            <></>
          )}

          <div className="search">
            <form style={{ width: "500px" }}>
              <input
                type="text"
                placeholder="Search Super Admin..."
                name={inputSearch}
                onChange={handleChangeSearch}
                value={inputSearch}
                className="input-search"
              />
            </form>
          </div>
        </div>

        {/* CONTENT */}
        <section className={styles.admin}>
          <div style={{ overflowX: "auto" }}>
            <table
              className="table table-borderless"
              style={{ width: "1000px", marginTop: "10px" }}
            >
              <thead>
                <tr
                  style={{
                    backgroundColor: "#fbd3c4",
                  }}
                >
                  <th scope="col">Id</th>
                  <th scope="col">Email</th>
                  <th scope="col">Username</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td>Loading...</td>
                  </tr>
                ) : error ? (
                  error.message
                ) : (
                  admins
                    .filter((admin) => {
                      if (inputSearch === "") {
                        return admin;
                      } else if (
                        (admin.username
                          .toLowerCase()
                          .includes(inputSearch.toLowerCase()),
                        admin.email
                          .toLowerCase()
                          .includes(inputSearch.toLowerCase()))
                      ) {
                        return admin;
                      }
                    })
                    .map((admin) => (
                      <tr key={admin.id}>
                        <th scope="row">{admin.id}</th>
                        <td>{admin.email}</td>
                        <td>{admin.username}</td>
                        <td>{admin.phone}</td>
                        <td>
                          <div className={styles.column}>
                            {/* DETAIL */}
                            <button
                              className={styles.btnAction}
                              onClick={() =>
                                setdescModalIsOpen(true) & handleDetail(admin)
                              }
                            >
                              <FontAwesomeIcon
                                icon={faInfoCircle}
                                size="1x"
                                style={{ color: "black" }}
                              />
                            </button>

                            {/* {roleAccess === "Admin" ? ( */}
                            {Cookie.get("id_identifier") === "2" ? (
                              <>
                                {/* EDIT  */}
                                <button
                                  className={styles.btnAction}
                                  onClick={() =>
                                    seteditModalIsOpen(true) & handleEdit(admin)
                                  }
                                >
                                  <FontAwesomeIcon
                                    icon={faPen}
                                    size="1x"
                                    style={{ color: "black" }}
                                  />
                                </button>
                                {/* DELETE  */}
                                <button
                                  className={styles.btnAction}
                                  onClick={() =>
                                    Swal.fire({
                                      title: "Are you sure?",
                                      text: "You won't be able to revert this!",
                                      icon: "warning",
                                      showCancelButton: true,
                                      confirmButtonColor: "#3085d6",
                                      cancelButtonColor: "#d33",
                                      confirmButtonText: "Yes, delete it!",
                                    }).then((result) => {
                                      if (result.isConfirmed) {
                                        dispatch(
                                          deleteAdmin(admin.id),
                                          Swal.fire(
                                            "Deleted!",
                                            "Your file has been deleted.",
                                            "success"
                                          )
                                        );
                                      }
                                    })
                                  }
                                >
                                  <FontAwesomeIcon
                                    icon={faTrash}
                                    size="1x"
                                    style={{ color: "black" }}
                                  />
                                </button>
                              </>
                            ) : (
                              <></>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </>
  );
}

// export default CmsAdmin;

export const getServerSideProps = requireAuthentication((context) => {
  return {
    props: {
      data: [],
    },
  };
});
