import React, { useState, useEffect, useContext, useRef } from 'react'

import * as BS from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'
import ICalendarLink from 'react-icalendar-link'
import moment from 'moment'
import MeetingNotesInterface from './meetingNotesInterface'
import Participant from './participant'
import ParticipantInterface from './participantInterface'
import MeetingIDInterface from './meetingIDInterface'
import EditPasscodeInterface from './passcodeInterface'


const Group = (props) => {

    // CONTEXT-AWARE TOGGLE
    const Toggle = ({ eventKey, callback }) => {
        const currentEventKey = useContext(BS.AccordionContext)
        const decoratedOnClick = BS.useAccordionToggle(
            eventKey,
            () => callback && callback(eventKey),
        )
        const isCurrentEventKey = currentEventKey === eventKey
        const arrow = isCurrentEventKey ? <Icon.ArrowUpCircle /> : <Icon.ArrowDownCircle />
        return(
            <>
                <span onClick={decoratedOnClick}>
                    <BS.Button variant={'link'} className={'shadow-none'}>
                        {arrow}
                    </BS.Button>
                    <strong>{props.group.name}</strong>
                </span>
            </>
        )
    }

    return(
        <>
            {/* BEGIN GROUP DISPLAY AS BOOTSTRAP ACCORDION */}
            <BS.Accordion as={BS.Toast} className='meeting-toast'>
                {/* MEETING HEADER WITH CONTEXT BUTTONS */}
                <BS.Toast.Header closeButton={false}>
                    <span className={'mr-auto'}>
                        <Toggle eventKey={props.group.id} />
                    </span>
                    <BS.Badge variant={'secondary'} className={'ml-auto'}>{props.group.members.length} Group Members</BS.Badge>
                </BS.Toast.Header>

                {/* BEGIN MEETING BODY */}
                <BS.Accordion.Collapse eventKey={props.group.id}>
                    <BS.Toast.Body style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                        <div className='meeting-card-line'>
                            <span className='meeting-text'>Participants: </span>
                            {props.group.members.map(member => {
                                return <BS.Badge variant={'secondary'} pill>{member}</BS.Badge>
                            })}
                        </div>
                    </BS.Toast.Body>
                </BS.Accordion.Collapse>
            </BS.Accordion>
        </>
    )
}

export default Group
