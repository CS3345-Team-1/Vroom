import React, { useRef } from 'react'

import * as BS from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import CopiedBadge from './copiedBadge'
import { Group } from '../models/group'
import {v4 as uuidv4} from 'uuid'
import {Api} from '../api/api'

import {LOCAL_STORAGE_KEY} from '../config'


const NewGroupInterface = (props) => {
    const api = new Api()

    // STATE LISTENER
    const [modalShow, setModalShow] = React.useState(false)

    // FORM TRACKING REF
    const nameRef = useRef()

    // MODAL HANDLERS
    const handleClose = () => setModalShow(false)
    const handleShow = () => setModalShow(true)

//     NEW GROUP HANDLER
    const handleAdd = (e) => {

        // GET FIELD VALUE
        const groupName = nameRef.current.value

        // IF FIELD IS EMPTY, DO NOTHING
        if (groupName === '') {
            handleClose()
            return
        }

        nameRef.current.value = null

        api.addGroup(groupName, localStorage.getItem(LOCAL_STORAGE_KEY)).then(x => props.updateGroups()).then(x => handleClose())
//         // UPDATE MEETING ID AND STATE
//         const newGroup = new Group(uuidv4(), groupName, [])
//         props.setGroups(groups => {return [...groups, newGroup]})
//
//         // CLOSE MODAL
//         handleClose()

    }

    return (
        <>
            <BS.Button size={'sm'} onClick={handleShow} variant='success' className={'shadow-none mb-3'} block>
                New Group
            </BS.Button>

            {/* START EDIT MODAL */}
            <BS.Modal
                onHide={handleClose}
                show={modalShow}
                size='sm'
                aria-labelledby='contained-modal-title'
            >
                <BS.Modal.Header>
                    <BS.Modal.Title id='contained-modal-title'>
                        New Group
                    </BS.Modal.Title>
                </BS.Modal.Header>

                <BS.Modal.Body>
                    {/* NEW MEETING ID FORM FIELD */}
                    <BS.Form onSubmit={handleAdd}>
                        <BS.Form.Group controlId='text'>
                            <BS.Form.Control
                                ref={nameRef}
                                type='text'
                                autocomplete='off'
                                placeholder='Group Name'
                            />
                        </BS.Form.Group>
                    </BS.Form>
                </BS.Modal.Body>

                {/* ACTION BUTTONS */}
                <BS.Modal.Footer>
                    <BS.Button variant='primary' onClick={handleAdd}>Save</BS.Button>
                    <BS.Button variant='danger' onClick={handleClose}>Cancel</BS.Button>
                </BS.Modal.Footer>
            </BS.Modal>
        </>
    )
}

export default NewGroupInterface
