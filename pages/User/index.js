import NavUser from "../components/NavUser";
import Head from "next/dist/shared/lib/head";
import styles from "../../styles/User.module.scss";
import Image from "next/dist/client/image";
import { useState } from "react";
import { requireAuthentication } from "../../utils/useAuth";
import Slider from "./slider";
import { useRouter } from "next/dist/client/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

export default function User(props) {
  const [sideBar, setSideBar] = useState(false);

  const router = useRouter();

  return (
    <div>
      <Head>
        <title>User</title>
      </Head>

      <NavUser
        onCollapse={(sideBar) => {
          setSideBar(sideBar);
        }}
      />

      <div className={sideBar ? "articleUser slide" : "articleUser"}>
        {/* <div className={styles.center}>
          <img src="/avatar.png" className={styles.avatarHome} />
          <h1 style={{ fontSize: "20px" }}>
            Hai Bumil, Selamat datang besok lahiran ya
          </h1>
        </div> */}

        {/* Status */}
        <div style={{ marginBottom: "50px" }}>
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
        </div>

        {/* Video Edukasi */}
        <div>
          <div
            className="card"
            style={{
              marginBottom: "50px",
              backgroundColor: "#FFE8E8",
            }}
          >
            <div className="card-header">
              <span>Video Edukasi</span>
              <span>
                <a onClick={(e) => router.push("../User/videoedukasi")}>
                  Lihat Semua
                </a>
              </span>
            </div>
            <div className="card-body" style={{ marginLeft: "20%" }}>
              <iframe
                width="600"
                height="350"
                src="https://www.youtube.com/embed/I3g_9izvHas"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Arikel Mingguan */}
          <div
            style={{
              marginBottom: "50px",
              backgroundColor: "#FFE8E8",
            }}
          >
            <div className="card-header">
              <span>Artikel Mingguan</span>
              <a onClick={(e) => router.push("../User/artikelmingguan")}>
                <span>Lihat Semua</span>
              </a>
            </div>
            <div
              id="carouselExampleCaptions"
              className="carousel slide"
              data-bs-ride="carousel"
              style={{ width: "500px", marginLeft: "25%" }}
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src="/artikel.jpg"
                    height="400px"
                    className="d-block w-100"
                    alt="..."
                  />
                  <h3>Manfaat Hamil Saat Pandemi</h3>
                </div>
                <div className="carousel-item">
                  <img
                    src="/artikel.jpg"
                    height="400px"
                    className="d-block w-100"
                    alt="..."
                  />
                  <h3>Bahaya Hamil Saat Pandemi</h3>
                </div>
                <div className="carousel-item">
                  <img
                    src="/artikel.jpg"
                    height="400px"
                    className="d-block w-100"
                    alt="..."
                  />
                  <h3>Menjaga Kesehatan Bayi Saat Pandemi</h3>
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="prev"
              >
                <span className="carousel-control-icon">
                  <FontAwesomeIcon icon={faChevronLeft} size="2x" />
                </span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="next"
              >
                <span className="carousel-control-icon">
                  <FontAwesomeIcon icon={faChevronRight} size="2x" />
                </span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
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
