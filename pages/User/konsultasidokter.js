import Head from "next/dist/shared/lib/head";
import React, { useState } from "react";
import NavUser from "../components/NavUser";
import styles from "/styles/User.module.scss";

function konsultasidokter() {
  const [sideBar, setSideBar] = useState(false);

  return (
    <div>
      <Head>
        <title>Konsultasi Dokter</title>
      </Head>

      <NavUser
        onCollapse={(sideBar) => {
          setSideBar(sideBar);
        }}
      />

      <div className={sideBar ? "articleUser slide" : "articleUser"}>
        <h1>Konsultasi Dokter</h1>

        <div className={styles.content__konsul}>
          <img
            src="/konsuldokter.png"
            height="300px"
            width="300px"
            // style={{ marginLeft: "35%" }}
          />
          <p style={{ marginTop: "20px", fontSize: "20px" }}>
            Punya pertanyaan seputar kehamilan atau tumbuh kembang si kecil?
            Sekarang Mama bisa chat langsung dengan dokter spesialis terpercaya
            lohh!
          </p>
          <button className={styles.btn__konsul}>Klik disini</button>
        </div>
      </div>
    </div>
  );
}

export default konsultasidokter;
