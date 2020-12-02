import React, {useRef, useState} from 'react'

import * as BS from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import CopiedBadge from './copiedBadge'
import { Group } from '../models/group'
import { v4 as uuid } from 'uuid'
import {User} from '../models/user'
import {Api} from '../api/api'
import {setIn} from 'formik'
import {LOCAL_STORAGE_KEY} from '../config'
import {useHistory} from 'react-router-dom'


const UserSearchInterface = (props) => {
    const api = new Api()
    const history = useHistory()

    // STATE LISTENER
    const [modalShow, setModalShow] = React.useState(false)
    const [invalid, setInvalid] = useState(false)

    // FORM TRACKING REF
    const nameRef = useRef()

    // MODAL HANDLERS
    const handleClose = () => {
        setModalShow(false)
        setInvalid(false)
    }
    const handleShow = () => setModalShow(true)

    // NEW MEETING HANDLER
    const handleAdd = (e) => {
        setInvalid(false)

        // GET FIELD VALUE
        const name = nameRef.current.value

        // IF FIELD IS EMPTY, DO NOTHING
        if (name === '') {
            return
        }

        // const user = new User(uuid(), 'test@email.com', name, 'Test', [], [])
        //
        // // UPDATE MEETING ID AND STATE
        // props.group.members.push(user)
        // props.setMembers(props.group.members)
        // props.setMembers(members => {return [...members]})
        nameRef.current.value = null

        api.getUserByEmail(name)
            .then(x => {
                if (x[0]) {
                    if (x[0].userID.toString() === localStorage.getItem(LOCAL_STORAGE_KEY))
                        history.push(`/home`)
                    else
                        history.push(`/user/${x[0].userID}`)
                    handleClose()
                }
                else
                    setInvalid(true)
            })
    }

    return (
        <>

            {/*<BS.Button*/}
            {/*    variant={'link'}*/}
            {/*    className={'shadow-none'}*/}
            {/*    onClick={handleShow}*/}
            {/*>*/}
            {/*    <BS.OverlayTrigger*/}
            {/*        trigger='hover'*/}
            {/*        placement='top'*/}
            {/*        overlay={*/}
            {/*            <BS.Tooltip id={`tooltip-top`}>*/}
            {/*                Add Group Member*/}
            {/*            </BS.Tooltip>*/}
            {/*        }*/}
            {/*    >*/}
            {/*        <Icon.PersonPlusFill />*/}
            {/*    </BS.OverlayTrigger>*/}
            {/*</BS.Button>*/}

            <BS.OverlayTrigger
                trigger='hover'
                key='bottom'
                placement='bottom'
                overlay={
                    <BS.Tooltip id={`tooltip-groups`}>
                        Find User
                    </BS.Tooltip>
                }
            >
                <BS.Nav.Link onClick={handleShow}>
                    <Icon.Search className='header-icon' />
                </BS.Nav.Link>
            </BS.OverlayTrigger>

            {/* START EDIT MODAL */}
            <BS.Modal
                onHide={handleClose}
                show={modalShow}
                size='sm'
                aria-labelledby='contained-modal-title'
            >
                <BS.Modal.Header>
                    <BS.Modal.Title id='contained-modal-title'>
                        Find User
                    </BS.Modal.Title>
                </BS.Modal.Header>

                <BS.Modal.Body>
                    {/* NEW MEETING ID FORM FIELD */}
                    {
                        invalid ?
                            <BS.Alert variant='danger'>
                                No user found.
                            </BS.Alert>
                            : null
                    }
                    {/*<BS.Form >*/}
                    <BS.Form.Group controlId='text'>
                        <BS.Form.Control
                            ref={nameRef}
                            type='text'
                            autocomplete='off'
                            placeholder='User E-mail'
                        />
                    </BS.Form.Group>
                    {/*</BS.Form>*/}
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

export default UserSearchInterface
