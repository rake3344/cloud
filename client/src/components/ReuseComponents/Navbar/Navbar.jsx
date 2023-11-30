import React, {useState, useEffect} from 'react'
import "./Navbar.css"
import Avatar from 'react-avatar';
import { getUser } from '../../../api/auth';
import { MdLogout } from "react-icons/md";
import { MdOutlineSettings } from "react-icons/md";


export default function Navbar() {
    const [user, setUser] = useState({})
    const [menuOpen, setMenuOpen] = useState(false) 

    useEffect(() => {
        const response = async () => {
            const res = await getUser()
            if (res.data.message == "User found"){
                setUser(res.data.user)
            }
        }
        response()
    }, [])

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen)
    }

    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.href = "/"
    }
  return (
    <nav className='nav-container'>
        <picture>
            <img src="../../../../src/assets/cloud.png" alt="cloud image" />
        </picture>
        <div className='avatar-container'>
            <Avatar name={user.name} size="40" round={true} onClick={handleMenuToggle}/>
            {
                menuOpen && (
                    <div className="avatar-menu">
                        <ul>
                            <li>
                                <MdOutlineSettings className='icon'/>
                                Settings
                            </li>
                            <li onClick={handleLogout}>
                                <MdLogout className='icon'/>
                                Logout
                            </li>
                            
                        </ul>
                    </div>
                )
            }
        </div>
    </nav>
  )
}
