import React, {useRef, useState} from 'react'

import * as BS from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'
import {v4 as uuidv4} from 'uuid'
import {Api} from '../api/api'
import {LOCAL_STORAGE_KEY} from '../config'


const ParticipantInterface = (props) => {
    // STATE LISTENER
    const [modalShow, setModalShow] = React.useState(false)
    const [invalid, setInvalid] = useState(false)
    const [exists, setExists] = useState(false)

    const api = new Api()

    // FORM TRACKING REF
    const nameRef = useRef()

    // MODAL HANDLERS
    const handleClose = () => setModalShow(false)
    const handleShow = () => setModalShow(true)

    // ADD PARTICIPANT HANDLER
    const handleAddParticipant = () => {
        setExists(false)
        setInvalid(false)

        // GET FIELD VALUE
        const name = nameRef.current.value

        // DO NOTHING IF FIELD IS BLANK
        if (name === '') return

        if (props.meeting.participants.filter(x => {return x.email === name}).length > 0) {
            setExists(true)
            return
        }



        // // CREATE A NEW PARTICIPANT
        // const newParticipant = {
        //     id: uuidv4(),
        //     name: name
        // }

        // // ADD THE NEW PARTICIPANT AND UPDATE STATE
        // props.meeting.participants.push(newParticipant)
        // props.setParticipants(prevParticipants => {
        //     return [...prevParticipants, newParticipant]
        // })
        //
        // RESET FORM VALUE
        nameRef.current.value = null
        //
        // // SET MEETING STATE
        // props.setMeetings(meetings => { return [...meetings] })

        api.getUserByEmail(name)
            .then(x => {
                if (x[0])
                api.addMember(props.meeting.id, x[0].userID)
                    .then(x => props.updateMeetings())
                    .then(x => setInvalid(false))
                    .then(x => handleClose())
                else
                    setInvalid(true)
            })

        // CLOSE THE MODAL
        // handleClose()
    }

    return (
        <>
            {/* DISPLAYED TOGGLE ELEMENT WITH TOOLTIP */}
            {
                props.meeting.participants.find(x => x.userId.toString() === localStorage.getItem(LOCAL_STORAGE_KEY)).isHost ?
                    <BS.OverlayTrigger
                        trigger='hover'
                        placement='right'
                        overlay={
                            <BS.Tooltip id={`tooltip-right`}>
                                Click to Add
                            </BS.Tooltip>
                        }
                    >
                        <BS.Button variant='link' size='sm' onClick={handleShow} className={'shadow-none'}>
                            <Icon.PersonPlusFill />
                        </BS.Button>
                    </BS.OverlayTrigger>
                    : null
            }

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
                    <BS.Tabs defaultActiveKey="add-single" id="add-participant-tabs">
                        <BS.Tab eventKey="add-single" title="Single Participant">
                            {
                                invalid ?
                                    <BS.Alert variant='danger'>
                                        No user found.
                                    </BS.Alert>
                                : null
                            }
                            {
                                exists ?
                                    <BS.Alert variant='danger'>
                                        User is already a participant.
                                    </BS.Alert>
                                    : null
                            }

                            <BS.Form>
                                <BS.Form.Group controlId='text'>
                                    <BS.Form.Control
                                        ref={nameRef}
                                        type='text'
                                        placeholder='Participant E-mail'
                                        autocomplete='off'
                                    />
                                </BS.Form.Group>
                            </BS.Form>
                        </BS.Tab>
                        <BS.Tab eventKey="add-group" title="Add a Group">
                            ADD A GROUP
                        </BS.Tab>

                    </BS.Tabs>
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
