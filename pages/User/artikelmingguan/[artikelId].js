import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/dist/shared/lib/head";
import NavUser from "../../components/NavUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import { requireAuthentication } from "../../../utils/useAuth";

export default function artikelId(props) {
  const router = useRouter();
  const { artikelId } = router.query;

  const [sideBar, setSideBar] = useState(false);

  const [artikel, setArtikel] = useState([]);

  const fetchArtikel = async () => {
    const res = await fetch(`/api/artikelmingguan/`);
    const data = await res.json();
    setArtikel(data);
  };

  useEffect(() => {
    fetchArtikel();
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

      <div className={sideBar ? "articleIdUser slide" : "articleIdUser"}>
        <button
          onClick={() => router.push("../artikelmingguan")}
          className="button-back"
        >
          <FontAwesomeIcon icon={faLongArrowAltLeft} size="2x" />
        </button>
        {/* <h1>Test Artikel Detail {artikelId}</h1> */}
        {artikel
          .filter((a) => a.id === artikelId)
          .map((a) => (
            <div style={{ fontFamily: "sans-serif" }}>
              <h2>{a.title}</h2>
              <img src={a.url} height="488px" width="730px" />
              <br />
              <div dangerouslySetInnerHTML={{ __html: a.artikel }}></div>
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
