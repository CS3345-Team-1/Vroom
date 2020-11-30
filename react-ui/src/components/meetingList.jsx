import React from 'react'

import * as BS from 'react-bootstrap'
import Meeting from './meeting'


const MeetingList = (props) => {
    const filtered = props.meetings.filter(meeting => { return meeting.date === props.currentDate.format('L') })
    const title = 'Meetings for ' + props.currentDate.format('dddd, MMMM Do')

    return(
        <div>
            <h4 id='meeting-list-header'>{title}</h4>
            {
                filtered.length > 0 ?
                    // CREATE MEETING COMPONENT FOR EACH SCHEDULED MEETING
                    filtered.map(meeting => {
                        return <Meeting key={meeting.id} handleCancel={props.handleCancel} meeting={meeting} setMeetings={(i) => props.setMeetings(i)} />
                    })
                    :
                        <BS.Toast className='meeting-toast'>
                            <BS.Toast.Body>No meetings today. Click <strong>New Meeting</strong> to get started.</BS.Toast.Body>
                        </BS.Toast>
            }
        </div>
    )
}

export default MeetingList
