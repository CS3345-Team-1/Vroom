import axios from 'axios'

import { AXIOS_BASE_URL } from '../config'

export class Api {

    url = AXIOS_BASE_URL

    config = {}

    getUsers(params) {
        return new Promise((resolve, reject) => {
            if (params) {
                let config = this.config
                config.params = params
            }
            axios.get(`${this.url}/getallusers`, this.config)
                .then(x => resolve(x.data))
                .catch(e => {
                    alert(e)
                    reject()
                })
        })
    }

    getUser(id) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/userbyid/${id}`, this.config)
                .then(x => resolve(x.data))
                .catch(e => {
                    alert(e)
                    reject()
                })
        })
    }

    getUserByEmail(id) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/userbyemail/${id}`, this.config)
                .then(x => resolve(x.data))
                .catch(e => {
                    alert(e)
                    reject()
                })
        })
    }

    authenticate(email, password) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/login`, { params: {email: email, password: password}})
                .then(x => resolve(x.data))
                .catch(e => {
                    alert(e)
                    reject()
                })
        })
    }

    register(userID, email, password, firstName, lastName) {
        return new Promise((resolve, reject) => {
            console.log(userID + '\n' + email + '\n' + password + '\n' + firstName + '\n' + lastName)
            axios.post(`${this.url}/postuserbody`, {userID: userID, firstName: firstName, lastName: lastName, email: email, password: password})
                .then(x => resolve(x.data))
                .catch(e => {
                alert(e)
                reject()
            })
        })
    }

    getUserMeetings(userID) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/userMeetings/${userID}`, this.config)
                .then(x => resolve(x.data))
                .catch(e => {
                    alert(e)
                    reject()
                })
        })
    }

    getUserMeetingsDetailed(userID) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/getCompleteMeetings/${userID}`, this.config)
                .then(x => resolve(x.data))
                .catch(e => {
                    alert(e)
                    reject()
                })
        })
    }

    createMeeting(title, date, startTime, endTime, isOpen, maxParticipants, id, passcode, isOnline) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/postmeetingbody`, {meetingName: title, isOnline: isOnline, date: date, startTime: startTime, endTime: endTime, zoomCode: id, zoomPassword: passcode, isOpen: isOpen, maxParticipants: maxParticipants, isCancelled: false})
                .then(x => resolve(x.data))
                .catch(e => {
                    alert(e)
                    reject()
                })
        })
    }

    cancelMeeting(meetingId) {
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/cancelmeeting/${meetingId}`, this.config)
                .then(x => resolve(x.data))
                .catch(e => {
                    alert(e)
                    reject()
                })
        })
    }

    changeZoomId(meetingId, newZoomId) {
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/changeid/${meetingId}`, {zoomCode: newZoomId})
                .then(x => resolve(x.data))
                .catch(e => {
                    alert(e)
                    reject()
                })
        })
    }

    changePasscode(meetingId, newPasscode) {
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/changepasscode/${meetingId}`, {zoomPassword: newPasscode})
                .then(x => resolve(x.data))
                .catch(e => {
                    alert(e)
                    reject()
                })
        })
    }

    addHost(meetingId, userId) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/joinMeeting`, {meetingId: meetingId, userId: userId, isHost: true})
                .then(x => resolve(x.data))
                .catch(e => {
                    alert(e)
                    reject()
                })
        })
    }

    addMember(meetingId, userId){
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/joinMeeting`, {meetingId: meetingId, userId: userId, isHost: false})
                .then(x => resolve(x.data))
                .catch(e => {
                    alert(e)
                    reject()
                })
        })
    }

    removeMember(participantId){
        return new Promise((resolve, reject) => {
            axios.delete(`${this.url}/deletemeetingmember/${participantId}`, this.config)
                .then(x => resolve(x.data))
                .catch(e => {
                    alert(e)
                    reject()
                })
        })
    }

    addGroupMember(memberId, groupId, userId){
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/addGroupMember`, {memberId: memberId, groupId: groupId, userId: userId})
            .then(x => resolve(x.data))
            .catch(e => {
                alert(e)
                reject()
            })
        })
    }

    deleteGroupMember(memberId, groupId, userId){
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/deleteGroupMember`, {memberId: memberId, groupId: groupId, userId: userId})
            .then(x => resolve(x.data))
            .catch(e => {
                alert(e)
                reject()
            })
        })
    }

    getGroupMembers(groupId){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/groupMembers/${groupId}`, this.config)
                .then(x => resolve(x.data))
                .catch(e => {
                    alert(e)
                    reject()
                })
        })
    }

    addGroup(groupId, ownerId, groupName){
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/postgroupbody`, {groupId: groupId, ownerId: ownerId, groupName: groupName})
            .then(x => resolve(x.data))
            .catch(e => {
                alert(e)
                reject()
            })
        })
    }

    deleteGroup(groupId){
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/deleteGroup/${groupId}`, this.config)
            .then(x => resolve(x.data))
            .catch(e => {
                alert(e)
                reject()
            })
        })
    }

    renameGroup(groupId, newName){
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/putgroupname`, {groupId: groupId, newName: newName })
            .then(x => resolve(x.data))
            .catch(e => {
                alert(e)
                reject()
            })
        })
    }
    
    getComments(meetingId){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/meetingMessage/${meetingId}`, this.config)
                .then(x => resolve(x.data))
                .catch(e => {
                    alert(e)
                    reject()
                })
        })
    }

    addComment(meetingId, authorId, timestamp, comment){
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/postcomment`, {meetingID: meetingId, authorID: authorId, timestamp: timestamp, comment: comment})
            .then(x => resolve(x.data))
            .catch(e => {
                alert(e)
                reject()
            })
        })
    }
    
}