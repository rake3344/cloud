import React, { useState, useEffect } from "react";
import "./AsideMenu.css";
import { Link, useLocation } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { BsDeviceSsd } from "react-icons/bs";
import { MdOutlineCloud } from "react-icons/md";
import { MdOutlineShare } from "react-icons/md";
import { MdStarOutline } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import { MdDriveFileMoveOutline } from "react-icons/md";
import { MdOutlineFolderOpen } from "react-icons/md";
import { uploadFile } from "../../../api/file";
import NewFolder from "../NewFolder/NewFolder";
import { toast } from "react-toastify";
import ProgressBar from "../ProgressBar/ProgressBar";

export default function AsideMenu() {

  const title = document.title;

  const [nuevoMenu, setNuevoMenu] = useState(false);
  const [openNewFolderModal, setOpenNewFolderModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleNuevoMenu = () => {
    setNuevoMenu(!nuevoMenu);
  };

  const handleFileUpload = async (e) => {
    try {
        setLoading(true);
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
        const res = await uploadFile(formData);
        if (res && res.data.message == "file uploaded successfully") {
            setLoading(false);
            window.location.reload();
        } else if (res && res.data.message == "storage is full") {
            toast.error(res.data.message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            })
        } else if (res && res.data.message == "file uploaded failed") {
            toast.error(res.data.message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            })
        }
    } catch (error) {
        console.error(error);
    }
  };

  const handleOpenNewFolderModal = () => {
    setOpenNewFolderModal(true);
  };

  const handleCloseNewFolderModal = () => {
    setOpenNewFolderModal(false);
  };

  return (
    <>
      <div className="aside-content">
        <div className="nuevo-container">
          <button className="nuevo-btn" onClick={handleNuevoMenu}>
            <FaPlus className="plus-icon" />
            New
          </button>
          {nuevoMenu && (
            <div className="nuevo-menu">
              <label htmlFor="file-upload" className="menu-item">
                <MdDriveFileMoveOutline className="icon" />
                Upload File
                <input
                  type="file"
                  id="file-upload"
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                />
              </label>
              <div className="menu-item" onClick={handleOpenNewFolderModal}>
                <MdOutlineFolderOpen className="icon" />
                New Folder
              </div>
            </div>
          )}
        </div>
        <div className="aside-menu">
          <ul>
            <li>
              <Link
                to="/home"
                className={`menu ${title == "home" ? "active" : ""}`}
              >
                <BsDeviceSsd className="icon" />
                My Files
              </Link>
            </li>
            <li>
              <Link
                to="/shares"
                className={`menu ${title == "share" ? "active" : ""}`}
              >
                <MdOutlineShare className="icon" />
                Share With Me
              </Link>
            </li>
            {/* <li>
              <Link
                to="/destacados"
                className={`menu ${title == "Destacados" ? "active" : ""}`}
              >
                <MdStarOutline className="icon" />
                Favorites
              </Link>
            </li> */}
            {/* <li>
              <Link
                to=""
                className={`menu ${title == "Papelera" ? "active" : ""}`}
              >
                <BsTrash className="icon" />
                Papelera
              </Link>
            </li> */}
            <li>
              <Link
                to=""
                className={`menu ${title == "Almacenamiento" ? "active" : ""}`}
              >
                <MdOutlineCloud className="icon" />
                Storage
              </Link>
              <div className="progressbar-container">
                <ProgressBar />
              </div>
            </li>
          </ul>
        </div>
      </div>
      {openNewFolderModal && (
        <NewFolder closeModal={handleCloseNewFolderModal} />
      )}
    </>
  );
}
