import React from 'react'
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Button,
    TableContainer,
} from "@mui/material";
import { FaRegFilePdf } from "react-icons/fa6";
import { FaRegImage } from "react-icons/fa";
import { FaRegFile } from "react-icons/fa";
import { FaRegFileAudio } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import { MdShare } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import ClipLoader from "react-spinners/ClipLoader"

export default function Table({ files, loading, handleDelete }) {


    const override = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        position: 'relative', 
        borderColor: 'red'
      }


  return (
    <>
        {
            loading ? (
                <div className="loading" style={override}>
                    <ClipLoader color="black" loading={loading} size={50} />
                </div>
            ) : (
                <>
                    {
                        files?.length > 0 ? (
                            <div></div>
                        ) : (
                            <div className="no-files">
                                <h2>No files found</h2>
                            </div>
                        )
                    }
                </>
            )
        }
    </>
  )
}
