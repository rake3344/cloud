import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import { ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
// import '@coreui/coreui/dist/css/coreui.min.css'
import Home from './components/Home/Home'
import Destacados from './components/Destacados/Destacados'
import Share from './components/Share/Share'
import Folder from './components/Folder/Folder'

function App() {

  const token = localStorage.getItem("token")
  
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/' element={!token ? <Login /> : <Navigate to="/home" /> } />
        <Route path='/register' element={!token ? <Register /> : <Navigate to="/home" />} />
        <Route path='/home' element={token ? <Home /> : <Navigate to="/" />} />
        <Route path='/destacados' element={token ? <Destacados /> : <Navigate to="/" />} />
        <Route path='/shares' element={token ? <Share /> : <Navigate to="/" />} />
        <Route path='/folder/:id' element={token ? <Folder /> : <Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App
