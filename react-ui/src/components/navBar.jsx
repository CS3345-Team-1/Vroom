import React from 'react'

import * as BS from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'
import { useParams } from 'react-router-dom'


const NavBar = (props) => {
    // const { url } = useParams()

    return (
        <BS.Navbar as={BS.Card.Header} bg='primary' variant='dark'>
            {/*{ console.log(url) }*/}
            <BS.Navbar.Brand id='logo' as='BS.Button' variant='outline' size='lg'>
                vroom!
            </BS.Navbar.Brand>
            <BS.Nav className={'ml-auto'}>
                <BS.OverlayTrigger
                    key='bottom'
                    placement='bottom'
                    overlay={
                        <BS.Tooltip href={'home'} id={`tooltip-schedule`}>
                            My Schedule
                        </BS.Tooltip>
                    }
                >
                    <BS.Nav.Link href={'/home'}>
                        <Icon.Calendar3 className='header-icon' />
                    </BS.Nav.Link>

                </BS.OverlayTrigger>
                <BS.OverlayTrigger
                    key='bottom'
                    placement='bottom'
                    overlay={
                        <BS.Tooltip id={`tooltip-groups`}>
                            My Groups
                        </BS.Tooltip>
                    }
                >
                    <BS.Nav.Link href={'/groups'}>
                        <Icon.People className='header-icon' />
                    </BS.Nav.Link>
                </BS.OverlayTrigger>
                <BS.OverlayTrigger
                    key='bottom'
                    placement='bottom'
                    overlay={
                        <BS.Tooltip id={`tooltip-notifs`}>
                            Notifications
                        </BS.Tooltip>
                    }
                >
                    <BS.Nav.Link href={'#'}>
                        <Icon.Bell className='header-icon' />
                    </BS.Nav.Link>
                </BS.OverlayTrigger>
                <BS.OverlayTrigger
                    key='bottom'
                    placement='bottom'
                    overlay={
                        <BS.Tooltip id={`tooltip-notifs`}>
                            Log Out
                        </BS.Tooltip>
                    }
                >
                    <BS.Nav.Link href={'#'}>
                        <Icon.Power className='header-icon' />
                    </BS.Nav.Link>
                </BS.OverlayTrigger>
            </BS.Nav>
        </BS.Navbar>
    )
}

export default NavBar