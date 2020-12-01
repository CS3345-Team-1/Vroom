import React from 'react'

import * as BS from 'react-bootstrap'
import {Api} from '../api/api'


const Participant = (props) => {
    const api = new Api()

    // REMOVE PARTICIPANT HANDLER
    const handleRemove = () => {
        // // FILTER PARTICIPANT OUT OF THE PARTICIPANTS LIST
        // const filtered = props.meeting.participants.filter((participant) => {
        //     return participant.id !== props.participant.id
        // })
        //
        // // UPDATE MEETING PARTICIPANTS AND MEETING STATE
        // props.meeting.participants = filtered
        // props.setMeetings(meetings => { return [...meetings] })
        api.removeMember(props.participant.id).then(props.updateMeetings)
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
                {props.participant.first}
            </BS.Button>
        </BS.OverlayTrigger>
    )
}

export default Participant
