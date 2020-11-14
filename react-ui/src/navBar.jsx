import React from 'react'

import * as BS from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'


const NavBar = (props) => {
    return (
        <BS.Navbar as={BS.Card.Header} bg='primary' variant='dark'>
            <BS.Navbar.Brand id='logo' as='BS.Button' variant='outline' size='lg'>
                vroom!
            </BS.Navbar.Brand>
            <BS.Navbar.Brand id='page-title' as='BS.Button' variant='outline' size='lg' className='ml-auto'>
                Schedule for Randolph Rankin
            </BS.Navbar.Brand>
            <BS.Navbar.Brand id='tagline' as='BS.Button' variant='outline' size='lg' className='ml-auto'>
                <Icon.Calendar3 className='header-icon' />
                <Icon.People className='header-icon' />
                <Icon.Bell className='header-icon' />
            </BS.Navbar.Brand>
        </BS.Navbar>
    )
}

export default NavBar
