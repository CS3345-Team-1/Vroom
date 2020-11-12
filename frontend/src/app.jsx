import React, { useState, useRef, useEffect, useContext } from 'react'

import 'react-datetime/css/react-datetime.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './app.css'
import Datetime from 'react-datetime'
import moment from 'moment'
import * as BS from 'react-bootstrap'
import MeetingList from './meetingList'
import NewMeetingInterface from './newMeetingInterface'
import * as Icon from 'react-bootstrap-icons'
//import logo from '../public/vroom 1.png'

// GLOBAL KEY FOR LOCAL STORAGE
const LOCAL_STORAGE_KEY = 'vroom.meetings'


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

    const formatDay = (props, thisDate, selectedDate) => {
        const filtered = meetings.filter(meeting => {
            return meeting.date === thisDate.format('L')
        })

        if (validDates(thisDate)) return (
            <BS.OverlayTrigger
                trigger='hover'
                placement='top'
                overlay={
                    <BS.Tooltip id={'tooltip-top'}>
                        {filtered.length}
                    </BS.Tooltip>
                }
            >
                <td {...props}>
                    {thisDate.date()}
                </td>
            </BS.OverlayTrigger>
        )
        return <td {...props}>{thisDate.date()}</td>
    }

    // RETURNS DAYS ON WHICH MEETINGS ARE SCHEDULED
    const validDates = (current) => {
        const filtered = meetings.filter(meeting => {
            return meeting.date === current.format('L')
        })

        return filtered.length > 0
    }

    return (
        <div id='content'>
            <BS.Card>
                <BS.Navbar as={BS.Card.Header} bg='primary' variant='dark'>
                    <BS.Navbar.Brand href="#home">
                        <img
                            src='../public/vroom 1.PNG'
                            width="160"
                            height="50"
                            className="d-inline-block align-top"
                            alt=""
                        />
                    </BS.Navbar.Brand>
                    <BS.Navbar.Brand id='tagline' as='BS.Button' variant='outline' size='lg' className='ml-auto'>Zoom Meeting Scheduler</BS.Navbar.Brand>
                </BS.Navbar>
                <BS.Card.Body>
                    <div id='main-container'>
                        <BS.Toast id='calendar-toast'>
                            <BS.ToastBody id='calendar-toast-body'>
                                <Datetime ref={dateRef}
                                          input={false}
                                          timeFormat={false}
                                          isValidDate={validDates}
                                          initialValue={currentDate}
                                          onChange={date => setCurrentDate(date)}
                                          renderDay={formatDay}
                                />
                                <NewMeetingInterface setMeetings={(i) => setMeetings(i)} currentDate={currentDate} setCurrentDate={(i) => setCurrentDate(i)} mainCal={dateRef}/>
                            </BS.ToastBody>
                        </BS.Toast>
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
