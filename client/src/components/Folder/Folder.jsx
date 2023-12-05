import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../ReuseComponents/Navbar/Navbar'
import AsideMenu from '../ReuseComponents/AsideMenu/AsideMenu'
import { getFolder } from '../../api/folder'
import { toast } from 'react-toastify'
import './Folder.css'
import { uploadFileToFolder } from '../../api/file'
import ClipLoader from 'react-spinners/ClipLoader'
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Button,
    TableContainer,
  } from "@mui/material";
import { MdDownload } from "react-icons/md";
import { MdShare } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { icon } from '../../api/icons'
import dayjs from 'dayjs'
import { override } from '../../api/loaderStyle'
import ShareModal from '../ReuseComponents/ShareModal/ShareModal'
import { getUser } from '../../api/auth'
import axios from 'axios'
import { Link } from "react-router-dom"
import FileModal from '../ReuseComponents/FileModal/FileModal'

export default function Folder() {

    const { id } = useParams()

    const [ folder, setFolder ] = useState({})
    const [ loading, setLoading ] = useState(false)
    const [ fileId, setFileId ] = useState(null)
    const [ openShareModal, setOpenShareModal ] = useState(false)
    const [ user, setUser ] = useState({})
    const [ fileUrl, setFileUrl ] = useState(null)
    const [ fileType, setFileType ] = useState(null)
    const [ fileName, setFileName ] = useState(null)
    const [ openFileModal, setOpenFileModal ] = useState(false)

    useEffect(() => {
        const res = async () =>{
            setLoading(true)
            const response = await getFolder(id)
            if (response && response.data.status == 200){
                setLoading(false)
                setFolder(response.data.folderFiles)
            } else {
                toast.error("Something went wrong", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark"
                })
            } 
        }
        res()
    }, [id])

    useEffect(() => {
        const res = async () => {
            const response = await getUser()
            if (response && response.data.message == "User found"){
                setUser(response.data.user)
            }
        }
        res()
    }, [])

    const handleSubmit = async (e) => {
        setLoading(true)
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file)
        
        try {
            const res = await uploadFileToFolder(formData, id)
            if (res && res.data.status == 200) {
                toast.success("File uploaded successfully", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark"
                })

                const response = await getFolder(id);
                if (response && response.data.status == 200){
                    setLoading(false)
                    setFolder(response.data.folderFiles)
                } else {
                    toast.error("Something went wrong", {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark"
                    })
                }
            }
        } catch (error) {
            setLoading(false)
            toast.error("Something went wrong", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            })
        }
    }

    const handleOpenShareModal = () => {
        setOpenShareModal(!openShareModal);
    }

    const handleCloseShareModal = () => {
        setOpenShareModal(false);
    }

    const handleOpenFileModal = () => {
        setOpenFileModal(!openFileModal)
    }

    const handleCloseFileModal = () => {
        setOpenFileModal(false)
    }

  return (
    <>  
        <Navbar />
        <div className="home-container">
            <aside>
                <AsideMenu />
            </aside>
            <section>
                {
                    loading ? (
                        <div style={override}>
                            <ClipLoader color="black" loading={loading} size={50} />
                        </div>
                    ) : (
                        <>
                            <div className="folder_header">
                                <h1>{folder.folder_name}</h1>
                                <label htmlFor='file'>
                                    Upload file
                                    <input type="file" id="file" onChange={handleSubmit} style={{ display: "none" }}/>
                                </label>
                            </div>
                            {
                                folder.files?.length > 0 ? (
                                    <TableContainer>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Name</TableCell>
                                                    <TableCell>Size</TableCell>
                                                    <TableCell>Ext</TableCell>
                                                    <TableCell>Upload date</TableCell>
                                                    <TableCell>Actions</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    folder.files && folder.files?.map((file) => (
                                                        <TableRow key={file.id}>
                                                            <TableCell onClick={() =>{
                                                                setFileUrl(file.file_path)
                                                                setFileType(file.file_type)
                                                                setFileName(file.file_name)
                                                                handleOpenFileModal()
                                                            }}>
                                                                {icon(file.file_type)}
                                                                {file.file_name}
                                                            </TableCell>
                                                            <TableCell>{file.file_size} MB</TableCell>
                                                            <TableCell>{file.file_type}</TableCell>
                                                            <TableCell>{dayjs(file.created_at).format('DD/MM/YYYY')}</TableCell>
                                                            <TableCell>
                                                                <div className="actions">
                                                                    <button>
                                                                        <a href={file.file_path} download={file.file_name} className="link-download">
                                                                            <MdDownload className="actions-icon" />
                                                                        </a>
                                                                    </button>
                                                                    <button onClick={() => {
                                                                        setFileId(file.id)
                                                                        handleOpenShareModal()
                                                                    }}>
                                                                        <MdShare className="actions-icon" />
                                                                    </button>
                                                                    <button onClick={async () => {
                                                                        setLoading(true)
                                                                        const res = await axios.delete(`/file/${file.id}`, {
                                                                            headers: {
                                                                                Authorization: `Bearer ${localStorage.getItem('token')}`
                                                                            }
                                                                        })
                                                                        if (res && res.data.status == 200) {
                                                                            setLoading(false)
                                                                            toast.success("File deleted successfully", {
                                                                                position: "top-right",
                                                                                autoClose: 2000,
                                                                                hideProgressBar: false,
                                                                                closeOnClick: true,
                                                                                draggable: true,
                                                                                progress: undefined,
                                                                                theme: "dark"
                                                                            })
                                                                            setTimeout(() => {
                                                                                window.location.reload()
                                                                            }, 1500)
                                                                        } else {
                                                                            setLoading(false)
                                                                            toast.error("Something went wrong", {
                                                                                position: "top-right",
                                                                                autoClose: 2000,
                                                                                hideProgressBar: false,
                                                                                closeOnClick: true,
                                                                                draggable: true,
                                                                                progress: undefined,
                                                                                theme: "dark"
                                                                            })
                                                                        }
                                                                    }}>
                                                                        <MdOutlineDelete className="actions-icon" />
                                                                    </button>
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                ) : (
                                    <div className="no_files">
                                        <h1>No files in this folder</h1>
                                    </div>
                                )
                            }
                            {
                                openShareModal && (
                                    <ShareModal 
                                        file_id={fileId}
                                        closeModal={handleCloseShareModal}
                                        user={user}
                                    />
                                )
                            }
                            {
                                openFileModal && (
                                    <FileModal fileUrl = {fileUrl} fileType= {fileType} fileName = {fileName} closeModal= {handleCloseFileModal}/>
                                )
                            }
                        </>
                    )
                }
            </section>
        </div>
    </>
  )
}
