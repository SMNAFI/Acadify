import { useSelector } from 'react-redux'
import useAuth from '../hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom'

export default function AdminRoute() {
    const auth = useSelector((state) => state.auth)
    const isLoggedIn = useAuth()

    // if already logged in as admin
    return isLoggedIn && auth.user.role === 'admin' ? (
        <Navigate to='/admin/dashboard' />
    ) : (
        <Outlet />
    )
}
