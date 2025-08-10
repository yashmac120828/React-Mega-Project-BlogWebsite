import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet, useNavigate } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
          navigate("/login") // optional: redirect guests to login
        }
      })
      .finally(() => setLoading(false))
  }, [dispatch, navigate])

  return (
    <div className='min-h-screen flex flex-col bg-gray-400'>
      <Header />
      <main className="flex-grow">
        {loading ? (
          <div className="text-center py-8">Checking authentication...</div>
        ) : (
          <Outlet />
        )}
      </main>
      <Footer />
    </div>
  )
}

export default App
