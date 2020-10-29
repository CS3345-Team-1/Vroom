import React, { useState, useEffect } from 'react';

import 'react-datetime/css/react-datetime.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import MeetingList from './MeetingList';
import NewMeetingInterface from './NewMeetingInterface';

// GLOBAL KEY FOR LOCAL STORAGE
const LOCAL_STORAGE_KEY = 'vroom.meetings'

function App() {
    // STATE LISTENERS
    const [meetings, setMeetings] = useState([])

    // EFFECTS FOR LOCALSTORAGE READING, WRITING
    useEffect(() => {
        const storedMeetings = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        if (storedMeetings) setMeetings(storedMeetings)
    }, [])

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(meetings))
    }, [meetings])

    // REMOVES A CANCELED MEETING FROM LIST
    function handleCancel(id) {
        const newMeetings = [...meetings]
        setMeetings(newMeetings.filter(meeting => meeting.id !== id))
    }

    return (
    <>
        <h1>Upcoming Zoom Meetings</h1>
        <MeetingList meetings={meetings} handleCancel={handleCancel} setMeetings={(i) => setMeetings(i)} />
        <NewMeetingInterface setMeetings={(i) => setMeetings(i)} />

    </>
    );
}

export default App;
