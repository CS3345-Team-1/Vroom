import React, { useRef } from 'react'

import * as BS from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import CopiedBadge from './copiedBadge'
import { Group } from '../models/group'
import { v4 as uuid } from 'uuid'
import {User} from '../models/user'


const NewGroupMemberInterface = (props) => {
    // STATE LISTENER
    const [modalShow, setModalShow] = React.useState(false)

    // FORM TRACKING REF
    const nameRef = useRef()

    // MODAL HANDLERS
    const handleClose = () => setModalShow(false)
    const handleShow = () => setModalShow(true)

    // NEW MEETING HANDLER
    const handleAdd = (e) => {
        // GET FIELD VALUE
        const name = nameRef.current.value

        // IF FIELD IS EMPTY, DO NOTHING
        if (name === '') {
            handleClose()
            return
        }

        const user = new User(uuid(), 'test@email.com', name, 'Test', [], [])

        // UPDATE MEETING ID AND STATE
        props.group.members.push(user)
        props.setMembers(props.group.members)
        props.setMembers(members => {return [...members]})

        // CLOSE MODAL
        handleClose()
    }

    return (
        <>

            <BS.Button
                variant={'link'}
                className={'shadow-none'}
                onClick={handleShow}
            >
                <BS.OverlayTrigger
                    trigger='hover'
                    placement='top'
                    overlay={
                        <BS.Tooltip id={`tooltip-top`}>
                            Add Group Member
                        </BS.Tooltip>
                    }
                >
                    <Icon.PersonPlusFill />
                </BS.OverlayTrigger>
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
                        Add Group Member
                    </BS.Modal.Title>
                </BS.Modal.Header>

                <BS.Modal.Body>
                    {/* NEW MEETING ID FORM FIELD */}
                    <BS.Form>
                        <BS.Form.Group controlId='text'>
                            <BS.Form.Control
                                ref={nameRef}
                                type='text'
                                autocomplete='off'
                                placeholder='Group Member Name'
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

export default NewGroupMemberInterface
