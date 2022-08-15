import Head from "next/dist/shared/lib/head";
import React, { useState, useEffect } from "react";
import NavUser from "../../components/NavUser";
import { useDispatch, useSelector } from "react-redux";
import { getArtikel } from "../../../redux/actions/artikelActions";
import { requireAuthentication } from "../../../utils/useAuth";
import Link from "next/link";

export default function index(props) {
  const [sideBar, setSideBar] = useState(false);

  // GET DATA
  const dispatch = useDispatch();
  const allArtikel = useSelector((state) => state.Artikels);
  const { artikels } = allArtikel;

  // LOAD DATA
  useEffect(() => {
    dispatch(getArtikel());
  }, []);

  return (
    <div>
      <Head>
        <title>Artikel Mingguan</title>
      </Head>

      <NavUser
        onCollapse={(sideBar) => {
          setSideBar(sideBar);
        }}
      />

      <div
        className={sideBar ? "articleUser slide" : "articleUser"}
        style={{ fontFamily: "sans-serif" }}
      >
        <h1 style={{ fontSize: "33px" }}>Artikel Mingguan</h1>
        {artikels.map((artikel) => (
          <div
            className="card"
            style={{ marginBottom: "30px", border: "2px solid" }}
            key={artikel.id}
          >
            <div className="card-body">
              <div className="konten-artikel">
                <img src={artikel.url} height="200px" width="200px" />
                <div style={{ marginLeft: "30px" }}>
                  <a
                    href={`./artikelmingguan/${artikel.id}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <h3>{artikel.title}</h3>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: artikel.artikel.substring(0, 200) + "...",
                      }}
                    ></p>
                    <span>{artikel.publish}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
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
