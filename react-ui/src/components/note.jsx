import React, {useEffect, useState} from 'react'

import * as BS from 'react-bootstrap'
import {Api} from '../api/api'


const Note = (props) => {
    const api = new Api()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()

    useEffect(() => {
        api.getUser(props.note.authorId).then((user) => setFirstName(user[0].firstName))
        api.getUser(props.note.authorId).then((user) => setLastName(user[0].lastName))
    },[])

    if (!firstName || !lastName) return <></>

    return(
        <>
            {/* MEETING NOTE AS BOOTSTRAP TOAST ELEMENT */}
            <BS.Toast className='meeting-toast'>
                <BS.Toast.Header closeButton={false}>
                    <strong className='mr-auto'>{firstName + ' ' + lastName}</strong>
                    <small className='note-time'>{props.note.time}</small>
                </BS.Toast.Header>
                <BS.Toast.Body>{props.note.note}</BS.Toast.Body>
            </BS.Toast>
        </>
    )
}

export default Note
