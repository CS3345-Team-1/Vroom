import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'

import * as BS from 'react-bootstrap'
import { Api } from '../api/api'

const LOCAL_STORAGE_KEY_USER = 'vroom.authenticatedUser'

const SignOn = (props) => {

    const api = new Api()

    const [invalid, setInvalid] = useState(false)
    const [user, setUser] = useState()
    const history = useHistory()

    const emailRef = useRef()
    const passRef = useRef()

    useEffect(() => {
        const authUser = localStorage.getItem(LOCAL_STORAGE_KEY_USER)
        if (authUser && authUser !== 'undefined') {
            history.push('/home')
        }
    }, [])

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY_USER, JSON.stringify(user))
    }, [user])

    const handleSignOn = () => {
        const email = emailRef.current.value
        const password = passRef.current.value
        api.authenticate(email, password).then(x => {
            if (x === -1)
                setInvalid(true)
            else {
                setInvalid(false)
                setUser({userid: x})
                history.push('/home')
            }
        })

    }

    return (
        <div id='sign-on' class="p-3 mb-2 bg-primary text-white">
            <h1 className='sign-on-logo'>vroom!</h1>
            <div id='sign-on-form'>
                <BS.Card>
                    <BS.Card.Body>
                        {invalid ? <BS.Alert variant='danger'>Invalid E-mail or Password</BS.Alert> : null}
                        <BS.Form>
                            <BS.Form.Group controlId="formBasicEmail">
                                <BS.Form.Control type="email" placeholder="E-mail" ref={emailRef} />
                            </BS.Form.Group>

                            <BS.Form.Group controlId="formBasicPassword">
                                <BS.Form.Control type="password" placeholder="Password" ref={passRef} />
                            </BS.Form.Group>
                            <BS.Button variant="success" onClick={handleSignOn} block>
                                Sign In
                            </BS.Button>
                        </BS.Form>
                    </BS.Card.Body>
                </BS.Card>
            </div>
        </div>
    )
}

export default SignOn
