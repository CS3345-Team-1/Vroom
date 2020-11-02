import React, { useRef } from 'react'

import * as BS from 'react-bootstrap'
import {v4 as uuidv4} from 'uuid'
import * as Icon from 'react-bootstrap-icons'
import Note from './note'


const MeetingNotesInterface = (props) => {
    // STATE LISTENER
    const [modalShow, setModalShow] = React.useState(false)

    // FORM TRACKING REFS
    const nameRef = useRef()
    const noteRef = useRef()

    // MODAL HANDLERS
    const handleClose = () => setModalShow(false)
    const handleShow = () => setModalShow(true)

    // ADD NOTE HANDLER
    const handleAddNote = (e) => {
        // GET FORM VALUES
        const name = nameRef.current.value
        const note = noteRef.current.value

        // DO NOTHING WHEN IF FIELDS ARE BLANK
        if (name === '' || note === '') return

        // CREATE A NEW NOTE
        const newNote = {
            id: uuidv4(),
            name: name,
            note: note,
            time: new Date().toLocaleString()
        }

        // ADD THE NOTE TO THE MEETING AND RESET STATE
        props.meeting.notes.push(newNote)
        props.setNotes(prevNotes => {
            return [...prevNotes, newNote]
        })

        // RESET FORM FIELDS
        nameRef.current.value = null
        noteRef.current.value = null

        // SAVE MEETINGS STATE
        props.setMeetings(meetings => { return [...meetings] })
    }

    return (
        <>
            {/* DISPLAYED BUTTON ELEMENT TO TOGGLE MODAL */}
            <BS.OverlayTrigger
                trigger='hover'
                placement='top'
                overlay={
                    <BS.Tooltip id={`tooltip-top`}>
                        View Notes
                    </BS.Tooltip>
                }
            >
                <BS.Button variant={'link'} className={'shadow-none'} onClick={handleShow}>
                    <Icon.ChatRightText />
                    <BS.Badge>{props.meeting.notes.length}</BS.Badge>
                </BS.Button>
            </BS.OverlayTrigger>

            {/* START MODAL */}
            <BS.Modal
                show={modalShow}
                onHide={handleClose}
                size='lg'
                aria-labelledby='contained-modal-title-vcenter'
                centered
            >

                <BS.Modal.Header closeButton>
                    <BS.Modal.Title id='contained-modal-title-vcenter'>
                        Meeting Notes
                    </BS.Modal.Title>
                </BS.Modal.Header>

                <BS.Modal.Body>
                    {/* DISPLAY ALL CURRENT NOTES */}
                    {
                        props.meeting.notes.length > 0 ?
                            props.meeting.notes.map(note => {
                                return <Note key={note.id} note={note} />
                            })
                        :
                            <BS.Toast className='meeting-toast'>
                                <BS.Toast.Body>
                                    No notes to display. Start the conversation!
                                </BS.Toast.Body>
                            </BS.Toast>
                    }

                    {/* START NEW NOTE FORM */}
                    <hr />
                    <h5>Add a Note</h5>
                    <BS.Form>
                        {/* TEMPORARY NAME FIELD UNTIL CURRENT USER CAN BE READ FROM DB */}
                        <BS.Form.Group controlId='text'>
                            <BS.Form.Control
                                ref={nameRef}
                                type='text'
                                placeholder='Name'
                                autocomplete='off'
                            />
                        </BS.Form.Group>

                        {/* NOTE FIELD */}
                        <BS.Form.Group controlId='text'>
                            <BS.Form.Control
                                ref={noteRef}
                                as='textarea'
                                rows='4'
                                placeholder='Note'
                                autocomplete='off'
                            />
                        </BS.Form.Group>
                    </BS.Form>
                </BS.Modal.Body>

                {/* ACTION BUTTONS */}
                <BS.Modal.Footer>
                    <BS.Button variant='primary' onClick={handleAddNote}>Post</BS.Button>
                    <BS.Button variant='danger' onClick={handleClose}>Close</BS.Button>
                </BS.Modal.Footer>
            </BS.Modal>
        </>
    )
}

export default MeetingNotesInterface
