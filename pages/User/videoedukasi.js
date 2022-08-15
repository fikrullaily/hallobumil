import Head from "next/head";
import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import NavUser from "../components/NavUser";
import { useDispatch, useSelector } from "react-redux";
import { getVideo } from "../../redux/actions/videoedukasiActions";
import { requireAuthentication } from "../../utils/useAuth";

export default function videoedukasi(props) {
  const [sideBar, setSideBar] = useState(false);

  // Get Data
  const dispatch = useDispatch();
  const allVideo = useSelector((state) => state.Videos);
  const { loading, error, videos } = allVideo;

  // LOAD DATA
  useEffect(() => {
    dispatch(getVideo());
  }, []);

  return (
    <div>
      <Head>
        <title>Video Edukasi</title>
      </Head>
      <NavUser
        onCollapse={(sideBar) => {
          setSideBar(sideBar);
        }}
      />
      <div className={sideBar ? "articleUser slide" : "articleUser"}>
        <h3>Video Edukasi Bumil</h3>

        <div className="edu-video-card">
          {loading ? (
            <h1>loading ...</h1>
          ) : error ? (
            error.message
          ) : (
            videos.map((video) => (
              <div className="card-video" style={{ width: "402px" }}>
                <iframe
                  width="450"
                  height="200"
                  src={video.url}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <div className="card-body" style={{ backgroundColor: "white" }}>
                  <p className="card-text">{video.title}</p>
                </div>
              </div>
            ))
          )}
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
