import React from 'react'

import * as BS from 'react-bootstrap'


const Participant = (props) => {

    // REMOVE PARTICIPANT HANDLER
    const handleRemove = () => {
        // FILTER PARTICIPANT OUT OF THE PARTICIPANTS LIST
        const filtered = props.meeting.participants.filter((participant) => {
            return participant.id !== props.participant.id
        })

        // UPDATE MEETING PARTICIPANTS AND MEETING STATE
        props.meeting.participants = filtered
        props.setMeetings(meetings => { return [...meetings] })
    }

    return(
        // DISPLAY PARTICIPANT WITH TOOLTIP
        <BS.OverlayTrigger
            trigger='hover'
            placement='bottom'
            overlay={
                <BS.Tooltip id={`tooltip-bottom`}>
                    Click to Remove
                </BS.Tooltip>
            }
        >
            {/* REMOVE PARTICIPANT ON CLICK */}
            <BS.Button as={BS.Badge} pill variant='secondary' onClick={handleRemove} className='participant-label'>
                {props.participant.name}
            </BS.Button>
        </BS.OverlayTrigger>
    )
}

export default Participant
