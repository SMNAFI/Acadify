import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/admin/Dashboard'
import Assignment from './pages/admin/Assignment'
import AdminLogin from './pages/admin/AdminLogin'
import CoursePlayer from './pages/student/CoursePlayer'
import Quizzes from './pages/admin/Quizzes'
import Videos from './pages/admin/Videos'
import StudentLogin from './pages/student/StudentLogin'
import LeaderBoard from './pages/student/LeaderBoard'
import StudentRegister from './pages/student/StudentRegister'
import useAuthCheck from './hooks/useAuthCheck'
import Loader from './ui/Loader'
import PrivateRoute from './components/PrivateRoute'
import PublicRoute from './components/PublicRoute'
import AdminProtectedRoute from './components/AdminProtectedRoute'
import AdminRoute from './components/AdminRoute'
import EditAssignment from './pages/admin/EditAssignment'
import EditVideo from './pages/admin/EditVideo'
import AddVideo from './pages/admin/AddVideo'
import AddAssignment from './pages/admin/AddAssignment'
import AddQuize from './pages/admin/AddQuize'
import AssignmentMarkList from './pages/admin/AssignmentMarkList'
import EditQuiz from './pages/admin/EditQuiz'

function App() {
    const isAuthChecked = useAuthCheck()

    return isAuthChecked ? (
        <Router>
            <Routes>
                {/* Public Route */}
                <Route element={<PublicRoute />}>
                    <Route path='/' element={<StudentLogin />} />
                    <Route path='/registration' element={<StudentRegister />} />
                </Route>
                {/* Private Route -> Student*/}
                <Route element={<PrivateRoute />}>
                    <Route path='/videos' element={<CoursePlayer home />} />
                    <Route path='/videos/:videoId' element={<CoursePlayer />} />
                    <Route path='/leaderboard' element={<LeaderBoard />} />
                </Route>

                {/* Admin -> Public Route*/}
                <Route element={<AdminRoute />}>
                    <Route path='/admin' element={<AdminLogin />} />
                </Route>
                {/* Admin -> Private Route*/}
                <Route element={<AdminProtectedRoute />}>
                    <Route path='/admin/dashboard' element={<Dashboard />} />
                    <Route path='/admin/videos' element={<Videos />} />
                    <Route path='/admin/videos/add' element={<AddVideo />} />
                    <Route
                        path='/admin/videos/edit/:videoId'
                        element={<EditVideo />}
                    />
                    <Route path='/admin/assignment' element={<Assignment />} />
                    <Route
                        path='/admin/assignment/add'
                        element={<AddAssignment />}
                    />
                    <Route
                        path='/admin/assignment/edit/:assignmentId'
                        element={<EditAssignment />}
                    />
                    <Route path='/admin/quizzes' element={<Quizzes />} />
                    <Route path='/admin/quizzes/add' element={<AddQuize />} />
                    <Route
                        path='/admin/quizzes/edit/:quizId'
                        element={<EditQuiz />}
                    />
                    <Route
                        path='/admin/assignment-mark'
                        element={<AssignmentMarkList />}
                    />
                </Route>
            </Routes>
        </Router>
    ) : (
        <Loader />
    )
}

export default App
