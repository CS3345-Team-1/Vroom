import React from 'react';

import * as BS from 'react-bootstrap';


export default function Note(props) {

    return(
        <>
            {/* MEETING NOTE AS BOOTSTRAP TOAST ELEMENT */}
            <BS.Toast style={{minWidth: '100%'}}>
                <BS.Toast.Header closeButton={false}>
                    <strong className="mr-auto">{props.note.name} </strong>
                    <small className="note-time">{props.note.time}</small>
                </BS.Toast.Header>
                <BS.Toast.Body>{props.note.note}</BS.Toast.Body>
            </BS.Toast>
        </>
    )
}