import NavUser from "../components/NavUser";
import Head from "next/dist/shared/lib/head";
import styles from "../../styles/User.module.scss";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/dist/client/router";
import { useDispatch, useSelector } from "react-redux";
import { requireAuthentication } from "../../utils/useAuth";
import { editUser } from "../../redux/actions/userActions";

export default function EditUser(props) {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const router = useRouter();
  const dispatch = useDispatch();

  const [sideBar, setSideBar] = useState(false);

  //Get Data User
  const userData = useSelector((state) => state.isLogin);
  const { users } = userData;

  // EDIT DATA
  // EDIT DATA
  const handleChangeEdit = (e) => {
    let data = { ...userEdit };
    data[e.target.name] = e.target.value;
    setUserEdit(data);
  };

  const [userEdit, setUserEdit] = useState({
    firstname: "",
    lastname: "",
    username: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleUpdate = (e) => {
    e.preventDefault();

    dispatch(
      editUser({
        id: users.user.id,
        firstname:
          userEdit.firstname === "" ? users.user.firstname : userEdit.firstname,
        lastname:
          userEdit.lastname === "" ? users.user.lastname : userEdit.lastname,
        username:
          userEdit.username === "" ? users.user.username : userEdit.username,
        phone: userEdit.phone === "" ? users.user.phone : userEdit.phone,
        email: userEdit.email === "" ? users.user.email : userEdit.email,
        password:
          userEdit.password === "" ? users.user.password : userEdit.password,
        token: users.user.token,
      })
    );

    alert("Berhasil Edit");
  };

  return (
    <div>
      <Head>
        <title>Edit User</title>
      </Head>

      <NavUser
        onCollapse={(sideBar) => {
          setSideBar(sideBar);
        }}
      />

      <div className={sideBar ? "articleUser slide" : "articleUser"}>
        <h1
          style={{ textAlign: "center", fontSize: "32px", marginTop: "100px" }}
        >
          Edit Profile
        </h1>

        <section className={styles.section}>
          <div className={styles.imgBox}>
            <img src="/avatar.png" />
          </div>
          <div className={styles.contentBox}>
            <div className={styles.formBox}>
              <form>
                <div className={styles.spanUp}>
                  <span>FistName</span>
                  <span style={{ width: "280px" }}>LastName</span>
                </div>
                <div className={styles.formName}>
                  <div className={styles.form__input}>
                    <input
                      type="text"
                      name="firstname"
                      placeholder={users.user.firstname}
                      className={styles.inputBoxUp}
                      onChange={handleChangeEdit}
                      value={userEdit.firstname}
                    />
                  </div>
                  <div className={styles.form__input}>
                    <input
                      type="text"
                      name="lastname"
                      placeholder={users.user.lastname}
                      className={styles.inputBoxUp}
                      onChange={handleChangeEdit}
                      value={userEdit.lastname}
                    />
                  </div>
                </div>
                <div className={styles.spanUp}>
                  <span>Username</span>
                  <span style={{ width: "280px" }}>Number Phone</span>
                </div>
                <div className={styles.formName}>
                  <div className={styles.form__input}>
                    <input
                      type="text"
                      name="username"
                      placeholder={users.user.username}
                      className={styles.inputBoxUp}
                      onChange={handleChangeEdit}
                      value={userEdit.username}
                    />
                  </div>
                  <div className={styles.form__input}>
                    <input
                      type="number"
                      name="phone"
                      placeholder={users.user.phone}
                      className={styles.inputBoxUp}
                      onChange={handleChangeEdit}
                      value={userEdit.phone}
                    />
                  </div>
                </div>
                <span>Email</span>
                <div className={styles.form__input}>
                  <input
                    type="email"
                    name="email"
                    placeholder={users.user.email}
                    className={styles.inputBox}
                    onChange={handleChangeEdit}
                    value={userEdit.email}
                  />
                </div>
                <span>Password</span>
                <div className={styles.form__input}>
                  <input
                    type={passwordShown ? "text" : "password"}
                    name="password"
                    placeholder="password"
                    className={styles.inputBox}
                    onChange={handleChangeEdit}
                    value={userEdit.firstname}
                  />
                  <i className={styles.iconVisible}>
                    <FontAwesomeIcon
                      icon={passwordShown ? faEye : faEyeSlash}
                      onClick={togglePassword}
                    />
                  </i>
                </div>
              </form>
              <div className={styles.button__action}>
                <button
                  type="submit"
                  className={styles.btn__submit}
                  style={{ backgroundColor: "#F16362" }}
                >
                  <a
                    onClick={(e) => router.push("/User")}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Cancel
                  </a>
                </button>
                <button
                  onClick={handleUpdate}
                  type="submit"
                  className={styles.btn__submit}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export const getServerSideProps = requireAuthentication((context) => {
  return {
    props: {
      data: [],
    },
  };
});
