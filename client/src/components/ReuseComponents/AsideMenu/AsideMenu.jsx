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

export default function AsideMenu() {

  const title = document.title;

  const [nuevoMenu, setNuevoMenu] = useState(false);
  const [openNewFolderModal, setOpenNewFolderModal] = useState(false);

  const handleNuevoMenu = () => {
    setNuevoMenu(!nuevoMenu);
  };

  const handleFileUpload = async (e) => {
    try {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
        const res = await uploadFile(formData);
        if (res && res.data.message == "file uploaded successfully") {
            alert("file uploaded successfully");
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
            Nuevo
          </button>
          {nuevoMenu && (
            <div className="nuevo-menu">
              <label htmlFor="file-upload" className="menu-item">
                <MdDriveFileMoveOutline className="icon" />
                Subir archivo
                <input
                  type="file"
                  id="file-upload"
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                />
              </label>
              <div className="menu-item" onClick={handleOpenNewFolderModal}>
                <MdOutlineFolderOpen className="icon" />
                Crear carpeta
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
                Mi unidad
              </Link>
            </li>
            <li>
              <Link
                to=""
                className={`menu ${title == "compartidos" ? "active" : ""}`}
              >
                <MdOutlineShare className="icon" />
                Compartidos
              </Link>
            </li>
            <li>
              <Link
                to="/destacados"
                className={`menu ${title == "Destacados" ? "active" : ""}`}
              >
                <MdStarOutline className="icon" />
                Destacados
              </Link>
            </li>
            <li>
              <Link
                to=""
                className={`menu ${title == "Papelera" ? "active" : ""}`}
              >
                <BsTrash className="icon" />
                Papelera
              </Link>
            </li>
            <li>
              <Link
                to=""
                className={`menu ${title == "Almacenamiento" ? "active" : ""}`}
              >
                <MdOutlineCloud className="icon" />
                Almacenamiento
              </Link>
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
