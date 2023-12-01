import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import { ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import Home from './components/Home/Home'
import Destacados from './components/Destacados/Destacados'

function App() {

  const token = localStorage.getItem("token")
  
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/' element={!token ? <Login /> : <Navigate to="/home" /> } />
        <Route path='/register' element={!token ? <Register /> : <Navigate to="/home" />} />
        <Route path='/home' element={token ? <Home /> : <Navigate to="/" />} />
        {/* <Route path='/destacados' element={token ? <Destacados /> : <Navigate to="/" />} /> */}
      </Routes>
    </>
  )
}

export default App
