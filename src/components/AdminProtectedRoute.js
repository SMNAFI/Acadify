import { useSelector } from 'react-redux'
import useAuth from '../hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom'

export default function AdminProtectedRoute() {
    const auth = useSelector((state) => state.auth)
    const isLoggedIn = useAuth()

    return isLoggedIn && auth.user.role === 'admin' ? (
        <Outlet />
    ) : (
        <Navigate to='/admin' />
    )
}
