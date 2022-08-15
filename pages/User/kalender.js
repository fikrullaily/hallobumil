import NavUser from "../components/NavUser";
import Head from "next/dist/shared/lib/head";
import styles from "../../styles/User.module.scss";
import Image from "next/dist/client/image";
import { useState } from "react";

const Kalender = () => {
  const [sideBar, setSideBar] = useState(false);

  return (
    <div>
      <Head>
        <title>Kalender</title>
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
          Hai mama, <br />
          Form dibawah untuk pencatatan siklus haid mama
        </h1>

        <div className="formDate">
          <section className="card1">
            <div className="items">
              <div className="item">Hari haid terakhir mama</div>
              <div className="item">Berapa lama haid mama berlangsung</div>
              <div className="item">Berapa lama siklus haid mama berulang</div>
            </div>
          </section>
          <section className="">
            <div className="items">
              <input
                className="inp_stat"
                type="date"
                id="date-lastH"
                name="LastDateH"
                placeholder=""
                required
              />
              <input
                className="inp_stat"
                type="text"
                id="qty-lamaH"
                name="QtyLamaH"
                placeholder=""
                required
              />
              <input
                className="inp_stat"
                type="text"
                id="qty-siklusH"
                name="QtySiklusH"
                placeholder=""
                required
              />
            </div>
          </section>
          <div className="form-group">
            <div className="button">
              <button
                className="btnUsers"
                type="button"
                // onClick={}
              >
                <span className="bn54span">submit</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kalender;
