import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'

function LogoutBtn() {
    const dispatch = useDispatch()

    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch({ type: "LOGOUT" })
        })
    }

    return (
        <button
            className="group relative px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25 active:scale-95"
            onClick={logoutHandler} 
        >
            <span className="relative z-10 flex items-center space-x-2">
                <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
    )
}

export default LogoutBtn