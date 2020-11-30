import HomeCalendar from '../components/homeCalendar'
import MeetingList from '../components/meetingList'
import * as BS from 'react-bootstrap'
import React, {useEffect, useState} from 'react'
import moment from 'moment'
import NavBar from '../components/navBar'

// GLOBAL KEY FOR LOCAL STORAGE
const LOCAL_STORAGE_KEY_M = 'vroom.meetings'

const Home = (props) => {

    const [meetings, setMeetings] = useState([])
    const [currentDate, setCurrentDate] = useState(new moment())

    const handleCancel = (id) => {
        const newMeetings = [...meetings]
        setMeetings(newMeetings.filter(meeting => meeting.id !== id))
    }

    // EFFECTS FOR LOCALSTORAGE READING, WRITING
    useEffect(() => {
        const storedMeetings = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_M))
        if (storedMeetings) setMeetings(storedMeetings)
    }, [])

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY_M, JSON.stringify(meetings))
    }, [meetings])

    return (
        <div id='content'>
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