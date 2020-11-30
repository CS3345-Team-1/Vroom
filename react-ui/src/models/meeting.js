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
}