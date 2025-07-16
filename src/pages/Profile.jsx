import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const logout = useAuthStore(state => state.logout);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();              // clear user auth state
        navigate('/');         // redirect to home page (or login, as you prefer)
    };

    return (
        <div >
            <h2>Your Profile</h2>
            {/* Add your profile details here */}

            <button onClick={handleLogout}>
                Log Out
            </button>
        </div>
    );
}
