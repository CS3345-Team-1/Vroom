import React from 'react';

import Meeting from './Meeting';


export default function MeetingList(props) {
    return(
        <div>
            {
                // CREATE MEETING COMPONENT FOR EACH SCHEDULED MEETING
                props.meetings.map(meeting => {
                    return <Meeting key={meeting.id} handleCancel={props.handleCancel} meeting={meeting} setMeetings={(i) => props.setMeetings(i)} />
                })
            }
        </div>
    )
}