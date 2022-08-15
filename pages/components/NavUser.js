import styles from "../../styles/Component.module.scss";
import Image from "next/dist/client/image";
import { useRouter } from "next/dist/client/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/actions/loginActions";
import Cookies from "js-cookie";

const NavUser = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [sideBar, setSideBar] = useState(false);
  const showSideBar = () => setSideBar(!sideBar);
  props.onCollapse(sideBar);

  const logout = () => {
    // e.preventDefault;
    dispatch(logoutUser());
    router.push("/");
    Cookies.remove("token");
    Cookies.remove("id_identifier");
    Cookies.remove("username");
    window.location.reload();
  };

  return (
    <>
      <nav className={styles.nav} style={{ marginLeft: "0px" }}>
        <ul className={styles.nav__list}>
          <div className={styles.nav__list}>
            <FontAwesomeIcon
              icon={sideBar ? faTimes : faBars}
              size="2x"
              onClick={showSideBar}
              style={{ cursor: "pointer" }}
            />
          </div>
          <li className={styles.nav__listlogo}>
            <a onClick={(e) => router.push("/User")}>
              <img
                src="/logover2.png"
                height="65"
                width="180"
                style={{ marginTop: "5px" }}
              />
            </a>
          </li>
          <li className={styles.nav__listitem} style={{ marginRight: "30px" }}>
            <img
              src="/avatar.png"
              height="30"
              style={{ marginRight: "10px" }}
            />
            {Cookies.get("username")}
            {/* Nama */}
            <ul className={styles.nav__listitemdrop}>
              <li>
                <a onClick={(e) => router.push("../../User/EditUser")}>
                  Edit Profile
                </a>
              </li>
              <li>
                <a onClick={logout}>Log Out</a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>

      {/* SIDE NAV */}

      <div className={sideBar ? "sidenavUser active" : "sidenavUser"}>
        <li style={{ marginTop: "100px" }}>
          <a
            onClick={(e) => router.push("../User/status")}
            className={
              router.pathname === "/User/status" ? "activeNav" : "nonactiveNav"
            }
          >
            status
          </a>
        </li>
        <li>
          <a
            onClick={(e) => router.push("../User/kalender")}
            className={
              router.pathname === "/User/kalender"
                ? "activeNav"
                : "nonactiveNav"
            }
          >
            Kalender
          </a>
        </li>
        <li>
          <a
            onClick={(e) => router.push("../User/konsultasidokter")}
            className={
              router.pathname === "/User/konsultasidokter"
                ? "activeNav"
                : "nonactiveNav"
            }
          >
            Konsultasi Dokter
          </a>
        </li>
        <br />
      </div>
    </>
  );
};

export default NavUser;
