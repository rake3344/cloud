import React, { useState, useEffect } from "react";
import "./Home.css";
import Navbar from "../ReuseComponents/Navbar/Navbar";
import { Link } from "react-router-dom";
import AsideMenu from "../ReuseComponents/AsideMenu/AsideMenu";
import { getFiles } from "../../api/file";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  TableContainer,
} from "@mui/material";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { FaRegFolder } from "react-icons/fa";
import { FaRegFilePdf } from "react-icons/fa6";
import { FaRegImage } from "react-icons/fa";
import { FaRegFile } from "react-icons/fa";
import { FaRegFileAudio } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import { MdShare } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import axios from "axios";

export default function Home() {
  document.title = "home";
  const [ files, setFiles ] = useState([]);
  const [ folders, setFolders ] = useState([]);
  const [ fileId, setFileId ] = useState(null);
  const [ openShareModal, setOpenShareModal ] = useState(false);

  useEffect(() => {
    const res = async () => {
      const response = await getFiles();
      if (response && response.data.status == 200) {
        setFiles(response.data.files);
        setFolders(response.data.folders);
      } else {
        toast.error("Something went wrong", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    };
    res();
  }, []);

  const handleOpenShareModal = () => {
    setOpenShareModal(!openShareModal);
  }

  console.log(fileId);

  return (
    <>
      <Navbar />
      <div className="home-container">
        <aside>
          <AsideMenu />
        </aside>
        <section>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Size</TableCell>
                  <TableCell>Ext</TableCell>
                  <TableCell>Created date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {folders?.map((folder) => {
                  return (
                    <TableRow key={folder.id} className="table-row">
                      <TableCell className="table-cell">
                        <FaRegFolder className="icon" />
                        {
                          <Link to={`/folder/${folder.id}`} className="link">
                            {folder.folder_name}
                          </Link>
                        }
                      </TableCell>
                      <TableCell>---</TableCell>
                      <TableCell>---</TableCell>
                      <TableCell>
                        {dayjs(folder.created_at).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell>
                        <Link to={`/folder/${folder.id}`} className="link">
                          <Button>Open</Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {files?.map((file) => {
                  let fileIcon;

                  if (file.file_type == "pdf") {
                    fileIcon = <FaRegFilePdf className="icon" />;
                  } else if (
                    file.file_type == "png" ||
                    file.file_type == "jpg" ||
                    file.file_type == "jpeg" ||
                    file.file_type == "gif"
                  ) {
                    fileIcon = <FaRegImage className="icon" />;
                  } else if (
                    file.file_type == "mp3" ||
                    file.file_type == "mp4" ||
                    file.file_type == "avi" ||
                    file.file_type == "mkv"
                  ) {
                    fileIcon = <FaRegFileAudio className="icon" />;
                  } else {
                    fileIcon = <FaRegFile className="icon" />;
                  }

                  return (
                    <TableRow key={file.id} className="table-row">
                      <TableCell>
                        {fileIcon}
                        {file.file_name}
                      </TableCell>
                      <TableCell>{file.file_size} MB</TableCell>
                      <TableCell>{file.file_type}</TableCell>
                      <TableCell>
                        {dayjs(file.created_at).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell>
                        <div className="actions">
                          <button>
                            <a
                              href={file.file_path}
                              download={file.file_name}
                              className="link"
                            >
                              <MdDownload className="actions-icon" />
                            </a>
                          </button>
                          <button onClick={() => {
                            setFileId(file.id);
                            handleOpenShareModal();
                          }}>
                            <MdShare className="actions-icon" />
                          </button>
                          <button
                            onClick={async () => {
                              const res = await axios.delete(
                                `/file/${file.id}`,
                                {
                                  headers: {
                                    Authorization: `Bearer ${localStorage.getItem(
                                      "token"
                                    )}`,
                                  },
                                }
                              );
                              if (res.data.status == 200) {
                                location.reload();
                              } else {
                                toast.error("Something went wrong", {
                                  position: "top-right",
                                  autoClose: 2000,
                                  hideProgressBar: false,
                                  closeOnClick: true,
                                  draggable: true,
                                  progress: undefined,
                                  theme: "dark",
                                });
                              }
                            }}
                          >
                            <MdOutlineDelete className="actions-icon" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </section>
      </div>
    </>
  );
}
