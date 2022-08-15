import Head from "next/head";
import styles from "../styles/Login.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { loginUser } from "../redux/actions/loginActions";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/dist/client/router";
import Cookie from "js-cookie";

const Login = () => {
  // VISIBLE OR NONVISIBLE PASSWORD
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const dispatch = useDispatch();
  const router = useRouter();

  const userData = useSelector((state) => state.isLogin);
  const { errors } = userData;

  const [Error, setError] = useState("");
  const [isError, setIserror] = useState(false);

  //INPUT FORM
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (Cookie.get("token") && Cookie.get("id_identifier") === "2") {
      userData.users && router.push("/CMSHome");
    } else if (Cookie.get("token") && Cookie.get("id_identifier") === "1") {
      userData.users && router.push("/User");
    } else if (Cookie.get("token") && Cookie.get("id_identifier") === "3") {
      userData.users && router.push("/CMSHome");
    }
    setError(errors);
    setIserror(true);
  }, [userData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      loginUser({
        email: email,
        password: password,
        loggedIn: true,
      })
    );
    setIserror(true);

    router.push("/CMSHome");

    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <Head>
        <title>Login </title>
      </Head>

      <section className={styles.section}>
        <div className={styles.imgBox}>
          <img src="../logo/logo login bumil.jpg" />
        </div>
        <div className={styles.contentBox}>
          <div className={styles.formBox}>
            <div className={styles.logo__login}>
              <img
                src="../logo/login 1.png"
                style={{ height: "100px", width: "100px" }}
              />
            </div>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className={styles.form__input}>
                <span className={styles.icon}>
                  <FontAwesomeIcon icon={faUser} size="2x" />
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className={styles.inputBox}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <br />
              <div className={styles.form__input}>
                <span className={styles.icon}>
                  <FontAwesomeIcon icon={faLock} size="2x" />
                </span>
                <input
                  type={passwordShown ? "text" : "password"}
                  name="password"
                  placeholder="password"
                  className={styles.inputBox}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <i className={styles.iconVisible}>
                  <FontAwesomeIcon
                    icon={passwordShown ? faEye : faEyeSlash}
                    onClick={togglePassword}
                  />
                </i>
              </div>
              <div style={{ textAlign: "center" }}>
                <button type="submit" className={styles.btn__submit}>
                  Login
                </button>
              </div>
              {isError && (
                <div style={{ textAlign: "center" }}>
                  {errors &&
                    errors.map((item, index) => (
                      <p key={index} style={{ color: "red" }}>
                        {item.msg}
                      </p>
                    ))}
                </div>
              )}
              <div>
                <p
                  style={{
                    textAlign: "center",
                    marginTop: "15px",
                    fontFamily: "Comfortaa",
                  }}
                >
                  do you haven't account?{" "}
                  <a
                    href="./Register"
                    // onClick={(e) => router.push("./Register")}
                    style={{ fontWeight: "bold" }}
                  >
                    Register
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
