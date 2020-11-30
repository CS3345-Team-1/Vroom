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
import { Api } from './api/api'
import { LOCAL_STORAGE_KEY } from './config'

// GLOBAL KEY FOR LOCAL STORAGE
const LOCAL_STORAGE_KEY_M = 'vroom.meetings'
const LOCAL_STORAGE_KEY_G = 'vroom.groups'

// EXPRESS SERVER
// const express = require('express')
// const server = express()


const App = () => {

    return (
        <Router>
            <Switch>
                {
                    ROUTES.map(
                        (route, index) => <Route key={ index } { ...route } />
                    )
                }
            </Switch>
        </Router>
    )
}

export default App
