import { useAuthStore } from '../store/authStore.jsx';
import "../styles/Profile.css";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const logout = useAuthStore(state => state.logout);
  const token = useAuthStore(state => state.token);
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  

    const handleLogout = () => {
        logout();              // clear user auth state
        navigate('/');         // redirect to home page (or login, as you prefer)
    };
    const backhome = () => {
        navigate('/');         
    };
    const handleImageChange = (e) => {
  if (e.target.files && e.target.files[0]) {
    setSelectedImage(e.target.files[0]);
  }
};
    useEffect(() => {
  async function fetchProfile() {
    if (!token) return;

    const res = await fetch('http://localhost:8000/api/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const userinfo = await res.json();

    if (userinfo.success) {
      setProfile(userinfo.user);
    } else {
      console.error(userinfo.message);
    }
  }

    fetchProfile();
    }, [token]);
    const [selectedImage, setSelectedImage] = useState(null);

    const sub = [
  "Mathematics", "Physics", "Chemistry", "Biology",
  "English", "Computer Science", "Economics",
  "History", "Geography", "Psychology", "Business Studies"
];
const [selstr, setstr] = useState('');
const [str, setsub] = useState([]);
const [selWeak, setWeak] = useState('');
const [weakSubjects, setWeakSubjects] = useState([]);

const handleAdd = () => {
  const ifexist = str.includes(selstr);
  const isValid = selstr !== "";

  if (isValid && !ifexist) {
    setsub(str.concat(selstr));
  }
};

const handlerem = () => {
  const ifexist = str.includes(selstr);
  const isValid = selstr !== "";

  if (isValid && ifexist) {
    const temp = str.filter(subject => subject !== selstr);
    setsub(temp);
  }
};

// --- Weak Subjects ---
const handleAddWeak = () => {
  const ifexist = weakSubjects.includes(selWeak);
  const isValid = selWeak !== "";

  if (isValid && !ifexist) {
    setWeakSubjects(weakSubjects.concat(selWeak));
  }
};

const handleRemoveWeak = () => {
  const ifexist = weakSubjects.includes(selWeak);
  const isValid = selWeak !== "";

  if (isValid && ifexist) {
    const temp = weakSubjects.filter(subject => subject !== selWeak);
    setWeakSubjects(temp);
  }
};

  if (!profile) return <div className='loading'>Loading profile...</div>;
    return (
      <div>
      <div className="top-bar">
        <h2 className="profilehead">Your Profile</h2>
        <button className="homebut" onClick={backhome}>HOME</button>
      </div>

      <div className="profile-container">
        <div className="image">
          <img 
            src={selectedImage ? URL.createObjectURL(selectedImage) :"https://th.bing.com/th/id/OIP.rJm6vkMoNXsIZ_dsJ1VAWQHaHa?w=181&h=181&c=7&r=0&o=5&pid=1.7"}
            alt="Profile"
            className="profileimg"
          />
          
          
          <label htmlFor="profilePic" className="imglab ">Upload New Picture</label>
          <input type="file"id="imageUpload" accept="image/*" onChange={handleImageChange}className="imginp"
          />
        </div>

        <div className="mid">
          <h3 className="name">{profile.username}</h3>

          <div className="bio">
            <h4 className="biohead">BIO</h4>
            <p>Email: {profile.email}</p>
            <p>Age: {profile.age}</p>
            <p>Board: {profile.board || 'Nil'}</p>
            <p>Class: {profile.userClass}</p>
            <p>Language: {profile.language}</p>
            <p>Phone: {profile.phone || 'Nil'}</p>

            <div>
              <button className="logoutbut" onClick={handleLogout}>Log Out</button>
            </div>
          </div>

          <div className="subjects">
          <p><strong>Strong Subjects</strong></p>
          <div className="subject-dropdown-group">
          <select
            value={selstr}
            onChange={(e) => setstr(e.target.value)}
            className="subject-dropdown"
           >
          <option value=""> subjects </option>
          {sub.map((subject, index) => (
              <option key={index} value={subject}>{subject}</option>
               ))}
          </select>
          <button onClick={handleAdd} className="addsub">+</button>
          <button onClick={handlerem} className="remsub">-</button>
          </div>
          <ul className="listofstrsub">
            {str.map((subject, index) => (
          <p key={index}>{subject}</p>
           ))}
        </ul>
        </div>
          <div className="subjects">
      <p><strong>Weak Subjects</strong></p>
      <div className="subject-dropdown-group">
        <select
            value={selWeak}
            onChange={(e) => setWeak(e.target.value)}
            className="subject-dropdown"
        >
            <option value=""> subjects </option>
            {sub.map((subject, index) => (
            <option key={index} value={subject}>{subject}</option>
           ))}
        </select>
        <button onClick={handleAddWeak} className="addsub">+</button>
        <button onClick={handleRemoveWeak} className="remsub">-</button>
      </div>
      <ul className="listofstrsub">
        {weakSubjects.map((subject, index) => (
        <p key={index}>{subject}</p>
        ))}
      </ul>
      </div>
        </div>
      </div>

      <div className="recentswaps">
        <p>Recent Swaps</p>
      </div>
    </div>
    );
}
