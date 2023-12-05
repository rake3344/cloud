import React, { useState, useEffect } from "react";
import AsideMenu from "../ReuseComponents/AsideMenu/AsideMenu";
import Navbar from "../ReuseComponents/Navbar/Navbar";
import { getSharedFiles } from "../../api/share";
import { MdDownload } from "react-icons/md";
import { MdShare } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { FaRegFilePdf } from "react-icons/fa6";
import { FaRegImage } from "react-icons/fa";
import { FaRegFile } from "react-icons/fa";
import { FaRegFileAudio } from "react-icons/fa";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
} from "@mui/material";
import ClipLoader from "react-spinners/ClipLoader";
import Avatar from "react-avatar";
import dayjs from "dayjs";
import { override } from "../../api/loaderStyle";
// import axios from 'axios';
// import { toast } from 'react-toastify';

export default function Share() {
  document.title = "share";

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fileId, setFileId] = useState(null);
  // const [ openShareModal, setOpenShareModal ] = useState(false);

  useEffect(() => {
    const res = async () => {
      setLoading(true);
      const response = await getSharedFiles();
      if (response && response.data.status == 200) {
        setData(response.data.sharedFiles);
        setLoading(false);
      }
    };
    res();
  }, []);

  // const handleOpenShareModal = () => {
  //     setOpenShareModal(!openShareModal);
  // }

  // const handleCloseModal = () => {
  //     setOpenShareModal(false);
  // }

  return (
    <>
      <Navbar />
      <div className="home-container">
        <aside>
          <AsideMenu />
        </aside>
        <section>
          {loading ? (
            <div style={override}>
              <ClipLoader color="black" loading={loading} size={50} />
            </div>
          ) : (
            <>
              {data.length > 0 ? (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Size</TableCell>
                        <TableCell>Ext</TableCell>
                        <TableCell>Owner</TableCell>
                        <TableCell>Upload date</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data?.map((file) => {
                        let fileIcon;

                        if (file.files.file_type == "pdf") {
                          fileIcon = <FaRegFilePdf className="icon" />;
                        } else if (
                          file.files.file_type == "png" ||
                          file.files.file_type == "jpg" ||
                          file.files.file_type == "jpeg" ||
                          file.files.file_type == "gif"
                        ) {
                          fileIcon = <FaRegImage className="icon" />;
                        } else if (
                          file.files.file_type == "mp3" ||
                          file.files.file_type == "mp4" ||
                          file.files.file_type == "avi" ||
                          file.files.file_type == "mkv"
                        ) {
                          fileIcon = <FaRegFileAudio className="icon" />;
                        } else {
                          fileIcon = <FaRegFile className="icon" />;
                        }
                        return (
                          <TableRow key={file.id} className="table-row">
                            <TableCell>
                              {fileIcon}
                              {file.files.file_name}
                            </TableCell>
                            <TableCell>{file.files.file_size} MB</TableCell>
                            <TableCell>{file.files.file_type}</TableCell>
                            <TableCell className="owner-cell">
                              <Avatar
                                name={file.share_user.name}
                                size="20"
                                round={true}
                                className="owner-avatar"
                              />
                              {file.share_user.name}
                            </TableCell>
                            <TableCell>
                              {dayjs(file.files.created_at).format(
                                "DD/MM/YYYY"
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="actions">
                                <button>
                                  <a
                                    href={file.files.file_path}
                                    download={file.files.file_name}
                                    className="link-download"
                                  >
                                    <MdDownload className="actions-icon" />
                                  </a>
                                </button>
                                {/* <button onClick={() => {
                                                                        setFileId(file.files.id);
                                                                        handleOpenShareModal();
                                                                    }}>
                                                                        <MdShare className="actions-icon" />
                                                                    </button> */}
                                {/* <button
                                                                        onClick={async () => {
                                                                            
                                                                        }}
                                                                    >
                                                                        <MdOutlineDelete className="actions-icon" />
                                                                    </button> */}
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <div className="empty-files">
                  <h1>No files found</h1>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </>
  );
}
