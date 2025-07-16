import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import '../styles/Navbar.css';

export default function Navbar() {
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);

    return (
        <nav className="navbar">
            <div className="logo">
                <Link to={isAuthenticated ? '/app/dashboard' : '/'} className="logo-link">
                    <img src="/SubjectSwapLogo.png" alt="Subject Swap Logo" />
                </Link>
            </div>


            <div className="center">
                {isAuthenticated ? (
                    <Link to="/app/currentswaps">My Current Swaps</Link>
                ) : (
                    <>
                        <Link to="/how-it-works">How It Works</Link>
                        <Link to="/testimonials">Testimonials</Link>
                        <Link to="/faq">FAQ</Link>
                    </>
                )}
            </div>

            <div className="right">
                {isAuthenticated ? (
                    <>
                        <Link to="/app/notifications">Notifications</Link>
                        <Link to="/app/profile">Profile</Link>
                    </>
                ) : (
                    <>
                        <Link to="/signup">Sign Up</Link>
                        <Link to="/login">Log In</Link>
                    </>
                )}
            </div>
        </nav>
    );
}
