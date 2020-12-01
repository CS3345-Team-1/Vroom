import React, {useEffect, useRef, useState} from 'react'

import * as BS from 'react-bootstrap'
import {v4 as uuidv4} from 'uuid'
import * as Icon from 'react-bootstrap-icons'
import Note from './note'
import {Api} from '../api/api'
import {LOCAL_STORAGE_KEY} from '../config'


const MeetingNotesInterface = (props) => {
    const api = new Api()

    const [comments, setComments] = useState(props.notes)

    // STATE LISTENER
    const [modalShow, setModalShow] = React.useState(false)

    useEffect(() => {
        setComments(props.meeting.notes)
    })

    // FORM TRACKING REFS
    const nameRef = useRef()
    const noteRef = useRef()

    // MODAL HANDLERS
    const handleClose = () => setModalShow(false)
    const handleShow = () => setModalShow(true)

    // ADD NOTE HANDLER
    const handleAddNote = (e) => {
        console.log(props)

        // GET FORM VALUES
        const id = props.meeting.id
        const author = localStorage.getItem(LOCAL_STORAGE_KEY)
        const note = noteRef.current.value
        const time = new Date(new Date() - (new Date().getTimezoneOffset() * 60000)).toISOString().slice(0, -1)

        // DO NOTHING WHEN IF FIELDS ARE BLANK
        if (note === '') return

        // // CREATE A NEW NOTE
        // const newNote = {
        //     name: name,
        //     note: note,
        //     time: new Date().toISOString()
        // }

        // ADD THE NOTE TO THE MEETING AND RESET STATE
        // props.meeting.notes.push(newNote)
        // props.setNotes(prevNotes => {
        //     return [...prevNotes, newNote]
        // })
        api.addComment(id, author, time, note)
            .then(x => props.updateMeetings())

        // RESET FORM FIELDS
        noteRef.current.value = null
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
                    <BS.Badge>{comments.length}</BS.Badge>
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
