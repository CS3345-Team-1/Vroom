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
import {LOCAL_STORAGE_KEY} from '../config'
import {Api} from '../api/api'
import MeetingLocationInterface from './meetingLocationInterface'


const Meeting = (props) => {
    const api = new Api()

    // STATE LISTENERS
    const [participants, setParticipants] = useState([])
    const [notes, setNotes] = useState([])

    // REFRESH EFFECTS UPON STATE CHANGE
    useEffect(() => {
        const currentParticipants = props.meeting.participants
        setParticipants(currentParticipants)
    }, [props.meeting])

    useEffect(() => {
        const currentNotes = props.meeting.notes
        setNotes(currentNotes)
    }, [props.meeting.notes])

    // MEETING CANCELLATION HANDLER
    const handleCancelClick = () => {
        props.handleCancel(props.meeting.id)
    }

    const handleLeaveClick = () => {
        api.removeMember(props.meeting.participants.find(x => x.userId.toString() === localStorage.getItem(LOCAL_STORAGE_KEY)).id).then(x => props.updateMeetings())
    }

    // CALENDAR EXPORT BUTTON
    const ExportToCalendar = () => {
        const startTime = moment(props.meeting.date + ' ' + props.meeting.startTime).format('YYYY-MM-DDTHH:mm:ssZ')
        const endTime = moment(props.meeting.date + ' ' + props.meeting.endTime).format('YYYY-MM-DDTHH:mm:ssZ')
        const idStripped = props.meeting.meetingID.replace(/\s/g,'')
        const url = 'https://zoom.us/j/' + idStripped + '/'

        const event = {
            title: props.meeting.title,
            description: url,
            location: 'Zoom Meeting ' + props.meeting.meetingID,
            startTime: startTime,
            endTime: endTime
        }

        return(
            <ICalendarLink event={event}>
                <BS.OverlayTrigger
                    trigger='hover'
                    placement='top'
                    overlay={
                        <BS.Tooltip id={`tooltip-top`}>
                            Export to Calendar
                        </BS.Tooltip>
                    }
                >
                    <BS.Button variant={'link'} className={'shadow-none'}>
                        <Icon.CalendarPlus />
                    </BS.Button>
                </BS.OverlayTrigger>
            </ICalendarLink>
        )
    }

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
                    <strong>{props.meeting.title}</strong> at {props.meeting.startTime} until {props.meeting.endTime}
                </span>
            </>
        )
    }

    // CANCELLATION BUTTON AND CONFIRMATION PROMPT
    const CancelButton = () => {
        const [show, setShow] = useState(false)
        const target = useRef(null)

        const popover = (
            <BS.Popover id='popover-basic'>
                <BS.Popover.Title as='h3'>Are you sure?</BS.Popover.Title>
                <BS.Popover.Content>
                    <BS.Button variant={'danger'} size={'sm'} onClick={handleCancelClick} block>
                        Yes, cancel.
                    </BS.Button>
                    <BS.Button variant={'secondary'} size={'sm'} block>
                        Wait, nevermind.
                    </BS.Button>
                </BS.Popover.Content>
            </BS.Popover>
        )

        return(
            <BS.OverlayTrigger trigger='focus' placement='left' overlay={popover}>
                <BS.Button ref={target} variant='danger' size='sm'>Cancel Meeting</BS.Button>
            </BS.OverlayTrigger>
        )
    }

    // CANCELLATION BUTTON AND CONFIRMATION PROMPT
    const LeaveButton = () => {
        const [show, setShow] = useState(false)
        const target = useRef(null)

        const popover = (
            <BS.Popover id='popover-basic'>
                <BS.Popover.Title as='h3'>Are you sure?</BS.Popover.Title>
                <BS.Popover.Content>
                    <BS.Button variant={'danger'} size={'sm'} onClick={handleLeaveClick} block>
                        Yes, remove me.
                    </BS.Button>
                    <BS.Button variant={'secondary'} size={'sm'} block>
                        Wait, nevermind.
                    </BS.Button>
                </BS.Popover.Content>
            </BS.Popover>
        )

        return(
            <BS.OverlayTrigger trigger='focus' placement='left' overlay={popover}>
                <BS.Button ref={target} variant='warning' size='sm'>Leave Meeting</BS.Button>
            </BS.OverlayTrigger>
        )
    }

    const joinMeeting = () => {
        api.addMember(props.meeting.id, localStorage.getItem(LOCAL_STORAGE_KEY)).then(props.updateMeetings)
    }


    if (!props.meeting.participants.find(x => x.userId.toString() === localStorage.getItem(LOCAL_STORAGE_KEY)))
        return (
            <>
                {/* BEGIN MEETING DISPLAY AS BOOTSTRAP ACCORDION */}
                <BS.Accordion as={BS.Toast} className='meeting-toast'>
                    {/* MEETING HEADER WITH CONTEXT BUTTONS */}
                    <BS.Toast.Header closeButton={false}>
                        <small>
                            {
                                props.meeting.isOpen ?
                                    <BS.Button
                                        variant={'link'}
                                        className={'shadow-none'}
                                    >
                                        <BS.OverlayTrigger
                                            trigger='hover'
                                            placement='left'
                                            overlay={
                                                <BS.Tooltip id={`tooltip-left`}>
                                                    Public Meeting
                                                </BS.Tooltip>
                                            }
                                        >
                                            <Icon.UnlockFill />

                                        </BS.OverlayTrigger>
                                    </BS.Button>
                                :
                                    <BS.Button
                                        variant={'link'}
                                        className={'shadow-none'}
                                    >
                                        <BS.OverlayTrigger
                                            trigger='hover'
                                            placement='left'
                                            overlay={
                                                <BS.Tooltip id={`tooltip-left`}>
                                                    Private Meeting
                                                </BS.Tooltip>
                                            }
                                        >
                                            <Icon.LockFill />

                                        </BS.OverlayTrigger>
                                    </BS.Button>
                            }
                        </small>
                        <span className={'mr-auto'}>
                            <strong>&nbsp;{props.meeting.title}</strong> at {props.meeting.startTime} until {props.meeting.endTime}
                        </span>

                        {
                            props.meeting.isOpen ?
                                (
                                    props.meeting.isFull ?
                                        <BS.Badge variant='light' pill disabled>
                                            Meeting Full
                                        </BS.Badge>
                                    :
                                        <BS.Button as={BS.Badge} variant='outline-success' onClick={joinMeeting} pill>
                                            Join
                                        </BS.Button>
                                )
                            :
                                console.log(props.meeting)
                        }

                        {/*    /!* ZOOM LINK *!/*/}
                        {/*    <BS.OverlayTrigger*/}
                        {/*        trigger='hover'*/}
                        {/*        placement='top'*/}
                        {/*        overlay={*/}
                        {/*            <BS.Tooltip id={`tooltip-top`}>*/}
                        {/*                Open in Zoom*/}
                        {/*            </BS.Tooltip>*/}
                        {/*        }*/}
                        {/*    >*/}
                        {/*        <BS.Button*/}
                        {/*            variant={'link'}*/}
                        {/*            className={'shadow-none'}*/}
                        {/*            href={'https://zoom.us/j/' + props.meeting.meetingID.replace(/\s/g,'')}*/}
                        {/*            target={'_blank'}*/}
                        {/*            rel={'noopener noreferrer'}*/}
                        {/*        >*/}
                        {/*            <Icon.Link45deg />*/}
                        {/*        </BS.Button>*/}
                        {/*    </BS.OverlayTrigger>*/}
                        {/*    <ExportToCalendar />*/}
                        {/*    <MeetingNotesInterface*/}
                        {/*        updateMeetings={props.updateMeetings}*/}
                        {/*        meeting={props.meeting}*/}
                        {/*        setNotes={(i) => setNotes(i)}*/}
                        {/*        setMeetings={(i) => props.setMeetings(i)}*/}
                        {/*        notes={notes}*/}
                        {/*    />*/}

                    </BS.Toast.Header>

                    {/* BEGIN MEETING BODY */}
                    {/*<BS.Accordion.Collapse eventKey={props.meeting.id}>*/}
                    {/*    <BS.Toast.Body style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>*/}
                    {/*        <div>*/}
                    {/*            <div className='meeting-card-line'>*/}
                    {/*                <span className='meeting-text'>Zoom Meeting ID: </span>*/}
                    {/*                <MeetingIDInterface updateMeetings={props.updateMeetings} meeting={props.meeting} setMeetings={(i) => props.setMeetings(i)} />*/}
                    {/*            </div>*/}
                    {/*            <div className='meeting-card-line'>*/}
                    {/*                <span className='meeting-text'>Meeting Passcode: </span>*/}
                    {/*                <EditPasscodeInterface updateMeetings={props.updateMeetings} meeting={props.meeting} setMeetings={(i) => props.setMeetings(i)} />*/}
                    {/*            </div>*/}
                    {/*            <div className='meeting-card-line'>*/}
                    {/*                <span className='meeting-text'>Participants: </span>*/}
                    {/*                {props.meeting.participants.map(participant => {*/}
                    {/*                    return <Participant updateMeetings={props.updateMeetings} participant={participant} meeting={props.meeting} setMeetings={(i) => props.setMeetings(i)} />*/}
                    {/*                })}*/}
                    {/*                <ParticipantInterface updateMeetings={props.updateMeetings} meeting={props.meeting} setParticipants={(i) => setParticipants(i)} setMeetings={(i) => props.setMeetings(i)}/>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*        {*/}
                    {/*            props.meeting.participants.find(x => x.userId.toString() === localStorage.getItem(LOCAL_STORAGE_KEY)) ?*/}
                    {/*                (*/}
                    {/*                    props.meeting.participants.find(x => x.userId.toString() === localStorage.getItem(LOCAL_STORAGE_KEY)).isHost ?*/}
                    {/*                        <CancelButton />*/}
                    {/*                        :*/}
                    {/*                        <LeaveButton />*/}
                    {/*                )*/}
                    {/*                :*/}
                    {/*                <BS.Button variant={'success'} size={'sm'}>Join!</BS.Button>*/}
                    {/*        }*/}
                    {/*    </BS.Toast.Body>*/}
                    {/*</BS.Accordion.Collapse>*/}
                </BS.Accordion>
            </>
        )

    return(
        <>
            {/* BEGIN MEETING DISPLAY AS BOOTSTRAP ACCORDION */}
            <BS.Accordion as={BS.Toast} className='meeting-toast'>
                    {/* MEETING HEADER WITH CONTEXT BUTTONS */}
                    <BS.Toast.Header closeButton={false}>
                        <span className={'mr-auto'}>
                            <Toggle eventKey={props.meeting.id}/>
                        </span>
                        <small>
                            {
                                props.meeting.participants.find(x => x.userId.toString() === localStorage.getItem(LOCAL_STORAGE_KEY)).isHost ?
                                        <BS.OverlayTrigger
                                            trigger='hover'
                                            placement='top'
                                            overlay={
                                                <BS.Tooltip id={`tooltip-top`}>
                                                    You're the host
                                                </BS.Tooltip>
                                            }
                                        >
                                            <BS.Button
                                                variant={'link'}
                                                className={'shadow-none'}
                                            >
                                                <Icon.Star />
                                            </BS.Button>
                                        </BS.OverlayTrigger>
                                    :
                                        null
                            }
                            {/* ZOOM LINK */}
                            <BS.OverlayTrigger
                                trigger='hover'
                                placement='top'
                                overlay={
                                    <BS.Tooltip id={`tooltip-top`}>
                                        Open in Zoom
                                    </BS.Tooltip>
                                }
                            >
                                <BS.Button
                                    variant={'link'}
                                    className={'shadow-none'}
                                    href={'https://zoom.us/j/' + props.meeting.meetingID.replace(/\s/g,'')}
                                    target={'_blank'}
                                    rel={'noopener noreferrer'}
                                >
                                    <Icon.Link45deg />
                                </BS.Button>
                            </BS.OverlayTrigger>
                            <ExportToCalendar />
                            <MeetingNotesInterface
                                updateMeetings={props.updateMeetings}
                                meeting={props.meeting}
                                setNotes={(i) => setNotes(i)}
                                setMeetings={(i) => props.setMeetings(i)}
                                notes={notes}
                            />

                        </small>
                    </BS.Toast.Header>

                    {/* BEGIN MEETING BODY */}
                    <BS.Accordion.Collapse eventKey={props.meeting.id}>
                        <BS.Toast.Body style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                            <div>

                                {
                                    props.meeting.isOnline ?
                                        <div className='meeting-card-line'>
                                            <span className='meeting-text'>Zoom Meeting ID: </span>
                                            <MeetingIDInterface updateMeetings={props.updateMeetings} meeting={props.meeting} setMeetings={(i) => props.setMeetings(i)} />
                                        </div>
                                    :
                                        <>
                                            <div className='meeting-card-line mb-2'>
                                                <BS.Form.Text className={'text-muted'}><Icon.InfoCircle />&nbsp;This meeting is being held in person.</BS.Form.Text>
                                            </div>
                                            <div className='meeting-card-line'>
                                                <span className='meeting-text'>Meeting Location: </span>
                                                <MeetingLocationInterface updateMeetings={props.updateMeetings} meeting={props.meeting} setMeetings={(i) => props.setMeetings(i)} />
                                            </div>
                                        </>
                                }
                                {
                                    props.meeting.isOnline ?
                                        <div className='meeting-card-line'>
                                            <span className='meeting-text'>Meeting Passcode: </span>
                                            <EditPasscodeInterface updateMeetings={props.updateMeetings} meeting={props.meeting} setMeetings={(i) => props.setMeetings(i)} />
                                        </div>
                                        :
                                        null
                                }

                                <div className='meeting-card-line'>
                                    <span className='meeting-text'>Participants: </span>
                                    {props.meeting.participants.map(participant => {
                                        return <Participant updateMeetings={props.updateMeetings} participant={participant} meeting={props.meeting} setMeetings={(i) => props.setMeetings(i)} />
                                    })}
                                    <ParticipantInterface updateMeetings={props.updateMeetings} meeting={props.meeting} setParticipants={(i) => setParticipants(i)} setMeetings={(i) => props.setMeetings(i)}/>
                                </div>
                            </div>
                            {
                                props.meeting.participants.find(x => x.userId.toString() === localStorage.getItem(LOCAL_STORAGE_KEY)) ?
                                    (
                                        props.meeting.participants.find(x => x.userId.toString() === localStorage.getItem(LOCAL_STORAGE_KEY)).isHost ?
                                            <CancelButton />
                                        :
                                            <LeaveButton />
                                    )
                                :
                                    <BS.Button variant={'success'} size={'sm'}>Join!</BS.Button>
                            }
                        </BS.Toast.Body>
                    </BS.Accordion.Collapse>
            </BS.Accordion>
        </>
    )
}

export default Meeting
