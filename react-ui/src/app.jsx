import React, { useState, useRef, useEffect, useContext } from 'react'
import { BrowserRouter as Router } from "react-router-dom";

//import 'react-datetime/css/react-datetime.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './react-datetime.css'
import './app.css'
import Datetime from 'react-datetime'
import moment from 'moment'
import Axios from "axios";
import * as BS from 'react-bootstrap'
import MeetingList from './meetingList'
import NewMeetingInterface from './newMeetingInterface'
import * as Icon from 'react-bootstrap-icons'
import NavBar from './navBar'
import HomeCalendar from './homeCalendar'

// GLOBAL KEY FOR LOCAL STORAGE
const LOCAL_STORAGE_KEY = 'vroom.meetings'

// EXPRESS SERVER
// const express = require('express')
// const server = express()


const App = () => {
    // STATE LISTENERS
    const [meetings, setMeetings] = useState([])
    const [currentDate, setCurrentDate] = useState(new moment())

    // CALENDAR REFERENCE
    const dateRef = useRef()

    // EFFECTS FOR LOCALSTORAGE READING, WRITING
    useEffect(() => {
        const storedMeetings = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        if (storedMeetings) setMeetings(storedMeetings)
    }, [])

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(meetings))
    }, [meetings])

    // REMOVES A CANCELED MEETING FROM LIST
    const handleCancel = (id) => {
        const newMeetings = [...meetings]
        setMeetings(newMeetings.filter(meeting => meeting.id !== id))
    }

    return (
        <div id='content'>
            <BS.Card>
                <NavBar />
                <BS.Card.Body>
                    <div id='main-container'>
                        <HomeCalendar meetings={meetings} setMeetings={(i) => setMeetings(i)} currentDate={currentDate} setCurrentDate={(i) => setCurrentDate(i)} />
                        <div style={{flexBasis: '65%'}}>
                            <MeetingList meetings={meetings} handleCancel={handleCancel} setMeetings={(i) => setMeetings(i)} currentDate={currentDate} />
                        </div>
                    </div>
                </BS.Card.Body>
            </BS.Card>
        </div>
    )
}

export default App
