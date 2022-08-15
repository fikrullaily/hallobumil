import React, { useEffect, useState } from "react";
import styles from "../styles/users.module.scss";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPen,
  faWindowClose,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import UserDetail from "react-modal";
import EditUser from "react-modal";
import Swal from "sweetalert2";
import Head from "next/dist/shared/lib/head";
import Layout from "./components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { deleteUsers, getUsers } from "../redux/actions/userActions";
import Cookie from "js-cookie";
import { requireAuthentication } from "../utils/useAuth";

(Modal, UserDetail, EditUser).setAppElement();

export default function Users(props) {
  // Get Data
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.Users);
  const { loading, error, users } = allUsers;

  // LOAD DATA
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  // SEARCH DATA
  const [inputSearch, setInputSearch] = useState("");
  const handleChangeSearch = (e) => {
    e.preventDefault();
    setInputSearch(e.target.value);
  };

  //MODAL
  const [descModalIsOpen, setdescModalIsOpen] = useState(false);
  const [editModalIsOpen, seteditModalIsOpen] = useState(false);

  // DETAIL USERS
  const [usersDetail, setUsersDetail] = useState({
    firstname: "",
    lastname: "",
    username: "",
    phone: "",
    email: "",
    roleAccess: "",
  });

  const handleDetail = (users) => {
    setUsersDetail({
      firstname: users.firstname,
      lastname: users.lastname,
      username: users.username,
      phone: users.phone,
      email: users.email,
      id_identifier: users.id_identifier,
    });
    console.log("Detail Users " + users.username);
  };

  return (
    <div>
      <Head>
        <title>User</title>
      </Head>

      <Layout />

      {/* MODAL DETAIL ADMIN >> datanya msh manual */}
      <UserDetail
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
          Detail User
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
            <div className={styles.item}>{usersDetail.email}</div>
            <div className={styles.item}>{usersDetail.username}</div>
            <div className={styles.item}>{usersDetail.firstname}</div>
            <div className={styles.item}>{usersDetail.lastname}</div>
            <div className={styles.item}>{usersDetail.phone}</div>
            <div className={styles.item}>{usersDetail.id_identifier}</div>
          </div>
        </section>
      </UserDetail>

      <section className="article">
        <div className={styles.header}>
          <div className={styles.search}>
            <form style={{ width: "500px" }}>
              <input
                name="Search"
                type="text"
                placeholder="Search User..."
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
              style={{ width: "1000px" }}
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
                  users
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

                            {Cookie.get("id_identifier") === "2" ||
                            Cookie.get("id_identifier") === "3" ? (
                              <>
                                {/* EDIT 
                                <button className={styles.btnAction}>
                                  <FontAwesomeIcon
                                    icon={faPen}
                                    size="1x"
                                    style={{ color: "black" }}
                                  />
                                </button> */}

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
                                          deleteUsers(u.id),
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

// export default Users;

export const getServerSideProps = requireAuthentication((context) => {
  return {
    props: {
      data: [],
    },
  };
});
