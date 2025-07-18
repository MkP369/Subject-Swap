import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const logout = useAuthStore(state => state.logout);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <div >
            <h2>Your Profile</h2>


            <button onClick={handleLogout}>
                Log Out
            </button>
        </div>
    );
}
