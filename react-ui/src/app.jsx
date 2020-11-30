import React, { useState, useRef, useEffect, useContext } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//import 'react-datetime/css/react-datetime.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './react-datetime.css'
import './app.css'
import Datetime from 'react-datetime'
import moment from 'moment'
import Axios from "axios";
import * as BS from 'react-bootstrap'
import MeetingList from './components/meetingList'
import NewMeetingInterface from './components/newMeetingInterface'
import * as Icon from 'react-bootstrap-icons'
import NavBar from './components/navBar'
import HomeCalendar from './components/homeCalendar'
import Home from './views/home'
import Groups from './views/groups'
import { ROUTES } from './routes'
import {User} from './models/user'
import {Meeting} from './models/meeting'

// GLOBAL KEY FOR LOCAL STORAGE
const LOCAL_STORAGE_KEY_M = 'vroom.meetings'
const LOCAL_STORAGE_KEY_G = 'vroom.groups'

// EXPRESS SERVER
// const express = require('express')
// const server = express()


const App = () => {
    // STATE LISTENERS
    // const [meetings, setMeetings] = useState([])
    // const [groups, setGroups] = useState([{
    //     id: 1000000,
    //     name: "My Awesome Group",
    //     members: ["bob", "dave", "steve"]
    // }])
    // const [currentDate, setCurrentDate] = useState(new moment())


    // // EFFECTS FOR LOCALSTORAGE READING, WRITING
    // useEffect(() => {
    //     const storedMeetings = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_M))
    //     if (storedMeetings) setMeetings(storedMeetings)
    // }, [])
    //
    // useEffect(() => {
    //     const storedGroups = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_G))
    //     if (storedGroups) setGroups(storedGroups)
    // }, [])
    //
    // useEffect(() => {
    //     localStorage.setItem(LOCAL_STORAGE_KEY_M, JSON.stringify(meetings))
    // }, [meetings])
    //
    // useEffect(() => {
    //     localStorage.setItem(LOCAL_STORAGE_KEY_G, JSON.stringify(groups))
    // }, [groups])

    // // REMOVES A CANCELED MEETING FROM LIST
    // const handleCancel = (id) => {
    //     const newMeetings = [...meetings]
    //     setMeetings(newMeetings.filter(meeting => meeting.id !== id))
    // }
    //
    // // REMOVES A DELETED GROUP FROM LIST
    // const handleDelete = (id) => {
    //     const newGroups = [...groups]
    //     setMeetings(newGroups.filter(group => group.id !== id))
    // }

    return (
        <div id='content'>
            <BS.Card>
                {/*<NavBar />*/}

                <Router>
                    <NavBar />
                    <Switch>
                        {
                            ROUTES.map(
                                (route, index) => <Route key={ index } { ...route } />
                            )
                        }
                    </Switch>
                </Router>

                {/*<Router>*/}
                {/*    <Switch>*/}
                {/*        <Route path='/home'>*/}
                {/*            <Home*/}
                {/*                meetings={meetings}*/}
                {/*                setMeetings={(i) => setMeetings(i)}*/}
                {/*                currentDate={currentDate}*/}
                {/*                setCurrentDate={(i) => setCurrentDate(i)}*/}
                {/*                handleCancel={handleCancel}*/}
                {/*            />*/}
                {/*        </Route>*/}
                {/*        <Route path='/groups'>*/}
                {/*            <Groups*/}
                {/*                groups={groups}*/}
                {/*                setGroups={(i) => setGroups(i)}*/}
                {/*                handleDelete={handleDelete}*/}
                {/*            />*/}
                {/*        </Route>*/}
                {/*    </Switch>*/}
                {/*</Router>*/}
            </BS.Card>
        </div>
    )
}

export default App
