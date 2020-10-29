import React, { useRef } from 'react';

import Datetime from 'react-datetime';
import * as BS from 'react-bootstrap';
import {v4 as uuidv4} from 'uuid';


export default function NewMeetingInterface(props) {

    // STATE LISTENER
    const [modalShow, setModalShow] = React.useState(false)

    // FORM TRACKING REFS
    const titleRef = useRef()
    const dateRef = useRef()
    const startTimeRef = useRef()
    const endTimeRef = useRef()
    const idRef = useRef()
    const passcodeRef = useRef()

    // MODAL HANDLERS
    const handleClose = () => setModalShow(false)
    const handleShow = () => setModalShow(true)

    // NEW MEETING HANDLER
    function handleAddMeeting(e) {
        // GET FORM FIELD VALUES
        const title = titleRef.current.value
        const date = dateRef.current.state.inputValue
        const startTime = startTimeRef.current.state.inputValue
        const endTime = endTimeRef.current.state.inputValue
        const id = idRef.current.value
        const passcode = passcodeRef.current.value !== '' ? passcodeRef.current.value : 'None'

        // ADD NEW MEETING
        props.setMeetings(prevTodos => {
            return [...prevTodos, {
                id: uuidv4(),
                title: title,
                date: date,
                startTime: startTime,
                endTime: endTime,
                meetingID: id,
                passcode: passcode,
                participants: [],
                notes: []
            }]
        })

        // EXIT THE MODAL
        handleClose()
    }

    return (
        <>
            {/* BUTTON TO TOGGLE DISPLAY MODAL */}
            <BS.Button variant="primary" onClick={handleShow} block>New Meeting</BS.Button>

            {/* START DISPLAY MODAL */}
            <BS.Modal
                show={modalShow}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >

                <BS.Modal.Header>
                    <BS.Modal.Title id="contained-modal-title-vcenter">
                        Schedule a New Meeting
                    </BS.Modal.Title>
                </BS.Modal.Header>

                <BS.Modal.Body>
                    <BS.Form>

                        {/* MEETING TITLE */}
                        <BS.Form.Group controlId="text">
                            <BS.Form.Label>Meeting Title</BS.Form.Label>
                            <BS.Form.Control
                                ref={titleRef}
                                type="text"
                                placeholder="My Awesome Zoom Meeting"
                                autocomplete="off"
                            />
                        </BS.Form.Group>

                        {/* MEETING DATE */}
                        <BS.Form.Group controlId="datetime">
                            <BS.Form.Label>Meeting Date</BS.Form.Label>
                            <Datetime ref={dateRef} timeFormat={false} />
                        </BS.Form.Group>

                        {/* MEETING START TIME */}
                        <BS.Form.Group controlId="datetime">
                            <BS.Form.Label>Start Time</BS.Form.Label>
                            <Datetime ref={startTimeRef} dateFormat={false} />
                        </BS.Form.Group>

                        {/* MEETING END TIME */}
                        <BS.Form.Group controlId="datetime">
                            <BS.Form.Label>End Time</BS.Form.Label>
                            <Datetime ref={endTimeRef} dateFormat={false} />
                        </BS.Form.Group>

                        {/* MEETING ZOOM ID */}
                        <BS.Form.Group controlId="text">
                            <BS.Form.Label>Zoom Meeting ID</BS.Form.Label>
                            <BS.Form.Control
                                ref={idRef}
                                type="text"
                                placeholder="012 3456 7890"
                                autocomplete="off"
                            />
                        </BS.Form.Group>

                        {/* MEETING PASSCODE */}
                        <BS.Form.Group controlId="text">
                            <BS.Form.Label>Zoom Meeting Passcode</BS.Form.Label>
                            <BS.Form.Control
                                ref={passcodeRef}
                                type="text"
                                placeholder="S3cr3t-M33ting"
                                autocomplete="off"
                            />
                            <BS.Form.Text className="text-muted">
                                if applicable
                            </BS.Form.Text>
                        </BS.Form.Group>
                  </BS.Form>
                </BS.Modal.Body>

                {/* ACTION BUTTONS */}
                <BS.Modal.Footer>
                    <BS.Button variant="primary" onClick={handleAddMeeting}>Add Meeting</BS.Button>
                    <BS.Button variant="danger" onClick={handleClose}>Cancel</BS.Button>
            </BS.Modal.Footer>
        </BS.Modal>
      </>
      );
}