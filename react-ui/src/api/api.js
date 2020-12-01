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

    addGroup(groupId, ownerId, groupName){
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/addGroup`, {groupId: groupId, ownerId: ownerId, groupName: groupName})
            .then(x => resolve(x.data))
            .catch(e => {
                alert(e)
                reject()
            })
        })
    }

    deleteGroup(groupId, ownerId){
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/deleteGroup`, {groupId: groupId, ownerId: ownerId})
            .then(x => resolve(x.data))
            .catch(e => {
                alert(e)
                reject()
            })
        })
    }

    renameGroup(groupId, ownerId){
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/renameGroup`, {groupId: groupId, ownerId: ownerId})
            .then(x => resolve(x.data))
            .catch(e => {
                alert(e)
                reject()
            })
        })
    }
    // add group member - add group
    // delete group member - delete group
    // rename group
    // comments routes for table -- add
}