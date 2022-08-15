import NavUser from "../components/NavUser";
import Head from "next/dist/shared/lib/head";
import styles from "../../styles/User.module.scss";
import Image from "next/dist/client/image";
import { useState } from "react";
import { Link } from "react-router-dom";

const Status = () => {
  const [sideBar, setSideBar] = useState(false);

  return (
    <div>
      <Head>
        <title>Status</title>
      </Head>

      <NavUser
        onCollapse={(sideBar) => {
          setSideBar(sideBar);
        }}
      />

      <div className={sideBar ? "articleUser slide" : "articleUser"}>
        <h1
          className={styles.center}
          style={{
            fontSize: "20px",
            fontFamily: "Comfortaa",
            fontWeight: "bold",
          }}
        >
          Hai ma, selamat datang. Semoga mama selalu sehat
        </h1>

        <section style={{ marginTop: "150px" }}>
          <div className="CSSgal">
            <s id="s1"></s>
            <s id="s2"></s>

            <div className="slider">
              <div style={{ backgroundColor: "#FFE8E8" }}>
                <div className="contSlide">
                  <img
                    style={{ width: "70%", marginTop: "20px" }}
                    src="../logovertical.png"
                    alt="masa-subur"
                  />
                  <br /> <br />
                  <h2>masa subur dalam 7 hari</h2>
                  <p>
                    mama saat ini sedang masa kurang subur. <br />
                    Jangan lupa untuk berolahraga agar tetap sehat
                  </p>
                </div>
              </div>
              <div style={{ background: "#FFE8E8" }}>
                <div className="contSlide">
                  <br />
                  <div className="contSlide2">
                    <img
                      style={{ width: "10%", marginTop: "20px" }}
                      src="../usericon.png"
                      alt="slide2"
                    />
                    <p
                      style={{
                        color: "black",
                        marginTop: "5px",
                        fontSize: "15px",
                        fontWeight: "bold",
                      }}
                    >
                      Perencanaan
                      <br />
                      kehamilan hallobumil
                    </p>
                    <p
                      style={{
                        color: "black",
                        fontSize: "10px",
                        marginTop: "-5px",
                      }}
                    >
                      Apakah mama sudah hamil?
                    </p>
                    <button className="actSlide">Sudah hamil</button> <br />
                    <button className="actSlide">Belum hamil</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="prevNext">
              <div>
                <a href="#s4"></a>
                <a href="#s2"></a>
              </div>
              <div>
                <a href="#s1"></a>
                <a href="#s3"></a>
              </div>
              <div>
                <a href="#s2"></a>
                <a href="#s4"></a>
              </div>
              <div>
                <a href="#s3"></a>
                <a href="#s1"></a>
              </div>
            </div>

            <div className="bullets" style={{ marginTop: "30%" }}>
              <a href="#s1">1</a>
              <a href="#s2">2</a>
            </div>
          </div>
        </section>
        <hr />
      </div>
    </div>
  );
};

export default Status;
