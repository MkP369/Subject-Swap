import './styles/App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import HowItWorks from './pages/HowItWorks.jsx';
import Testimonials from './pages/Testimonials.jsx';
import FAQ from './pages/FAQ.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Profile from './pages/Profile.jsx';
import CurrentSwaps from './pages/CurrentSwaps.jsx';
import Notifications from './pages/Notifications.jsx';


import {useAuthStore} from './store/authStore.jsx';

export default function App() {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    return (
        <Router>
            <Navbar/>

            <main>
                <Routes>
                    //public
                    <Route path="/" element={<Home/>}/>
                    <Route path="/how-it-works" element={<HowItWorks/>}/>
                    <Route path="/testimonials" element={<Testimonials/>}/>
                    <Route path="/faq" element={<FAQ/>}/>

                    //auth
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/login" element={<Login/>}/>

                    //after auth
                    <Route
                        path="/app/dashboard"
                        element={
                            isAuthenticated
                                ? <Dashboard/>
                                : <Navigate to="/login" replace/>
                        }
                    />
                    <Route
                        path="/app/currentswaps"
                        element={
                            isAuthenticated
                                ? <CurrentSwaps/>
                                : <Navigate to="/login" replace/>
                        }
                    />

                    <Route
                        path="/app/profile"
                        element={
                            isAuthenticated
                                ? <Profile/>
                                : <Navigate to="/login" replace/>
                        }
                    />
                    <Route
                        path="/app/notifications"
                        element={
                            isAuthenticated
                                ? <Notifications/>
                                : <Navigate to="/login" replace/>
                        }
                    />


                    //fallback
                    <Route
                        path="*"
                        element={
                            isAuthenticated
                                ? <Navigate to="/app/dashboard" replace/>
                                : <Navigate to="/" replace/>
                        }
                    />
                </Routes>
            </main>
        </Router>
    );
}
