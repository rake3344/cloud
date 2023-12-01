import React, { useState } from 'react'
import "./NewFolder.css"
import { createFolder } from '../../../api/folder';
import { toast } from 'react-toastify';
export default function NewFolder({ closeModal }) {

    const [folderName, setFolderName ] = useState({
        name: ""
    });

    const [errors, setErrors] = useState({
        name: ""
    });

    const validateInput = (name) => {
        if (name.length <= 0) {
            return "El nombre de la carpeta no puede estar vacio"
        }
        return ""
    }

    const handleFolderName = (e) => {

        const { name, value } = e.target

        setFolderName({
            ...folderName,
            [name]: value
        })

        const errorMessage = validateInput(value)
        setErrors({
            ...errors,
            name: errorMessage
        })
    }

    const handleSubmit = async () => {
        const response = await createFolder(folderName)
        if (response.data.message == "folder created") {
            closeModal();
        } else {
            toast.error(response.data.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            });
        }
    }

  return (
    <div className='new-folder-modal-container'>
        <div className="new-folder-content">
            <div className="new-folder-header">
                <h3 className="new-folder-title">Nueva carpeta</h3>
            </div>
            <div className="new-folder-body">
                <input 
                    type="text" 
                    className={`new-folder-input ${errors.name ? "error" : ""}`} 
                    placeholder="Nombre de la carpeta" 
                    name='name' 
                    value={folderName.name} 
                    autoComplete='off'
                    onChange={handleFolderName}/>
            </div>
            <div className="new-folder-footer">
                <button className="new-folder-btn" onClick={closeModal}>Cancelar</button>
                <button className="new-folder-create-btn" onClick={handleSubmit} disabled={errors.name}>Crear</button>
            </div>
        </div>
    </div>
  )
}
