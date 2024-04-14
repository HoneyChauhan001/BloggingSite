import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/appWriteAuth'
import { logout } from '../../store/authSlice'


function LogoutBtn({
    className = ''
}
) {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }

    return (
        <button onClick={logoutHandler} className={`inline-block px-6 py-2 duration-200 hover:bg-blue-100 ${className}`}>
            Logout
        </button>
    )
}

export default LogoutBtn