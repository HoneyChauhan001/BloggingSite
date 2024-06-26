import './App.css'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/appWriteAuth'
import { login, logout } from './store/authSlice'
import Header from './components/header/Header'
import Navbar from './components/header/Navbar'
import Footer from './components/footer/Footer'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log("App is running")
    authService.getCurrentUser()
      .then((userData) => {
        if (userData && userData.emailVerification) {
          console.log(userData.emailVerification)
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : <><h1>Loading...</h1></>
}

export default App
