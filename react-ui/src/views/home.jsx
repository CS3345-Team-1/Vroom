import HomeCalendar from '../components/homeCalendar'
import MeetingList from '../components/meetingList'
import * as BS from 'react-bootstrap'
import React, {useEffect, useState} from 'react'
import moment from 'moment'
import NavBar from '../components/navBar'

import { LOCAL_STORAGE_KEY } from '../config'
import {Api} from '../api/api'
import {Meeting} from '../models/meeting'

// GLOBAL KEY FOR LOCAL STORAGE
const LOCAL_STORAGE_KEY_M = 'vroom.meetings'

const Home = (props) => {

    const api = new Api()

    const [loaded, setLoaded] = useState(false)
    const [meetings, setMeetings] = useState([])
    const [readMeetings, setReadMeetings] = useState([])
    const [currentDate, setCurrentDate] = useState(new moment())
    const [testMeetings, setTestMeetings] = useState([])

    const handleCancel = (id) => {
        const newMeetings = [...meetings]
        setMeetings(newMeetings.filter(meeting => meeting.id !== id))
    }

    // EFFECTS FOR LOCALSTORAGE READING, WRITING
    useEffect(() => {
        api.getUserMeetings(localStorage.getItem(LOCAL_STORAGE_KEY)).then((x) => setReadMeetings(x))
    }, [])

    useEffect(() => {
        setLoaded(true)
    }, [meetings])

    useEffect(() => {
        let parseMeetings = []
        readMeetings.map((m) => parseMeetings.push(new Meeting().parse(m)))
        setMeetings(parseMeetings)
    }, [readMeetings])

    if (!loaded && !meetings) return <></>

    return (
        <div id='content'>
            {console.log(meetings)}
            <BS.Card>
                <NavBar />
                <BS.Card.Body>
                    <div id='main-container'>
                        <HomeCalendar
                            meetings={meetings}
                            setMeetings={(i) => setMeetings(i)}
                            currentDate={currentDate}
                            setCurrentDate={(i) => setCurrentDate(i)}
                        />
                        <div style={{flexBasis: '65%'}}>
                            <MeetingList
                                meetings={meetings}
                                handleCancel={handleCancel}
                                setMeetings={(i) => setMeetings(i)}
                                currentDate={currentDate}
                            />
                        </div>
                    </div>
                </BS.Card.Body>
            </BS.Card>
        </div>
    )
}

export default Home