import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'

import * as BS from 'react-bootstrap'
import { Api } from '../api/api'
import { v4 as uuidv4 } from 'uuid'

import { LOCAL_STORAGE_KEY } from '../config'
import {User} from '../models/user'


const SignOn = (props) => {

    const api = new Api()

    const [invalid, setInvalid] = useState(false)
    const [user, setUser] = useState(localStorage.getItem(LOCAL_STORAGE_KEY))
    const history = useHistory()

    const emailRef = useRef()
    const passRef = useRef()

    const newEmailRef = useRef()
    const newPasswordRef = useRef()
    const newFirstNameRef = useRef()
    const newLastNameRef = useRef()


    const carouselRef = useRef()

    useEffect(() => {
        const authUser = localStorage.getItem(LOCAL_STORAGE_KEY)
        console.log(authUser)
        if (authUser && authUser !== 'null' && authUser !== 'undefined')
            history.push('/home')
    }, [])

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, user)
    }, [user])


    const handleSignOn = () => {
        const email = emailRef.current.value
        const password = passRef.current.value

        console.log(email + ", " + password)

        api.authenticate(email, password).then(x => {
            if (x === -1)
                setInvalid(true)
            else {
                setInvalid(false)
                setUser(x)
                history.push('/home')
            }
        })

    }

    const handleSignUp = () => {
        const userID = uuidv4()
        const first = newFirstNameRef.current.value
        const last = newLastNameRef.current.value
        const email = newEmailRef.current.value
        const password = newPasswordRef.current.value

        console.log('IN THE REACT FUNC')

        console.log(userID + '\n' + email + '\n' + password + '\n' + first + '\n' + last)


        api.register(userID,email,password,first,last).then(x => {
            setUser(userID)
            history.push('/home')
        })
    }

    return (
        <div id='sign-on' class="p-3 mb-2 bg-primary text-white">
            <h1 className='sign-on-logo'>vroom!</h1>
            <BS.Carousel
                interval={null}
                wrap={false}
                controls={false}
                indicators={false}
                keyboard={false}
                fade={true}
                ref={carouselRef}
            >
                <BS.Carousel.Item>
                    <div className='sign-on-carousel'>
                        <h4>Sign In</h4>
                        <BS.Card className='sign-on-form'>
                            <BS.Card.Body>
                                {invalid ? <BS.Alert variant='danger'>Invalid E-mail or Password</BS.Alert> : null}
                                <BS.Form>
                                    <BS.Form.Group controlId="formBasicEmail">
                                        <BS.Form.Control type="email" placeholder="E-mail" ref={emailRef} />
                                    </BS.Form.Group>

                                    <BS.Form.Group controlId="formBasicPassword">
                                        <BS.Form.Control type="password" placeholder="Password" ref={passRef} />
                                    </BS.Form.Group>
                                    <BS.Button variant="success" onClick={handleSignOn} type='button' block>
                                        Go!
                                    </BS.Button>
                                </BS.Form>
                            </BS.Card.Body>
                        </BS.Card>
                        <BS.Button variant='outline-light' className='mt-5' size='sm' onClick={() => carouselRef.current.next()}>
                            New Account
                        </BS.Button>
                    </div>
                </BS.Carousel.Item>
                <BS.Carousel.Item>
                    <div className='sign-on-carousel'>
                        <h4>Sign Up</h4>
                        <BS.Card className='sign-on-form'>
                            <BS.Card.Body>
                                {invalid ? <BS.Alert variant='danger'>Invalid E-mail or Password</BS.Alert> : null}
                                <BS.Form>
                                    <BS.Row>
                                        <BS.Col>
                                            <BS.Form.Group controlId="formBasicFirstName">
                                                <BS.Form.Control type="test" placeholder="First Name" ref={newFirstNameRef} />
                                            </BS.Form.Group>
                                        </BS.Col>
                                        <BS.Col>
                                            <BS.Form.Group controlId="formBasicLastName">
                                                <BS.Form.Control type="test" placeholder="Last Name" ref={newLastNameRef} />
                                            </BS.Form.Group>
                                        </BS.Col>
                                    </BS.Row>
                                    <BS.Form.Group controlId="formBasicEmail">
                                        <BS.Form.Control type="email" placeholder="E-mail" ref={newEmailRef} />
                                    </BS.Form.Group>
                                    <BS.Form.Group controlId="formBasicPassword">
                                        <BS.Form.Control type="password" placeholder="Password" ref={newPasswordRef} />
                                    </BS.Form.Group>
                                    <BS.Button variant="success" type='button' onClick={handleSignUp} block>
                                        Register
                                    </BS.Button>
                                </BS.Form>
                            </BS.Card.Body>
                        </BS.Card>
                        <BS.Button variant='outline-light' className='mt-5' size='sm' onClick={() => carouselRef.current.prev()}>
                            Existing Account
                        </BS.Button>
                    </div>
                </BS.Carousel.Item>
            </BS.Carousel>
        </div>
    )
}

export default SignOn
