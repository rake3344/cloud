import React, { useState, useEffect } from "react";
import "./Home.css";
import Navbar from "../ReuseComponents/Navbar/Navbar";
import { Link } from "react-router-dom"
import { FaPlus } from "react-icons/fa6";
import { BsDeviceSsd } from "react-icons/bs";
import { MdOutlineCloud } from "react-icons/md";
import { MdOutlineShare } from "react-icons/md";
import { MdStarOutline } from "react-icons/md";
import { BsTrash } from "react-icons/bs";



export default function Home() {

    document.title = "home";

    const title = document.title;


  return (
    <>
      <Navbar />
      <div className="home-container">
        <aside className="aside-nav">
            <div className="aside-content">
                <button className="nuevo-btn">
                    <FaPlus className="plus-icon"/>
                    Nuevo
                </button>
                <div className="aside-menu">
                    <ul>
                        <li>
                            <Link to="/home" className={`menu ${title == "home" ? "active" : ""}`}>
                                <BsDeviceSsd className="icon"/>
                                Mi unidad
                            </Link>
                        </li>
                        <li>
                            <Link to="" className={`menu ${title == "compartidos" ? "active" : ""}`}>
                                <MdOutlineShare className="icon"/>
                                Compartidos
                            </Link>
                        </li>
                        <li>
                            <Link to="" className={`menu ${title == "Destacados" ? "active" : ""}`}>
                                <MdStarOutline className="icon"/>
                                Destacados
                            </Link>
                        </li>
                        <li>
                            <Link to="" className={`menu ${title == "Papelera" ? "active" : ""}`}>
                                <BsTrash className="icon"/>
                                Papelera
                            </Link>
                        </li>
                        <li>
                            <Link to="" className={`menu ${title == "Almacenamiento" ? "active" : ""}`}>
                                <MdOutlineCloud className="icon"/>
                                Almacenamiento
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </aside>
        <section className="main-home-container">Hola section</section>
      </div>
    </>
  );
}
