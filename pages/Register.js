import Head from "next/head";
import styles from "../styles/Register.module.scss";
import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

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

    fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));

    alert("Register Success");

    firstname.current.value = "";
    lastname.current.value = "";
    username.current.value = "";
    phone.current.value = "";
    email.current.value = "";
    password.current.value = "";
    id_identifier.current.value = "";
  }

  return (
    <div>
      <Head>
        <title>Register </title>
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
            <form onSubmit={submitHandler}>
              <div className={styles.formName}>
                <div className={styles.form__input}>
                  <input
                    type="text"
                    name="firstname"
                    placeholder="firstname"
                    className={styles.inputBoxUp}
                    ref={firstname}
                  />
                </div>
                <div className={styles.form__input}>
                  <input
                    type="text"
                    name="lastname"
                    placeholder="lastname"
                    className={styles.inputBoxUp}
                    ref={lastname}
                  />
                </div>
              </div>
              <div className={styles.formName}>
                <div className={styles.form__input}>
                  <input
                    type="text"
                    name="username"
                    placeholder="username"
                    className={styles.inputBoxUp}
                    ref={username}
                  />
                </div>
                <div className={styles.form__input}>
                  <input
                    type="number"
                    name="numberphone"
                    placeholder="number phone"
                    className={styles.inputBoxUp}
                    ref={phone}
                  />
                </div>
              </div>
              <div className={styles.form__input}>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className={styles.inputBox}
                  ref={email}
                />
              </div>
              <br />
              <div className={styles.form__input}>
                <input
                  type={passwordShown ? "text" : "password"}
                  name="password"
                  placeholder="password"
                  className={styles.inputBox}
                  ref={password}
                />
                <i className={styles.iconVisible}>
                  <FontAwesomeIcon
                    icon={passwordShown ? faEye : faEyeSlash}
                    onClick={togglePassword}
                  />
                </i>
              </div>
              <div className={styles.form__input} style={{ display: "none" }}>
                <input
                  type="text"
                  name="id_identifier"
                  placeholder="id_identifier"
                  className={styles.inputBox}
                  ref={id_identifier}
                  value="1"
                  disabled
                />
              </div>
              <div style={{ textAlign: "center" }}>
                <button type="submit" className={styles.btn__submit}>
                  Register
                </button>
              </div>
              <div>
                <p
                  style={{
                    textAlign: "center",
                    marginTop: "15px",
                    fontFamily: "Comfortaa",
                  }}
                >
                  do you haven account? <a href="/">Login</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
