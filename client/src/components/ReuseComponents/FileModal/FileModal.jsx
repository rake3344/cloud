import React from 'react'
import "./FileModal.css";


export default function FileModal({ fileUrl, fileType, fileName,  closeModal }) {


    console.log(fileUrl);

    const renderFile = () => {
        if (fileType == "png" || fileType == "jpeg" || fileType == "jpg") {
            return (
                <img src={fileUrl} alt="image" />
            )
        } else if (fileType == "pdf") {
            return (
                <iframe src={fileUrl} title="PDF Viewer" width="100%"  height="500px"></iframe>
            )
        } else {
            return <a href={fileUrl} download={fileName} />
        }
    }


  return (
    <div className='file-modal-container'>
        <div className="file-modal-content">
            <span onClick={closeModal}>&times;</span>
            {renderFile()}
        </div>
    </div>
  )
}
