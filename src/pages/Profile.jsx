import { useAuthStore } from '../store/authStore.jsx';
import "../styles/Profile.css";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const logout = useAuthStore(state => state.logout);
  const token = useAuthStore(state => state.token);
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [img, setImg] = useState(null);

  const [avail, setAvail] = useState("Flexible");
  const [chat, setChat] = useState(false);

  const [selstr, setstr] = useState('');
  const [strong, setStrong] = useState([]);

  const [selweak, setSelweak] = useState('');
  const [weak, setWeak] = useState([]);

  const sub = [
    "Python Programming", "Mathematics", "Science",
    "Organic Chemistry", "History of Art", "JavaScript", "Physics",
    "Social Science", "Microeconomics", "UI/UX Design"
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const fetchProfile = async () => {
    if (!token) return;

    const res = await fetch('http://localhost:8000/api/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (data.success) {
      setUser(data.user);
      setStrong(data.user.strongSubjects);
      setWeak(data.user.weakSubjects);
      setAvail(data.user.availability);
      setChat(data.user.chatOnly);
    } else {
      console.error(data.message);
    }
  };

  const handleSave = async () => {
    const updatedData = {
      username: user.username,
      age: user.age,
      phone: user.phone,
      userClass: user.userClass,
      language: user.language,
      availability: avail,
      chatOnly: chat,
      strongSubjects: strong,
      weakSubjects: weak
    };

    try {
      const res = await fetch('http://localhost:8000/api/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      const data = await res.json();
      if (res.ok) {
        console.log("Profile updated:", data);
      } else {
        console.error("Failed to update:", data.message);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [token]);

  const backhome = () => {
    navigate('/');
  };

  const handleImg = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImg(e.target.files[0]);
    }
  };

  const handleAdd = () => {
      const ifexist = strong.includes(selstr);
    const isValid = selstr !== "";

    if (isValid && !ifexist) {
      setStrong(strong.concat(selstr));
      
    }
  };

  const handleRemove = () => {
    const ifexist = strong.includes(selstr);
    const isValid = selstr !== "";

    if (isValid && ifexist) {
      const temp = strong.filter(subject => subject !== selstr);
      setStrong(temp);
      
    }
  };

  const handleAddWeak = () => {
    
    const ifexist = weak.includes(selweak);
    const isValid = selweak !== "";

    if (isValid && !ifexist) {
          setWeak(weak.concat(selweak));
      
    }
  };

  const handleRemoveWeak = () => {
    const ifexist = weak.includes(selweak);
    const isValid = selweak !== "";
    if (isValid && ifexist) {
     const temp = weak.filter(subject => subject !== selweak);
      setWeak(temp);
    }
  }

  if (!user) return <div className='loading'>Loading profile...</div>;

  return (
    <div className="profilebody">
      <div className="top-bar">
        <h2 className="profilehead">Your Profile</h2>
        <button className="homebut" onClick={backhome}>HOME</button>
      </div>

      <div className="profile-container">
        <div className="image">
          <img
            src={img ? URL.createObjectURL(img) : "https://th.bing.com/th/id/OIP.CuSAMOgN8JsY-ofUsV-Z2wHaHa?w=201&h=201&c=7&r=0&o=7&pid=1.7&rm=3"}
            alt="Profile"
            className="profileimg"
          />

          <label htmlFor="imageUpload" className="imglab">Upload New Picture</label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleImg}
            className="imginp"
          />
        </div>

        <div className="mid">
          <div className='midbar'>
          <h3 className="name">{user.username}</h3>
          
          <button className="editbut" onClick={handleSave}>EDIT-BIO</button>
          </div>

          <div className="bio">
              <h4 className="biohead">BIO</h4>
            <p>Email: {user.email}</p>
            <p>Age: {user.age}</p>
            <p>Board: {user.board || 'Nil'}</p>
            <p>Class: {user.userClass}</p>
            <p>Language: {user.language}</p>
            <p>Phone: {user.phone || 'Nil'}</p>
            

            <div className="availablesetings">
              <p><strong>Availability</strong></p>
              <select
                className="availability-dropdown"
                value={avail}
                onChange={(e) => setAvail(e.target.value)}
              >
                <option>Flexible</option>
                <option>Weekdays - Mornings</option>
                <option>Weekdays - Evenings</option>
                <option>Weekends - All Day</option>
                {days.map((day, index) => (
                  <option key={index} value={day}>{day}</option>
                ))}
              </select>
            </div>

            <div className="chatonly">
              <label className="chat-toggle">
                <input
                  type="checkbox"
                  checked={chat}
                  onChange={() => setChat(!chat)}
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
              <button onClick={handleRemove} className="remsub">-</button>
            </div>
            <ul className="listofstrsub">
              {strong.map((subject, index) => (
                <p key={index}>{subject}</p>
              ))}
            </ul>
          </div>

          <div className="subjects">
            <p><strong>Weak Subjects</strong></p>
            <div className="subject-dropdown-group">
              <select
                value={selweak}
                onChange={(e) => setSelweak(e.target.value)}
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
              {weak.map((subject, index) => (
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