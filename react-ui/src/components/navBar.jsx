import React, {useEffect, useState} from 'react'

import * as BS from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'
import { useHistory } from 'react-router-dom'

import { LOCAL_STORAGE_KEY } from '../config'
import UserSearchInterface from './userSearchInterface'

const NavBar = (props) => {
    // const { url } = useParams()

    const [homeActive, setHomeActive] = useState(false)
    const [groupsActive, setGroupsActive] = useState(false)

    const history = useHistory()

    useEffect(() => {
        switch (props.active) {
            case 'home':
                setGroupsActive(false)
                setHomeActive(true)
                break
            case 'groups':
                setGroupsActive(true)
                setHomeActive(false)
                break
            default:
                setHomeActive(false)
                setGroupsActive(false)
        }
    }, [])

    useEffect(() => {
        const authUser = localStorage.getItem(LOCAL_STORAGE_KEY)
        if (!authUser || authUser === 'undefined' || authUser === 'null')
            history.push('/')
    }, [])

    const handleLogout = () => {
        localStorage.removeItem(LOCAL_STORAGE_KEY)
        history.push('/')
    }

    return (
        <BS.Navbar as={BS.Card.Header} bg='primary' variant='dark'>
            {/*{ console.log(url) }*/}
            <BS.Navbar.Brand id='logo' href='/home' variant='outline' size='lg'>
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
                    <BS.Nav.Link href={'/home'} active={homeActive}>
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
                    <BS.Nav.Link href={'/groups'} active={groupsActive}>
                        <Icon.People className='header-icon' />
                    </BS.Nav.Link>
                </BS.OverlayTrigger>

                {/*<BS.OverlayTrigger*/}
                {/*    key='bottom'*/}
                {/*    placement='bottom'*/}
                {/*    overlay={*/}
                {/*        <BS.Tooltip id={`tooltip-groups`}>*/}
                {/*            Find User*/}
                {/*        </BS.Tooltip>*/}
                {/*    }*/}
                {/*>*/}
                {/*    <BS.Nav.Link href={'/groups'} active={groupsActive}>*/}
                {/*        <Icon.Search className='header-icon' />*/}
                {/*    </BS.Nav.Link>*/}
                {/*</BS.OverlayTrigger>*/}

                <UserSearchInterface />

                {/*<BS.OverlayTrigger*/}
                {/*    key='bottom'*/}
                {/*    placement='bottom'*/}
                {/*    overlay={*/}
                {/*        <BS.Tooltip id={`tooltip-notifs`}>*/}
                {/*            Notifications*/}
                {/*        </BS.Tooltip>*/}
                {/*    }*/}
                {/*>*/}
                {/*    <BS.Nav.Link href={'#'}>*/}
                {/*        <Icon.Bell className='header-icon' />*/}
                {/*    </BS.Nav.Link>*/}
                {/*</BS.OverlayTrigger>*/}
                <BS.OverlayTrigger
                    key='bottom'
                    placement='bottom'
                    overlay={
                        <BS.Tooltip id={`tooltip-notifs`}>
                            Log Out
                        </BS.Tooltip>
                    }
                >
                    <BS.Nav.Link onClick={handleLogout}>
                        <Icon.Power className='header-icon' />
                    </BS.Nav.Link>
                </BS.OverlayTrigger>
            </BS.Nav>
        </BS.Navbar>
    )
}

export default NavBar
