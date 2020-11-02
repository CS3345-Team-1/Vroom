import React, { useRef } from 'react'

import * as BS from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'
import {v4 as uuidv4} from 'uuid'


const ParticipantInterface = (props) => {
    // STATE LISTENER
    const [modalShow, setModalShow] = React.useState(false)

    // FORM TRACKING REF
    const nameRef = useRef()

    // MODAL HANDLERS
    const handleClose = () => setModalShow(false)
    const handleShow = () => setModalShow(true)

    // ADD PARTICIPANT HANDLER
    const handleAddParticipant = () => {
        // GET FIELD VALUE
        const name = nameRef.current.value

        // DO NOTHING IF FIELD IS BLANK
        if (name === '') return

        // CREATE A NEW PARTICIPANT
        const newParticipant = {
            id: uuidv4(),
            name: name
        }

        // ADD THE NEW PARTICIPANT AND UPDATE STATE
        props.meeting.participants.push(newParticipant)
        props.setParticipants(prevParticipants => {
            return [...prevParticipants, newParticipant]
        })

        // RESET FORM VALUE
        nameRef.current.value = null

        // SET MEETING STATE
        props.setMeetings(meetings => { return [...meetings] })

        // CLOSE THE MODAL
        handleClose()
    }

    return (
        <>
            {/* DISPLAYED TOGGLE ELEMENT WITH TOOLTIP */}
            <BS.OverlayTrigger
                trigger='hover'
                placement='right'
                overlay={
                    <BS.Tooltip id={`tooltip-right`}>
                        Click to Add
                    </BS.Tooltip>
                }
            >
                <BS.Button as={BS.Badge} onClick={handleShow} pill variant='outline-success'>
                    <Icon.Plus />
                </BS.Button>
            </BS.OverlayTrigger>

            {/* START MODAL */}
            <BS.Modal
                onHide={handleClose}
                show={modalShow}
                size='sm'
                aria-labelledby='contained-modal-title-vcenter'
            >

                <BS.Modal.Header>
                    <BS.Modal.Title id='contained-modal-title-vcenter'>
                        New Participant
                    </BS.Modal.Title>
                </BS.Modal.Header>

                <BS.Modal.Body>
                    {/* NEW PARTICIPANT FIELD */}
                    <BS.Form>
                        <BS.Form.Group controlId='text'>
                            <BS.Form.Control
                                ref={nameRef}
                                type='text'
                                placeholder='Participant Name'
                                autocomplete='off'
                            />
                        </BS.Form.Group>
                    </BS.Form>
                </BS.Modal.Body>

                {/* ACTION BUTTONS */}
                <BS.Modal.Footer>
                    <BS.Button variant='primary' onClick={handleAddParticipant}>Add Participant</BS.Button>
                    <BS.Button variant='danger' onClick={handleClose}>Cancel</BS.Button>
                </BS.Modal.Footer>
            </BS.Modal>
        </>
    )
}

export default ParticipantInterface
