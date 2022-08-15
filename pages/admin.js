import React, { useEffect, useState, useRef } from "react";
import styles from "../styles/CmsUsers.module.scss";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPen,
  faWindowClose,
  faInfoCircle,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import ModalUserCms from "react-modal";
import UsersDetail from "react-modal";
import EditUsers from "react-modal";
import Swal from "sweetalert2";
import Layout from "./components/Layout";
import Head from "next/dist/shared/lib/head";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCmsUser,
  editCMSUser,
  getCmsUser,
} from "../redux/actions/cmsUserActions";
import Cookie from "js-cookie";
import { requireAuthentication } from "../utils/useAuth";

(ModalUserCms, UsersDetail, EditUsers).setAppElement();

export default function CmsUsers(props) {
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
  const allCmsUsers = useSelector((state) => state.CmsUsers);
  const { loading, error, cmsUsers } = allCmsUsers;

  // LOAD DATA
  useEffect(() => {
    dispatch(getCmsUser());
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

    fetch("/api/cmsuser", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));

    Swal.fire(
      "Success Register New CMSUser!",
      "CMSUser " + firstname.current.value + " as New CMSUser!",
      "success"
    );

    firstname.current.value = "";
    lastname.current.value = "";
    username.current.value = "";
    phone.current.value = "";
    email.current.value = "";
    password.current.value = "";
  }

  // Detail Cms User
  const [cmsuserDetail, setCmsUserDetail] = useState({
    firstname: "",
    lastname: "",
    username: "",
    phone: "",
    email: "",
    id_identifier: "",
  });

  const handleDetail = (cmsuser) => {
    setCmsUserDetail({
      firstname: cmsuser.firstname,
      lastname: cmsuser.lastname,
      username: cmsuser.username,
      phone: cmsuser.phone,
      email: cmsuser.email,
      id_identifier: cmsuser.id_identifier,
    });
    console.log("Detail Cms User " + cmsuser.username);
  };

  // EDIT DATA
  const handleChangeEdit = (e) => {
    let data = { ...cmsuserEdit };
    data[e.target.name] = e.target.value;
    setCmsUserEdit(data);
  };

  const [cmsuserEdit, setCmsUserEdit] = useState({
    firstname: "",
    lastname: "",
    username: "",
    phone: "",
    email: "",
    password: "",
    id_identifier: "",
  });

  const handleEdit = (cmsuser) => {
    setCmsUserEdit({
      id: cmsuser.id,
      token: cmsuser.token,
      firstname: cmsuser.firstname,
      lastname: cmsuser.lastname,
      username: cmsuser.username,
      phone: cmsuser.phone,
      email: cmsuser.email,
      password: cmsuser.password,
      id_identifier: cmsuser.id_identifier,
    });
    console.log("CMS User = " + cmsuser.id);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    dispatch(
      editCMSUser({
        id: cmsuserEdit.id,
        firstname: cmsuserEdit.firstname,
        lastname: cmsuserEdit.lastname,
        username: cmsuserEdit.username,
        phone: cmsuserEdit.phone,
        email: cmsuserEdit.email,
        password: cmsuserEdit.password,
        id_identifier: cmsuserEdit.id_identifier,
        token: cmsuserEdit.token,
      })
    );

    Swal.fire(
      "Success Update CMS_User!",
      "CMS_User " + cmsuserEdit.username + " Update!",
      "success"
    );

    setCmsUserEdit({
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
    <div>
      <Head>
        <title>Admin</title>
      </Head>

      <Layout />

      {/* MODAL CREATE CMS_USER */}
      <ModalUserCms
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
        <h1 className="title-modal">New Admin</h1>
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
                value="3"
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
                  <span className="bn54span">Submit</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </ModalUserCms>

      {/* MODAL EDIT CMS_USER */}
      <UsersDetail
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
          Detail Admin
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
            <div className={styles.item}>{cmsuserDetail.email}</div>
            <div className={styles.item}>{cmsuserDetail.username}</div>
            <div className={styles.item}>{cmsuserDetail.firstname}</div>
            <div className={styles.item}>{cmsuserDetail.lastname}</div>
            <div className={styles.item}>{cmsuserDetail.phone}</div>
            <div className={styles.item}>{cmsuserDetail.id_identifier}</div>
          </div>
        </section>
      </UsersDetail>

      {/* MODAL EDIT CMS_USER */}
      <EditUsers
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
          Edit Admin
        </h1>
        <div className="form-cont">
          <form id="form" className="form">
            <div className="form-group" style={{ display: "none" }}>
              <input
                type="input"
                className="input-form"
                placeholder="id"
                name="firstname"
                value={cmsuserEdit.id}
                disabled
              />

              <input
                type="input"
                className="input-form"
                placeholder="token"
                name="lastname"
                value={cmsuserEdit.token}
                disabled
              />
            </div>
            <div className="form-group">
              <input
                type="input"
                className="input-form"
                placeholder="firstname"
                name="firstname"
                onChange={handleChangeEdit}
                value={cmsuserEdit.firstname}
              />

              <input
                type="input"
                className="input-form"
                placeholder="lastname"
                name="lastname"
                onChange={handleChangeEdit}
                value={cmsuserEdit.lastname}
              />
            </div>
            <div className="form-group">
              <input
                type="input"
                className="input-form"
                placeholder="username"
                name="username"
                onChange={handleChangeEdit}
                value={cmsuserEdit.username}
              />

              <input
                type="input"
                className="input-form"
                placeholder="phone"
                name="phone"
                onChange={handleChangeEdit}
                value={cmsuserEdit.phone}
              />
            </div>
            <div className="form-group">
              <input
                type="input"
                className="input-form1"
                placeholder="email"
                name="email"
                onChange={handleChangeEdit}
                value={cmsuserEdit.email}
              />
            </div>
            <div className="form-group">
              <input
                type={passwordShown ? "text" : "password"}
                className="input-form1"
                placeholder="password"
                name="password"
                onChange={handleChangeEdit}
                value={cmsuserEdit.password}
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
                name="roleAccess"
                onChange={handleChangeEdit}
                value={cmsuserEdit.roleAccess}
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
      </EditUsers>

      <section className="article">
        <div className="header">
          {Cookie.get("id_identifier") === "2" ? (
            <button className="btnCreate" onClick={() => setModalIsOpen(true)}>
              New Admin
            </button>
          ) : (
            <></>
          )}

          <div className="search">
            <form style={{ width: "500px" }}>
              <input
                type="text"
                placeholder="Search Admin..."
                name={inputSearch}
                onChange={handleChangeSearch}
                value={inputSearch}
                className="input-search"
              />
            </form>
          </div>
        </div>

        <section className={styles.users}>
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
                  <th scope="col">No</th>
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
                  cmsUsers
                    .filter((u) => {
                      if (inputSearch === "") {
                        return u;
                      } else if (
                        (u.username
                          .toLowerCase()
                          .includes(inputSearch.toLowerCase()),
                        u.email
                          .toLowerCase()
                          .includes(inputSearch.toLowerCase()))
                      ) {
                        return u;
                      }
                    })
                    .map((u) => (
                      <tr key={u.id}>
                        <th scope="row">{u.id}</th>
                        <td>{u.email}</td>
                        <td>{u.username}</td>
                        <td>{u.phone}</td>
                        <td>
                          <div className={styles.column}>
                            {/* DETAIL  */}
                            <button
                              className={styles.btnAction}
                              onClick={() =>
                                setdescModalIsOpen(true) & handleDetail(u)
                              }
                            >
                              <FontAwesomeIcon
                                icon={faInfoCircle}
                                size="1x"
                                style={{ color: "black" }}
                              />
                            </button>

                            {Cookie.get("id_identifier") === "2" ? (
                              <>
                                {/* EDIT  */}
                                <button
                                  className={styles.btnAction}
                                  onClick={() =>
                                    seteditModalIsOpen(true) & handleEdit(u)
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
                                          deleteCmsUser(u.id),
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
    </div>
  );
}

// export default CmsUsers;

export const getServerSideProps = requireAuthentication((context) => {
  return {
    props: {
      data: [],
    },
  };
});
