import React, {useState} from 'react'
import "./Register.css"
import { register } from '../../api/auth'
import { toast } from "react-toastify"
import ClipLoader from "react-spinners/ClipLoader"


export default function Register() {
    document.title = "register"

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
    })

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    })

    const [loading, setLoading] = useState(false)

    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
    }

    const validateName = (name) => {
        if (name.length <= 0) {
            return "Name is required"
        }
        return ""
    }

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (email.length <= 0) {
            return "Email is required"
        } else if (!regex.test(email)) {
            return "Invalid email format"
        }
        return ""
    }

    const validatePassword = (password) => {
        if (password.length <= 0) {
            return "Password is required"
        } else if (password.length < 6) {
            return "Password must be at least 6 characters"
        } else if (password.length > 20) {
            return "Password must be at most 20 characters"
        }
        return ""
    }

    const handleData = (e) => {
        const {name, value} = e.target
        setData({...data, [name]: value})
        if (name == "name") {
            const errorMessage = validateName(value)
            setErrors({...errors, name: errorMessage})
        } else if (name == "email") {
            const errorMessage = validateEmail(value)
            setErrors({...errors, email: errorMessage})
        } else if (name == "password") {
            const errorMessage = validatePassword(value)
            setErrors({...errors, password: errorMessage})
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const res = await register(data)
        setLoading(false)
        if (res.data.status == 201) {
            localStorage.setItem("token", res.data.token)
            window.location.href = "/home"
        } else if (res.data.message == 'User already exist') {
            toast.error(res.data.message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            })
        } else {
            toast.error("Something went wrong", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            })
        }
    }

  return (
    <div className='auth-container'>
        <div className="register-card">
            <picture className='logo'>
                <img src="../../../src/assets/cloud.png" alt="cloud image" />
            </picture>
            <h1>Register</h1>
            <form action="" onSubmit={handleSubmit} className='auth-form'>
                <div className="input-field">
                    <input
                        type="text" 
                        name="name" 
                        value={data.name}
                        placeholder='Name'
                        onChange={handleData}
                    />
                    <p className="error-message">{errors.name}</p>
                </div>
                <div className="input-field">
                    <input 
                        type="email" 
                        name="email" 
                        value={data.email}
                        placeholder='Email'
                        onChange={handleData}
                    />
                    <p className="error-message">{errors.email}</p>
                </div>
                <div className="input-field">
                    <input 
                         type="password" 
                         name="password" 
                         value={data.password} 
                         placeholder='Password'
                         onChange={handleData}
                    />
                    <p className="error-message">{errors.password}</p>
                </div>
                <div className="input-field">
                    <button type="submit" disabled={
                        errors.name 
                        || errors.email 
                        || errors.password 
                        || data.name.length <= 0
                        || data.email.length <= 0
                        || data.password.length <= 0
                        || loading ? true : false 
                    }>
                        {loading ? <ClipLoader 
                            color="#ffffff"
                            loading={loading}
                            css={override}
                            size={15}
                        /> : "Register"}
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}
