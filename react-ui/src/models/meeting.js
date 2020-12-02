import {Comment} from './comment'
import {DEPLOYED} from '../config'

export class Meeting {
    createOnline(id, title, date, startTime, endTime, meetingID, passcode, isOpen, maxParticipants) {
        this.isOnline = true
        this.id = id
        this.title = title
        this.date = date
        this.startTime = startTime
        this.endTime = endTime
        this.meetingID = meetingID
        this.passcode = passcode
        this.isOpen = isOpen
        this.maxParticipants = maxParticipants
        this.participants = []
        this.notes = []
    }

    createInPerson(id, title, date, startTime, endTime, location, isOpen, maxParticipants) {
        this.isOnline = false
        this.id = id
        this.title = title
        this.date = date
        this.startTime = startTime
        this.endTime = endTime
        this.location = location
        this.isOpen = isOpen
        this.maxParticipants = maxParticipants
        this.participants = []
        this.notes = []
    }

    parse = (db) => {
        this.isOnline = db.isOnline
        this.date = new Date(db.startTime).toLocaleDateString()
        this.startTime = new Date(db.startTime).toLocaleTimeString()
        this.endTime = new Date(db.endTime).toLocaleTimeString()
        this.id = db.id
        this.title = db.title
        this.isOpen = db.isOpen
        this.maxParticipants = db.maxParticipants
        this.meetingID = db.meetingId
        this.isCancelled = db.isCancelled
        this.isHost = db.isHost
        this.passcode = db.passcode
        this.participants = []
        this.notes = []
        return this
    }

    parseDetail = (db) => {
        this.isOnline = db.isOnline
        this.date = DEPLOYED ? new Date(db.date.slice(0,-1)).toLocaleDateString() :new Date(db.date).toLocaleDateString()
        this.startTime = DEPLOYED ? new Date(db.startTime.slice(0,-1)).toLocaleTimeString("en-US",{hour: 'numeric', minute: 'numeric'}) : new Date(db.startTime).toLocaleTimeString("en-US",{hour: 'numeric', minute: 'numeric'})
        this.endTime = DEPLOYED ? new Date(db.endTime.slice(0,-1)).toLocaleTimeString("en-US",{hour: 'numeric', minute: 'numeric'}) : new Date(db.endTime).toLocaleTimeString("en-US",{hour: 'numeric', minute: 'numeric'})
        this.id = db.meetingID
        this.title = db.meetingName
        this.isOpen = db.isOpen
        this.maxParticipants = db.maxParticipants
        this.meetingID = db.zoomCode
        this.isCancelled = db.isCancelled
        this.passcode = db.zoomPassword
        if (db.participants)
            this.participants = JSON.parse(db.participants)
        else
            this.participants = []
        if (db.comments) {
            this.notes = JSON.parse(db.comments)
            this.notes.map(comment => comment.time = new Date(comment.time).toLocaleString("en-US",{weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'}))
        }
        else
            this.notes = []
        if (this.maxParticipants === 0)
            this.isFull = false
        else if (this.participants.length <= this.maxParticipants)
            this.isFull = false
        else
            this.isFull = true
        return this
    }


    parseComments = (db) => {
        db.map(comment => this.notes.push(new Comment().parse(comment)))
    }
}