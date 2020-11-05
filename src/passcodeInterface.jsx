import React, { useRef } from 'react'

import * as BS from 'react-bootstrap'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import * as Icon from 'react-bootstrap-icons'
import CopiedBadge from './copiedBadge'


const PasscodeInterface = (props) => {
    // STATE LISTENER
    const [modalShow, setModalShow] = React.useState(false)
    const [copyAlert, setCopyAlert] = React.useState(false)

    // FORM TRACKING REF
    const passcodeRef = useRef()

    // MODAL HANDLERS
    const handleClose = () => setModalShow(false)
    const handleShow = () => setModalShow(true)

    // NEW MEETING HANDLER
    const handleChangeID = (e) => {
        // GET FIELD VALUE
        const newPasscode = passcodeRef.current.value

        // IF FIELD IS EMPTY, DO NOTHING
        if (newPasscode === '') {
            handleClose()
            return
        }

        // UPDATE MEETING PASSCODE AND STATE
        props.meeting.passcode = newPasscode
        props.setMeetings(meetings => { return [...meetings] })

        // CLOSE MODAL
        handleClose()
    }

    return (
        <>
            {/* MEETING PASSCODE DISPLAY BUTTON WITH TOOLTIP */}
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
                <CopyToClipboard text={props.meeting.passcode} onCopy={() => setCopyAlert(!copyAlert)}>
                    <BS.Button as={BS.Badge} size='lg' pill variant='outline-danger'>
                        {props.meeting.passcode}
                    </BS.Button>
                </CopyToClipboard>
            </BS.OverlayTrigger>

            {/* EDIT BUTTON, LAUNCHES MODAL */}
            <BS.OverlayTrigger
                trigger='hover'
                placement='right'
                overlay={
                    <BS.Tooltip id={'tooltip-right'}>
                        Click to Edit
                    </BS.Tooltip>
                }
            >
                <BS.Button variant='link' size='sm' onClick={handleShow} className={'shadow-none'}>
                    <Icon.PencilFill />
                </BS.Button>
            </BS.OverlayTrigger>

            {/* COPIED TO CLIPBOARD ALERT */}
            <CopiedBadge copyAlert={copyAlert} setCopyAlert={(i) => setCopyAlert(i)} />

            {/* START EDIT MODAL */}
            <BS.Modal
                onHide={handleClose}
                show={modalShow}
                size='sm'
                aria-labelledby='contained-modal-title-vcenter'
            >
                <BS.Modal.Header>
                    <BS.Modal.Title id='contained-modal-title-vcenter'>
                        Edit Meeting Passcode
                    </BS.Modal.Title>
                </BS.Modal.Header>

                <BS.Modal.Body>
                    {/* NEW PASSCODE FORM FIELD */}
                    <BS.Form>
                        <BS.Form.Group controlId='text'>
                            <BS.Form.Control
                                ref={passcodeRef}
                                type='text'
                                defaultValue={props.meeting.passcode}
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
    )
}

export default PasscodeInterface
