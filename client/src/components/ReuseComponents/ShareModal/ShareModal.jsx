import React, { useState, useEffect } from 'react'
import "./ShareModal.css"
import Select from "react-select"
import makeAnimated from "react-select/animated"
import { Allusers } from '../../../api/users';
import Avatar from 'react-avatar';
import { shareFile } from '../../../api/share';
import { toast } from 'react-toastify';
import ClipLoader from "react-spinners/ClipLoader"

export default function ShareModal({ file_id, closeModal, user }) {

  const [ users, setUsers ] = useState([]);
  const [ selectedUsers, setSelectedUsers ] = useState([]);
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      const res = await Allusers();
      if (res && res.data.message == 'Users found') {
        setUsers(res.data.users);
      }
    }
    getUsers();
  }, []) 

  const allUsers = users?.filter(u => u.id !== user.id);

  const animatedComponents = makeAnimated();

  const handleSelect = (selectedUser) => {
    setSelectedUsers(selectedUser);
  }

  const options = allUsers?.map(u => ({ value: u.id, label: u.name}))


  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      display: 'flex',
      alignItems: 'center',
    }),
    optionLabel: {
      display: 'flex',
      alignItems: 'center',
    },
  };

  
  
  const getOptionLabel = (option) => (
    <div style={customStyles.optionLabel}>
      <Avatar name={option.label} size="24" round={true} /> 
      <span style={{ marginLeft: '8px' }}>{option.label}</span>
    </div>
  );


  const usersId = selectedUsers?.map(u => u.value)

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await shareFile(file_id, usersId);
      if (res && res.data.message == 'File shared successfully') {
        setLoading(false);
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          closeModal();
        }, 2000)
      } else {
        toast.error("Something went wrong", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red"
  }

  return (
    <div className='share-modal-container'>
        <div className="share-modal-content">
          <h4 onClick={closeModal}>X</h4>
          <p>Share your file with others</p>
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={options}
            onChange={handleSelect}
            className='share-modal-select'
            getOptionLabel={getOptionLabel}
            styles={customStyles}
          />
          <button 
            className='share-modal-btn'  
            disabled={selectedUsers.length > 0 || loading ? false : true}
            onClick={handleSubmit}
          >
              {
                loading ? (
                  <ClipLoader color="black" size={20} style={override}/>
                ) : (
                  "Share"
                )
              }
          </button>
        </div>
    </div>
  )
}
