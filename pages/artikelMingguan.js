import React, { useEffect, useState, useRef } from "react";
import Cookie from "js-cookie";
import styles from "../styles/Content.module.scss";
import Head from "next/dist/shared/lib/head";
import Layout from "./components/Layout";
import ModalArtikel from "react-modal";
import ArtikelDetail from "react-modal";
import EditArtikel from "react-modal";
import {
  faTrash,
  faPen,
  faWindowClose,
  faInfoCircle,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  deleteArtikel,
  editArtikel,
  getArtikel,
} from "../redux/actions/artikelActions";
import { requireAuthentication } from "../utils/useAuth";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";

(ModalArtikel, ArtikelDetail, EditArtikel).setAppElement();

export default function artikelMingguan({ onChange, name, value }) {
  // MODAL
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [descModalIsOpen, setdescModalIsOpen] = useState(false);
  const [editModalIsOpen, seteditModalIsOpen] = useState(false);

  // GET DATA
  const dispatch = useDispatch();
  const allArtikel = useSelector((state) => state.Artikels);
  const { loading, error, artikels } = allArtikel;

  // LOAD DATA
  useEffect(() => {
    dispatch(getArtikel());
  }, []);

  //ADD DATA
  const title = useRef();
  const publish = useRef();
  const url = useRef();
  const artikel = useRef();

  function submitHandler(e) {
    e.preventDefault();

    const reqBody = {
      title: title.current.value,
      publish: publish.current.value,
      url: url.current.value,
      artikel: artikel.current.value,
    };

    fetch("/api/artikelmingguan", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));

    Swal.fire("Success Add New Articel!", "", "success");

    title.current.value = "";
    publish.current.value = "";
    url.current.value = "";
    artikel.current.value = "";
  }

  // EDIT DATA
  const handleChangeEdit = (e) => {
    let data = { ...artikelEdit };
    data[e.target.name] = e.target.value;
    setArtikelEdit(data);
  };

  const [artikelEdit, setArtikelEdit] = useState({
    title: "",
    url: "",
    publish: "",
    artikel: "",
  });

  const handleEdit = (artikel) => {
    setArtikelEdit({
      id: artikel.id,
      title: artikel.title,
      url: artikel.url,
      publish: artikel.publish,
      artikel: artikel.artikel,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    dispatch(
      editArtikel({
        id: artikelEdit.id,
        title: artikelEdit.title,
        url: artikelEdit.url,
        publish: artikelEdit.publish,
        artikel: artikelEdit.artikel,
      })
    );

    Swal.fire(
      "Success Update Artikel Mingguan!",
      "Artikel mingguan success updated ",
      "success"
    );

    setArtikelEdit({
      title: "",
      url: "",
      publish: "",
      artikel: "",
    });
  };

  // SEARCH DATA
  const [inputSearch, setInputSearch] = useState("");
  const handleChangeSearch = (e) => {
    e.preventDefault();
    setInputSearch(e.target.value);
  };

  // TEXT EDITOR
  const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
  });

  const editorRef = useRef();
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
  }, []);

  const [text, setText] = useState("");

  return (
    <div>
      <Head>
        <title>CMS Artikel Mingguan</title>
      </Head>

      <Layout />

      {/* MODAL ADD */}
      <ModalArtikel
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
          New Artikel Mingguan
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
                placeholder="image (link)"
                name="video"
                ref={url}
              />
            </div>
            <div className={styles.formGroup}>
            <div className="text-editor-article">
              <CKEditor
                type=""
                editor={ClassicEditor}
                onChange={(e, editor) => {
                  const data = editor.getData();
                  setText(data);
                }}
              />
              <textarea
                value={text}
                name="artikel"
                ref={artikel}
                style={{ display: "none" }}
              ></textarea>
            </div>
          </div>
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
      </ModalArtikel>

      {/* MODAL EDIT */}
      <EditArtikel
        isOpen={editModalIsOpen}
        ariaHideApp={false}
        style={{
          content: {
            top: "90px",
            left: "230px",
            right: "30px",
            bottom: "30px",
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
          Edit Artikel Mingguan
        </h1>
        <div className="form-cont">
          <form id="form" className="form" style={{ display: "flex" }}>
            <div>
              <span style={{ fontWeight: "bold" }}>Image Preview</span>
              <img src={artikelEdit.url} height="200px" width="200px" />
            </div>
            <div>
              <div className="form-group" style={{ display: "none" }}>
                <input
                  type="input"
                  className="input-form"
                  placeholder="id"
                  name="id"
                  value={artikelEdit.id}
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
                  value={artikelEdit.title}
                />
                <input
                  type="date"
                  className={styles.inputForm}
                  placeholder="date publish"
                  name="publish"
                  onChange={handleChangeEdit}
                  value={artikelEdit.publish}
                />
              </div>

              <div className={styles.formGroup}>
                <input
                  type="input"
                  className={styles.inputForm1}
                  placeholder="image (link)"
                  name="url"
                  onChange={handleChangeEdit}
                  value={artikelEdit.url}
                />
              </div>

              <div className={styles.formGroup}>
                <textarea
                  type="textarea"
                  id="editor"
                  className={styles.inpForm1}
                  placeholder="artikel"
                  name="artikel"
                  onChange={handleChangeEdit}
                  value={artikelEdit.artikel}
                />
              </div>
              

              {/* <div
                style={{
                  width: "740px",
                  marginLeft: "26px",
                  marginBottom: "20px",
                }}
              >
                <CKEditor
                  type=""
                  editor={ClassicEditor}
                  onChange={(e, editor) => {
                    const data = editor.getData();
                    setText(data);
                  }}
                />
                <textarea
                  value={text}
                  name="artikel"
                  // value={artikelEdit.artikel}
                  style={{ display: "none" }}
                ></textarea>
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
            </div>
          </form>
        </div>
      </EditArtikel>

      {/* MODAL DETAIL */}
      <ArtikelDetail
        isOpen={descModalIsOpen}
        ariaHideApp={false}
        style={{
          content: {
            top: "90px",
            left: "230px",
            right: "30px",
            bottom: "30px",
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
          Detail Artikel Mingguan
        </h1>
        <div className={styles.detail}>
          <img src={artikelEdit.url} height="250px" width="250px" />
          <div className={styles.detailTxt}>
            <span>{artikelEdit.publish}</span>
            <h1 style={{ fontSize: "30px" }}>{artikelEdit.title}</h1>
            <div
              dangerouslySetInnerHTML={{ __html: artikelEdit.artikel }}
            ></div>
          </div>
        </div>
      </ArtikelDetail>

      <section className="article">
        <div className="header">
          {Cookie.get("id_identifier") === "2" ||
          Cookie.get("id_identifier") === "3" ? (
            <button className="btnCreate" onClick={() => setModalIsOpen(true)}>
              New Artikel
            </button>
          ) : (
            <></>
          )}

          <div className="search">
            <form style={{ width: "500px" }}>
              <input
                type="text"
                placeholder="Search Artikel..."
                name={inputSearch}
                onChange={handleChangeSearch}
                value={inputSearch}
                className="input-search"
              />
            </form>
          </div>
        </div>

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
                  artikels
                    .filter((artikel) => {
                      if (inputSearch === "") {
                        return artikel;
                      } else if (
                        artikel.title
                          .toLowerCase()
                          .includes(inputSearch.toLowerCase())
                      ) {
                        return artikel;
                      }
                    })
                    .map((artikel) => (
                      <tr key={artikel.id}>
                        <th scope="row">{artikel.id}</th>
                        <td>{artikel.title}</td>
                        <td>{artikel.publish}</td>
                        <td>
                          <div className={styles.column}>
                            {/* DETAIL */}
                            <button
                              className={styles.btnAction}
                              onClick={() =>
                                setdescModalIsOpen(true) & handleEdit(artikel)
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
                                    seteditModalIsOpen(true) &
                                    handleEdit(artikel)
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
                                          deleteArtikel(artikel.id),
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
