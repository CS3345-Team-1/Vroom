import React, {useRef, useState} from 'react'

import * as BS from 'react-bootstrap'
import {Api} from '../api/api'
import {LOCAL_STORAGE_KEY} from '../config'
import {Link, useHistory} from 'react-router-dom'


const Participant = (props) => {
    const api = new Api()
    const history = useHistory()
    const [show, setShow] = useState(false)
    const target = useRef(null)

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
    const popover = (
        <BS.Popover id='popover-basic'>
            {/*<BS.Popover.Title as='h3'>Are you sure?</BS.Popover.Title>*/}
            <BS.Popover.Content>
                <BS.Button variant={'primary'} size={'sm'} href={`/user/${props.participant.userId}`} block>
                    View Schedule
                </BS.Button>
                <BS.Button variant={'danger'} size={'sm'} onClick={handleRemove} block>
                    Remove Participant
                </BS.Button>
            </BS.Popover.Content>
        </BS.Popover>
    )

    return (
        <>
        {
            props.participant.isHost ? (
                <BS.OverlayTrigger
                    trigger='hover'
                    placement='bottom'
                    overlay={
                        <BS.Tooltip id={`tooltip-bottom`}>
                            Meeting Host
                        </BS.Tooltip>
                    }
                >
                    <Link to={`/user/${props.participant.userId}`}>
                        <BS.Button as={BS.Badge} pill variant='outline-secondary' className='participant-label'>
                            {props.participant.first}
                        </BS.Button>
                    </Link>
                </BS.OverlayTrigger>
            ) : (
                props.meeting.participants.find(x => x.userId.toString() === localStorage.getItem(LOCAL_STORAGE_KEY)) && props.meeting.participants.find(x => x.userId.toString() === localStorage.getItem(LOCAL_STORAGE_KEY)).isHost ?
                    (
                        // <BS.OverlayTrigger
                        //     trigger='hover'
                        //     placement='bottom'
                        //     overlay={
                        //         <BS.Tooltip id={`tooltip-bottom`}>
                        //             Click to Remove
                        //         </BS.Tooltip>
                        //     }
                        // >
                        //     {/* REMOVE PARTICIPANT ON CLICK */}
                        //     <BS.Button as={BS.Badge} pill variant='secondary' onClick={handleRemove} className='participant-label'>
                        //         {props.participant.first}
                        //     </BS.Button>
                        // </BS.OverlayTrigger>

                        <BS.OverlayTrigger trigger='focus' placement='left' overlay={popover}>
                            <BS.Button ref={target} variant='secondary' className='participant-label badge badge-secondary badge-pill shadow-none'>
                                {props.participant.first}
                            </BS.Button>
                        </BS.OverlayTrigger>
                    ) : (
                        <Link to={`/user/${props.participant.userId}`}>
                            <BS.Button as={BS.Badge} pill variant='secondary' className='participant-label'>
                                {props.participant.first}
                            </BS.Button>
                        </Link>
                    )
                )

                // <BS.OverlayTrigger
                //     trigger='hover'
                //     placement='bottom'
                //     overlay={
                //         <BS.Tooltip id={`tooltip-bottom`}>
                //             Click to Remove
                //         </BS.Tooltip>
                //     }
                // >
                //     {/* REMOVE PARTICIPANT ON CLICK */}
                //     <BS.Button as={BS.Badge} pill variant='secondary' onClick={handleRemove} className='participant-label'>
                //         {props.participant.first}
                //     </BS.Button>
                // </BS.OverlayTrigger>
            // )
        }
    </>
    )
}

export default Participant
