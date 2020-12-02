import HomeCalendar from '../components/homeCalendar'
import MeetingList from '../components/meetingList'
import * as BS from 'react-bootstrap'
import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import moment from 'moment'
import NavBar from '../components/navBar'
import * as Icon from 'react-bootstrap-icons'

import { LOCAL_STORAGE_KEY } from '../config'
import {Api} from '../api/api'
import {Meeting} from '../models/meeting'
import UserCalendar from '../components/userCalendar'
import {useHistory} from 'react-router-dom'

// GLOBAL KEY FOR LOCAL STORAGE
const LOCAL_STORAGE_KEY_M = 'vroom.meetings'

const User = (props) => {

    const api = new Api()
    const params = useParams()
    const history = useHistory()

    const [loaded, setLoaded] = useState(false)
    const [meetings, setMeetings] = useState([])
    const [readMeetings, setReadMeetings] = useState([])
    const [currentDate, setCurrentDate] = useState(new moment())
    const [testMeetings, setTestMeetings] = useState([])
    const [currentUser, setCurrentUser] = useState()

    const handleCancel = (id) => {
        api.cancelMeeting(id).then((x) => updateMeetings())
    }

    // EFFECTS FOR LOCALSTORAGE READING, WRITING
    useEffect(() => {
        // api.getUserMeetings(localStorage.getItem(LOCAL_STORAGE_KEY)).then((x) => setReadMeetings(x))
        api.getUserMeetingsDetailed(params.userId).then((x) => setReadMeetings(x))
        api.getUser(params.userId).then(x => setCurrentUser(x))
        if (params.userId === localStorage.getItem(LOCAL_STORAGE_KEY))
            history.push('/')
    }, [])

    useEffect(() => {
        api.getUserMeetingsDetailed(params.userId).then((x) => setReadMeetings(x))
        api.getUser(params.userId).then(x => setCurrentUser(x))
        if (params.userId === localStorage.getItem(LOCAL_STORAGE_KEY))
            history.push('/')
    }, [params])

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
        api.getUserMeetingsDetailed(params.userId).then((x) => setReadMeetings(x))
    }

    return (
        <div id='content'>
            <BS.Card>
                <NavBar />
                <BS.Card.Body>
                    <div id='main-container'>
                        <div>
                            <BS.Toast className={'meeting-toast'}>
                                <BS.ToastHeader closeButton={false}>
                                    <Icon.PersonCircle/><strong>&nbsp;&nbsp;Schedule for {currentUser ? currentUser[0].firstName : ''}</strong>
                                </BS.ToastHeader>
                                <BS.ToastBody>
                                    <small><Icon.Envelope />&nbsp;&nbsp;{currentUser ? currentUser[0].email : ''}</small>
                                </BS.ToastBody>
                            </BS.Toast>
                            <UserCalendar
                                meetings={meetings}
                                setMeetings={(i) => setMeetings(i)}
                                // setReadMeetings={(i) => setReadMeetings(i)}
                                updateMeetings={updateMeetings}
                                currentDate={currentDate}
                                setCurrentDate={(i) => setCurrentDate(i)}
                            />
                        </div>
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

export default User