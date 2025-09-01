import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignIn from '../components/sign-in/SignIn'
import SignUp from '../components/sign-in/SignUp'
import NotFoundPage from './NotFoundPage'
import HomePage from '../components/LandingPage/HomePage'
import ProtectedRoute from '../service/ProtectedRoute'
import AuthSuccess from '../service/AuthSuccess'

const AppRoutes = () => {
    return (
        <div>

            <BrowserRouter>
                <Routes>
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/" element={<ProtectedRoute>
                        <HomePage />
                    </ProtectedRoute>} />
                    <Route path="/auth-success" element={<AuthSuccess />} />

                    <Route path="*" element={<NotFoundPage />} />
                </Routes>

            </BrowserRouter>
        </div>
    )
}

export default AppRoutes