import React, { useRef } from 'react';

import * as BS from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import {CopyToClipboard} from 'react-copy-to-clipboard';


export default function EditMeetingIDInterface(props) {
    // STATE LISTENER
    const [modalShow, setModalShow] = React.useState(false)
    const [copyAlert, setCopyAlert] = React.useState(false)

    // FORM TRACKING REF
    const idRef = useRef()

    // MODAL HANDLERS
    const handleClose = () => setModalShow(false)
    const handleShow = () => setModalShow(true)

    // NEW MEETING HANDLER
    function handleChangeID(e) {
        // GET FIELD VALUE
        const newID = idRef.current.value

        // IF FIELD IS EMPTY, DO NOTHING
        if (newID === '') {
            handleClose()
            return
        }

        // UPDATE MEETING ID AND STATE
        props.meeting.meetingID = newID
        props.setMeetings(meetings => { return [...meetings] })

        // CLOSE MODAL
        handleClose()
    }

    return (
        <>
            {/* MEETING ID DISPLAY BUTTON WITH TOOLTIP */}
            <BS.OverlayTrigger
                trigger='hover'
                placement='top'
                overlay={
                    <BS.Tooltip id={`tooltip-top`}>
                        Click to Copy
                    </BS.Tooltip>
                }
            >
                {/* COPIES ID TO CLIPBOARD ON CLICK */}
                <CopyToClipboard text={props.meeting.meetingID} onCopy={() => setCopyAlert(!copyAlert)}>
                    <BS.Button as={BS.Badge} pill variant='outline-info'>
                        {props.meeting.meetingID}
                    </BS.Button>
                </CopyToClipboard>
            </BS.OverlayTrigger>

            {/* EDIT BUTTON, LAUNCHES MODAL */}
            <BS.OverlayTrigger
                trigger='hover'
                placement='right'
                overlay={
                    <BS.Tooltip id={`tooltip-right`}>
                        Click to Edit
                    </BS.Tooltip>
                }
            >
                <BS.Button variant='link' size='sm' onClick={handleShow}>
                    <Icon.PencilFill />
                </BS.Button>
            </BS.OverlayTrigger>

            {/* COPIED TO CLIPBOARD ALERT */}
            <BS.Toast
                style={{display: 'inline'}}
                onClose={() => setCopyAlert(false)}
                show={copyAlert}
                delay={1000}
                autohide
            >
                <BS.ToastBody as={BS.Badge} variant='success' >
                    Copied to Clipboard
                </BS.ToastBody>
            </BS.Toast>

            {/* START EDIT MODAL */}
            <BS.Modal
                show={modalShow}
                size='sm'
                aria-labelledby='contained-modal-title'
            >
                <BS.Modal.Header>
                    <BS.Modal.Title id='contained-modal-title'>
                        Edit Meeting ID
                    </BS.Modal.Title>
                </BS.Modal.Header>

                <BS.Modal.Body>
                    {/* NEW MEETING ID FORM FIELD */}
                    <BS.Form>
                        <BS.Form.Group controlId='text'>
                            <BS.Form.Control
                                ref={idRef}
                                type='text'
                                placeholder={props.meeting.meetingID}
                                autocomplete='off'
                            />
                        </BS.Form.Group>
                    </BS.Form>
                </BS.Modal.Body>

                {/* ACTION BUTTONS */}
                <BS.Modal.Footer>
                    <BS.Button variant='primary' onClick={handleChangeID}>Save</BS.Button>
                    <BS.Button variant='danger' onClick={handleClose}>Cancel</BS.Button>
                </BS.Modal.Footer>
            </BS.Modal>
        </>
    );
}