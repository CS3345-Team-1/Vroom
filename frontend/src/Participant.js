import React from 'react';

import * as BS from 'react-bootstrap';


export default function Participant(props) {

    // REMOVE PARTICIPANT HANDLER
    function handleRemove() {
        // FILTER PARTICIPANT OUT OF THE PARTICIPANTS LIST
        const filtered = props.meeting.participants.filter(function(participant) {
            return participant.id !== props.participant.id
        })

        // UPDATE MEETING PARTICIPANTS AND MEETING STATE
        props.meeting.participants = filtered
        props.setMeetings(meetings => { return [...meetings] })
    }

    return(
        // DISPLAY PARTICIPANT WITH TOOLTIP
        <BS.OverlayTrigger
            trigger="hover"
            placement="bottom"
            overlay={
                <BS.Tooltip id={`tooltip-bottom`}>
                    Click to Remove
                </BS.Tooltip>
            }
        >
            {/* REMOVE PARTICIPANT ON CLICK */}
            <BS.Button as={BS.Badge} pill variant="secondary" onClick={handleRemove}>
                {props.participant.name}
            </BS.Button>
        </BS.OverlayTrigger>
    )
}