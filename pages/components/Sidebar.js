import styles from "../../styles/Component.module.scss";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import Cookies from "js-cookie";
import { logoutUser } from "../../redux/actions/loginActions";
import { useDispatch } from "react-redux";
import { useState } from "react";

const Sidebar = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const x = router.pathname;

  const logout = () => {
    // e.preventDefault;
    dispatch(logoutUser());
    router.push("/");
    Cookies.remove("token");
    Cookies.remove("roleAccess");
    Cookies.remove("username");
    window.location.reload();
  };

  return (
    <>
      {/* TOP NAV */}
      <nav className={styles.nav}>
        <ul className={styles.nav__list}>
          <li className={styles.nav__listlogo} style={{ fontSize: "24px" }}>
            {x === "/superadmin"
              ? "Super Admin"
              : x === "/admin"
              ? "Admin"
              : x === "/users"
              ? "Users"
              : ""}
          </li>
          <li className={styles.nav__listitem} style={{ marginRight: "220px" }}>
            <img
              src="/avatar.png"
              height="30"
              style={{ marginRight: "10px" }}
            />
            {Cookies.get("username")}
            {/* Nama */}
            <ul className={styles.nav__listitemdrop}>
              <li>
                <a onClick={logout}>Log Out</a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>

      {/* SIDE NAV */}
      <div className={styles.sidenav}>
        <div className={styles.logo}>
          <Image
            src="/icon.png"
            width={180}
            height={87}
            onClick={(e) => router.push("./CMSHome")}
          />
        </div>
        {Cookies.get("id_identifier") === "2" ? (
          <>
            <li>
              <a
                onClick={(e) => router.push("../superadmin")}
                className={
                  router.pathname === "/superadmin"
                    ? styles.activeNav
                    : styles.nonactiveNav
                }
              >
                Super Admin
              </a>
            </li>
            <li>
              <a
                onClick={(e) => router.push("../admin")}
                className={
                  router.pathname === "/admin"
                    ? styles.activeNav
                    : styles.nonactiveNav
                }
              >
                Admin
              </a>
            </li>
          </>
        ) : (
          <></>
        )}

        <li>
          <a
            onClick={(e) => router.push("../users")}
            className={
              router.pathname === "/users"
                ? styles.activeNav
                : styles.nonactiveNav
            }
          >
            User
          </a>
        </li>
        <li>
          <a
            onClick={(e) => router.push("../videoEdukasi")}
            className={
              router.pathname === "/videoEdukasi"
                ? styles.activeNav
                : styles.nonactiveNav
            }
          >
            Video Edukasi
          </a>
        </li>
        <li>
          <a
            onClick={(e) => router.push("../artikelMingguan")}
            className={
              router.pathname === "/artikelMingguan"
                ? styles.activeNav
                : styles.nonactiveNav
            }
          >
            Artikel Mingguan
          </a>
        </li>
        <br />
      </div>
    </>
  );
};

export default Sidebar;
