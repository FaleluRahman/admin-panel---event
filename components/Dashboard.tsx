"use client";

import React, { useState } from 'react';

const Dashboard: React.FC = () => {
    const [activePage, setActivePage] = useState('events');

    const renderPage = () => {
        switch (activePage) {
            case 'events':
                return <EventsPage />;
            case 'news':
                return <NewsPage />;
            case 'schedule':
                return <SchedulePage />;
            default:
                return <EventsPage />;
        }
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
            <nav style={{ marginBottom: '20px' }}>
                <button 
                    onClick={() => setActivePage('events')} 
                    style={{ 
                        backgroundColor: activePage === 'events' ? '#4CAF50' : '#f1f1f1', 
                        color: activePage === 'events' ? 'white' : 'black', 
                        padding: '10px 20px', 
                        margin: '0 5px', 
                        border: 'none', 
                        cursor: 'pointer' 
                    }}
                >
                    Events
                </button>
                <button 
                    onClick={() => setActivePage('news')} 
                    style={{ 
                        backgroundColor: activePage === 'news' ? '#2196F3' : '#f1f1f1', 
                        color: activePage === 'news' ? 'white' : 'black', 
                        padding: '10px 20px', 
                        margin: '0 5px', 
                        border: 'none', 
                        cursor: 'pointer' 
                    }}
                >
                    News
                </button>
                <button 
                    onClick={() => setActivePage('schedule')} 
                    style={{ 
                        backgroundColor: activePage === 'schedule' ? '#FF5722' : '#f1f1f1', 
                        color: activePage === 'schedule' ? 'white' : 'black', 
                        padding: '10px 20px', 
                        margin: '0 5px', 
                        border: 'none', 
                        cursor: 'pointer' 
                    }}
                >
                    Schedule
                </button>
            </nav>
            <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px' }}>
                {renderPage()}
            </div>
        </div>
    );
};

const EventsPage: React.FC = () => (
    <div>
        <h1 style={{ color: '#4CAF50' }}>Events Page</h1>
        <p>List of events...</p>
    </div>
);

const NewsPage: React.FC = () => (
    <div>
        <h1 style={{ color: '#2196F3' }}>News Page</h1>
        <p>Latest news...</p>
    </div>
);

const SchedulePage: React.FC = () => (
    <div>
        <h1 style={{ color: '#FF5722' }}>Schedule Page</h1>
        <p>Schedule details...</p>
    </div>
);

export default Dashboard;