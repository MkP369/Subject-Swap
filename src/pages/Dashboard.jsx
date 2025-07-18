import React from 'react';
import '../styles/Dashboard.css';



const subjects = [
    "Python Programming", "Mathematics", "Science",
    "Organic Chemistry", "History of Art", "JavaScript", "Physics",
    "Social Science", "Microeconomics", "UI/UX Design"
];

export default function Dashboard() {
    return (
        <div className="dashboard-container">
            <h1>Master your Subjects!</h1>
            <p className="dashboard-subtitle">Find your perfect learning partner.</p>
            <div className="search-swap-container">
                <div className="input-wrapper">
                    <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
                    </svg>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search for a subject to swap..."
                    />
                </div>
                <div className="subject-list">
                    {subjects.map((subject, index) => (
                        <div key={index} className="subject-item">
                            {subject}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}