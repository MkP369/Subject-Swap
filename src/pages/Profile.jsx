import { useAuthStore } from '../store/authStore.jsx';
import "../styles/Profile.css";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const logout = useAuthStore(state => state.logout);
  const token = useAuthStore(state => state.token);
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const [availability, setAvailability] = useState("Flexible");
  const [chatOnly, setChatOnly] = useState(false);

  const [selstr, setstr] = useState('');
  const [str, setsub] = useState([]);

  const [selWeak, setWeak] = useState('');
  const [weakSubjects, setWeakSubjects] = useState([]);

  const sub = [
    "Python Programming", "Mathematics", "Science",
    "Organic Chemistry", "History of Art", "JavaScript", "Physics",
    "Social Science", "Microeconomics", "UI/UX Design"
  ];

  const daysList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  const handlesave= async() => {
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
    <div className="profilebody">
      <div className="top-bar">
        <h2 className="profilehead">Your Profile</h2>
        <button className="homebut" onClick={backhome}>HOME</button>
      </div>

      <div className="profile-container">
        <div className="image">
          <img
            src={selectedImage ? URL.createObjectURL(selectedImage) : "https://th.bing.com/th/id/OIP.CuSAMOgN8JsY-ofUsV-Z2wHaHa?w=201&h=201&c=7&r=0&o=7&pid=1.7&rm=3"}
            alt="Profile"
            className="profileimg"
          />

          <label htmlFor="imageUpload" className="imglab">Upload New Picture</label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleImageChange}
            className="imginp"
          />
          
          <button className="saveimg" onClick={handlesave}>save</button>
          
        </div>

        <div className="mid">
          <h3 className="name">{profile.username}</h3>

          <div className="bio">
            <div className='topbiobar'>

            
            <h4 className="biohead">BIO</h4>
            <button className="editbut">EDIT-BIO</button>
            </div>
            <p>Email: {profile.email}</p>
            <p>Age: {profile.age}</p>
            <p>Board: {profile.board || 'Nil'}</p>
            <p>Class: {profile.userClass}</p>
            <p>Language: {profile.language}</p>
            <p>Phone: {profile.phone || 'Nil'}</p>
            <div className="biodetails">
              <label>
                Enter Your Info
              </label>
              <div>

              
              <input
                  type="text"
                 
                />
                </div>
            </div>
            <div className="availablesetings">
              <p><strong>Availability</strong></p>
              <select
                className="availability-dropdown"
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
              >
                <option>Flexible</option>
                <option>Weekdays - Mornings</option>
                <option>Weekdays - Evenings</option>
                <option>Weekends - All Day</option>
                {daysList.map((day, index) => (
                  <option key={index} value={day}>{day}</option>
                ))}
              </select>
            </div>

            <div className="chatonly">
              <label className="chat-toggle">
                <input
                  type="checkbox"
                  checked={chatOnly}
                  onChange={() => setChatOnly(!chatOnly)}
                />
                Chat-only Preference
              </label>
            </div>

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
                <option value="">subjects</option>
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
                <option value="">subjects</option>
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
