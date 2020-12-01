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
        api.cancelMeeting(id).then((x) => updateMeetings())
    }

    // EFFECTS FOR LOCALSTORAGE READING, WRITING
    useEffect(() => {
        // api.getUserMeetings(localStorage.getItem(LOCAL_STORAGE_KEY)).then((x) => setReadMeetings(x))
        api.getUserMeetingsDetailed(localStorage.getItem(LOCAL_STORAGE_KEY)).then((x) => setReadMeetings(x))
    }, [])

    useEffect(() => {
        let parseMeetings = []
        // readMeetings.map((m) => parseMeetings.push(new Meeting().parse(m)))
        readMeetings.map(m => parseMeetings.push(new Meeting().parseDetail(m)))
        // parseMeetings.map((m) => api.getComments(m.id).then(x => m.parseComments(x)))
        setMeetings(parseMeetings)
    }, [readMeetings])

    useEffect(() => {
        setLoaded(true)
    }, [meetings])


    const updateMeetings = () => {
        // api.getUserMeetings(localStorage.getItem(LOCAL_STORAGE_KEY)).then((x) => setReadMeetings(x))
        api.getUserMeetingsDetailed(localStorage.getItem(LOCAL_STORAGE_KEY)).then((x) => setReadMeetings(x))
    }

    const [thing, setThing] = useState()

    useEffect(() => {
        if(thing) {
            thing.map(obj => {
                if (obj.participants)
                    obj.participants = JSON.parse(obj.participants)
                else
                    obj.participants = []
                if (obj.comments)
                    obj.comments = JSON.parse(obj.comments)
                else
                    obj.comments = []
            })
            console.log(thing)
        }
    }, [thing])

    const theThing = () => {
        api.getUserMeetingsDetailed(localStorage.getItem(LOCAL_STORAGE_KEY)).then(x => setThing(x))
    }

    if (!loaded) return <></>

    return (
        <div id='content'>
            <BS.Button onClick={theThing}>Do the thing!</BS.Button>
            <BS.Card>
                <NavBar />
                <BS.Card.Body>
                    <div id='main-container'>
                        <HomeCalendar
                            meetings={meetings}
                            setMeetings={(i) => setMeetings(i)}
                            // setReadMeetings={(i) => setReadMeetings(i)}
                            updateMeetings={updateMeetings}
                            currentDate={currentDate}
                            setCurrentDate={(i) => setCurrentDate(i)}
                        />
                        <div style={{flexBasis: '65%'}}>
                            <MeetingList
                                updateMeetings={updateMeetings}
                                setReadMeetings={(i) => setReadMeetings(i)}
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