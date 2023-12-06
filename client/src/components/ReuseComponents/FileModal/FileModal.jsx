import React from 'react'
import "./FileModal.css";


export default function FileModal({ fileUrl, fileType, fileName,  closeModal }) {


    const renderFile = () => {
        if (fileType == "png" || fileType == "jpeg" || fileType == "jpg") {
            return (
                <div className="img-file">
                    <img src={fileUrl} alt="image" />
                </div>
            )
        } else if (fileType == "pdf") {
            return (
                // <iframe src={fileUrl} title="PDF Viewer" width="100%"  height="500px"></iframe>
                <embed src={fileUrl} type="application/pdf" width="100%" height="600px" />
            )
        } else {
            return <a href={fileUrl} download={fileName} />
        }
    }


  return (
    <div className='file-modal-container'>
        <div className="file-modal-content">
            <h4 onClick={closeModal}>X</h4>
            {renderFile()}
        </div>
    </div>
  )
}
