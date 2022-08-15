import React, { useEffect, useState, useRef } from "react";
import Cookie from "js-cookie";
import styles from "../styles/Content.module.scss";
import Head from "next/dist/shared/lib/head";
import Layout from "./components/Layout";
import ModalVideo from "react-modal";
import VideoDetail from "react-modal";
import EditVideo from "react-modal";
import {
  faTrash,
  faPen,
  faWindowClose,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteVideo,
  editVideo,
  getVideo,
} from "../redux/actions/videoedukasiActions";
import Swal from "sweetalert2";
import { requireAuthentication } from "../utils/useAuth";

(ModalVideo, VideoDetail, EditVideo).setAppElement();

export default function VideoEdukasi(props) {
  // MODAL
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [descModalIsOpen, setdescModalIsOpen] = useState(false);
  const [editModalIsOpen, seteditModalIsOpen] = useState(false);

  // GET DATA
  const dispatch = useDispatch();
  const allVideo = useSelector((state) => state.Videos);
  const { loading, error, videos } = allVideo;

  // LOAD DATA
  useEffect(() => {
    dispatch(getVideo());
  }, []);

  //ADD DATA
  const title = useRef();
  const publish = useRef();
  const url = useRef();

  function submitHandler(e) {
    e.preventDefault();

    const reqBody = {
      title: title.current.value,
      publish: publish.current.value,
      url: url.current.value,
    };

    fetch("/api/videoedukasi", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));

    Swal.fire("Success Add New Video!", "", "success");

    title.current.value = "";
    publish.current.value = "";
    url.current.value = "";
  }

  // EDIT DATA
  const handleChangeEdit = (e) => {
    let data = { ...videoEdit };
    data[e.target.name] = e.target.value;
    setVideoEdit(data);
  };

  const [videoEdit, setVideoEdit] = useState({
    title: "",
    url: "",
    publish: "",
  });

  const handleEdit = (video) => {
    setVideoEdit({
      id: video.id,
      title: video.title,
      url: video.url,
      publish: video.publish,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    dispatch(
      editVideo({
        id: videoEdit.id,
        title: videoEdit.title,
        url: videoEdit.url,
        publish: videoEdit.publish,
      })
    );

    Swal.fire(
      "Success Update Video Edukasi!",
      "Video Edukasi success updated",
      "success"
    );

    setVideoEdit({
      title: "",
      url: "",
      publish: "",
    });
  };

  // DETAIL DATA
  const handleDetail = (video) => {
    setVideoDetail({
      id: video.id,
      title: video.title,
      url: video.url,
      publish: video.publish,
    });
  };

  const [videoDetail, setVideoDetail] = useState({
    title: "",
    url: "",
    publish: "",
  });

  // SEARCH DATA
  const [inputSearch, setInputSearch] = useState("");
  const handleChangeSearch = (e) => {
    e.preventDefault();
    setInputSearch(e.target.value);
  };

  return (
    <div>
      <Head>
        <title>CMS Video Edukasi</title>
      </Head>

      <Layout />

      {/* MODAL ADD  */}
      <ModalVideo
        isOpen={modalIsOpen}
        ariaHideApp={false}
        style={{
          content: {
            top: "90px",
            left: "230px",
            right: "40px",
            bottom: "40px",
            backgroundColor: "rgba(245, 140, 139, 1)",
          },
          overlay: { backgroundColor: "#C4C4C4" },
        }}
      >
        <button
          onClick={() => setModalIsOpen(false)}
          style={{ float: "right" }}
          className={styles.btnAction}
        >
          <FontAwesomeIcon
            icon={faWindowClose}
            size="2x"
            style={{ color: "black" }}
          />
        </button>
        <h1 className="title-modal" style={{ fontSize: "30px" }}>
          New Video Edukasi
        </h1>
        <div className="form-cont">
          <form id="form" className="form">
            <div className={styles.formGroup}>
              <input
                type="input"
                className={styles.inpForm}
                placeholder="title"
                name="title"
                ref={title}
              />
              <input
                type="date"
                className={styles.inputForm}
                placeholder="date publish"
                name="publish"
                ref={publish}
              />
            </div>
            <div className={styles.formGroup}>
              <input
                type="input"
                className={styles.inputForm1}
                placeholder="link video"
                name="video"
                ref={url}
              />
            </div>
            {/* <div className={styles.formGroup}>
          <textarea
            type="textarea"
            className={styles.inpForm1}
            placeholder="caption"
            name="caption"
            // ref={caption}
          />
        </div> */}
            <div className={styles.formGroup}>
              <div className="button">
                <button
                  className="btnCreate"
                  type="button"
                  onClick={submitHandler}
                >
                  <span>Submit</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </ModalVideo>

      {/* MODAL EDIT */}
      <EditVideo
        isOpen={editModalIsOpen}
        ariaHideApp={false}
        style={{
          content: {
            top: "90px",
            left: "230px",
            right: "40px",
            bottom: "40px",
            backgroundColor: "rgba(245, 140, 139, 1)",
          },
          overlay: { backgroundColor: "#C4C4C4" },
        }}
      >
        <button
          onClick={() => seteditModalIsOpen(false)}
          style={{ float: "right" }}
          className={styles.btnAction}
        >
          <FontAwesomeIcon
            icon={faWindowClose}
            size="2x"
            style={{ color: "black" }}
          />
        </button>
        <h1 className="title-modal" style={{ fontSize: "30px" }}>
          Edit Video Edukasi
        </h1>
        <div className="form-cont">
          <form id="form" className="form">
            <div className="form-group" style={{ display: "none" }}>
              <input
                type="input"
                className="input-form"
                placeholder="id"
                name="id"
                value={videoEdit.id}
                disabled
              />
            </div>

            <div className={styles.formGroup}>
              <input
                type="input"
                className={styles.inpForm}
                placeholder="title"
                name="title"
                onChange={handleChangeEdit}
                value={videoEdit.title}
              />
              <input
                type="date"
                className={styles.inputForm}
                placeholder="date publish"
                name="publish"
                onChange={handleChangeEdit}
                value={videoEdit.publish}
              />
            </div>
            <div className={styles.formGroup}>
              <input
                type="url"
                className={styles.inputForm1}
                placeholder="link video"
                name="video"
                onChange={handleChangeEdit}
                value={videoEdit.url}
                ref={url}
              />
            </div>
            {/* <div className={styles.formGroup}>
          <textarea
            type="textarea"
            className={styles.inpForm1}
            placeholder="caption"
            name="caption"
            // ref={caption}
          />
        </div> */}
            <div className={styles.formGroup}>
              <div className="button">
                <button
                  className="btnCreate"
                  type="button"
                  onClick={handleUpdate}
                >
                  <span>Submit</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </EditVideo>

      {/* MODAL DETAIL */}
      <VideoDetail
        isOpen={descModalIsOpen}
        ariaHideApp={false}
        style={{
          content: {
            top: "90px",
            left: "230px",
            right: "40px",
            bottom: "40px",
            backgroundColor: "rgba(245, 140, 139, 1)",
          },
          overlay: { backgroundColor: "#C4C4C4" },
        }}
      >
        <button
          onClick={() => setdescModalIsOpen(false)}
          style={{ float: "right" }}
          className={styles.btnAction}
        >
          <FontAwesomeIcon
            icon={faWindowClose}
            size="2x"
            style={{ color: "black" }}
          />
        </button>
        <h1 className="title-modal" style={{ fontSize: "30px" }}>
          Detail Video Edukasi
        </h1>
        <section className={styles.card}>
          <div className={styles.items}>
            <div
              className="card-video"
              style={{ width: "400px", marginTop: "15px" }}
            >
              <iframe
                width="450"
                height="200"
                src={videoDetail.url}
                title="YouTube video player"
              ></iframe>
            </div>
            <div className="card-body">
              <p
                className="card-text"
                style={{ color: "black", width: "100%" }}
              >
                {videoDetail.title}
              </p>
              <p
                className="card-text"
                style={{ color: "black", width: "100%" }}
              >
                {videoDetail.url}
              </p>
              <p className="card-text" style={{ color: "black" }}>
                {videoDetail.publish}
              </p>
            </div>
          </div>
        </section>
      </VideoDetail>

      <section className="article">
        <div className="header">
          {Cookie.get("id_identifier") === "2" ||
          Cookie.get("id_identifier") === "3" ? (
            <button className="btnCreate" onClick={() => setModalIsOpen(true)}>
              New Video 
            </button>
          ) : (
            <></>
          )}

          <div className="search">
            <form style={{ width: "500px" }}>
              <input
                type="text"
                placeholder="Search Video..."
                name={inputSearch}
                onChange={handleChangeSearch}
                value={inputSearch}
                className="input-search"
              />
            </form>
          </div>
        </div>

        {/* CONTENT */}
        <section>
          <div style={{ overflowX: "auto" }}>
            <table
              className="table table-borderless"
              style={{ width: "1000px", marginTop: "10px" }}
            >
              <thead>
                <tr
                  style={{
                    backgroundColor: "#fbd3c4",
                  }}
                >
                  <th scope="col">No</th>
                  <th scope="col">Title</th>
                  <th scope="col">Date Publish</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td>Loading...</td>
                  </tr>
                ) : error ? (
                  error.message
                ) : (
                  videos
                    .filter((video) => {
                      if (inputSearch === "") {
                        return video;
                      } else if (
                        video.title
                          .toLowerCase()
                          .includes(inputSearch.toLowerCase())
                      ) {
                        return video;
                      }
                    })
                    .map((video) => (
                      <tr key={video.id}>
                        <th scope="row">{video.id}</th>
                        <td>{video.title}</td>
                        <td>{video.publish}</td>
                        <td>
                          <div className={styles.column}>
                            {/* DETAIL */}
                            <button
                              className={styles.btnAction}
                              onClick={() =>
                                setdescModalIsOpen(true) & handleDetail(video)
                              }
                            >
                              <FontAwesomeIcon
                                icon={faInfoCircle}
                                size="1x"
                                style={{ color: "black" }}
                              />
                            </button>

                            {Cookie.get("id_identifier") === "2" ||
                            Cookie.get("id_identifier") === "3" ? (
                              <>
                                {/* EDIT  */}
                                <button
                                  className={styles.btnAction}
                                  onClick={() =>
                                    seteditModalIsOpen(true) & handleEdit(video)
                                  }
                                >
                                  <FontAwesomeIcon
                                    icon={faPen}
                                    size="1x"
                                    style={{ color: "black" }}
                                  />
                                </button>
                                {/* DELETE  */}
                                <button
                                  className={styles.btnAction}
                                  onClick={() =>
                                    Swal.fire({
                                      title: "Are you sure?",
                                      text: "You won't be able to revert this!",
                                      icon: "warning",
                                      showCancelButton: true,
                                      confirmButtonColor: "#3085d6",
                                      cancelButtonColor: "#d33",
                                      confirmButtonText: "Yes, delete it!",
                                    }).then((result) => {
                                      if (result.isConfirmed) {
                                        dispatch(
                                          deleteVideo(video.id),
                                          Swal.fire(
                                            "Deleted!",
                                            "Your file has been deleted.",
                                            "success"
                                          )
                                        );
                                      }
                                    })
                                  }
                                >
                                  <FontAwesomeIcon
                                    icon={faTrash}
                                    size="1x"
                                    style={{ color: "black" }}
                                  />
                                </button>
                              </>
                            ) : (
                              <></>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </section>
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
