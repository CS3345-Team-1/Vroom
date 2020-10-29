import React, { useState, useEffect } from 'react';

import * as BS from 'react-bootstrap';
import MeetingNotesInterface from './MeetingNotesInterface';
import Participant from './Participant';
import AddParticipantInterface from './AddParticipantInterface';
import EditMeetingIDInterface from './EditMeetingIDInterface';
import EditPasscodeInterface from './EditPasscodeInterface';


export default function Meeting(props) {
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
        setParticipants(currentNotes)
    }, [props.meeting.notes])

    // MEETING CANCELLATION HANDLER
    function handleCancelClick() {
        props.handleCancel(props.meeting.id)
    }

    return(
        <>
            {/* BEGIN MEETING DISPLAY AS BOOTSTRAP ACCORDION */}
            <BS.Accordion>
                <BS.Card>
                    {/* HEADER WITH MEETING TITLE AND TIME */}
                    <BS.Accordion.Toggle as={BS.Card.Header} eventKey={props.meeting.id}>
                        <strong>{props.meeting.title}</strong> on {props.meeting.date} at {props.meeting.startTime} until {props.meeting.endTime}
                    </BS.Accordion.Toggle>

                    {/* BEGIN MEETING BODY */}
                    <BS.Accordion.Collapse eventKey={props.meeting.id}>
                        <BS.Card.Body>
                            <div>
                                <span>Zoom Meeting ID: </span>
                                <EditMeetingIDInterface meeting={props.meeting} setMeetings={(i) => props.setMeetings(i)} />
                            </div>
                            <div>
                                <span>Meeting Passcode: </span>
                                <EditPasscodeInterface meeting={props.meeting} setMeetings={(i) => props.setMeetings(i)} />
                            </div>
                            <div>
                                <span>Participants: </span>
                                {props.meeting.participants.map(participant => {
                                    return <Participant participant={participant} meeting={props.meeting} setMeetings={(i) => props.setMeetings(i)} />
                                })}
                                <AddParticipantInterface meeting={props.meeting} setParticipants={(i) => setParticipants(i)} setMeetings={(i) => props.setMeetings(i)}/>
                            </div>
                            <MeetingNotesInterface meeting={props.meeting} setNotes={(i) => setNotes(i)} setMeetings={(i) => props.setMeetings(i)}/>
                            <BS.Button variant="danger" size="sm" onClick={handleCancelClick}>Cancel Meeting</BS.Button>
                        </BS.Card.Body>
                    </BS.Accordion.Collapse>
                </BS.Card>
            </BS.Accordion>
        </>
    )
}