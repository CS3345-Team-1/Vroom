import React, {useRef, useEffect, useState} from 'react'

import Datetime from 'react-datetime'
import moment from 'moment'
import * as BS from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'
import {v4 as uuidv4} from 'uuid'
import virtual from '../img/virtual.svg'
import physical from '../img/physical.svg'
import { Formik } from 'formik'
import * as yup from 'yup'
import {Meeting} from '../models/meeting'


const NewMeetingInterface = (props) => {

    // STATE LISTENER
    const [modalShow, setModalShow] = useState(false)
    const [isZoom, setIsZoom] = useState(null)

    // FORM TRACKING REFS
    const titleRef = useRef()
    const dateRef = useRef()
    const startTimeRef = useRef()
    const endTimeRef = useRef()
    const idRef = useRef()
    const passcodeRef = useRef()
    const locationRef = useRef()
    const openRef = useRef()
    const maxRef = useRef()

    // MODAL HANDLERS
    const handleClose = () => {
        setModalShow(false)
        setIsZoom(null)
    }
    const handleShow = () => setModalShow(true)

    // NEW MEETING HANDLER
    const handleAddMeeting = () => {
        // GET FORM FIELD VALUES
        const title = titleRef.current.value
        const date = dateRef.current.state.inputValue
        const startTime = startTimeRef.current.state.inputValue
        const endTime = endTimeRef.current.state.inputValue
        const isOpen = openRef.current.value
        const maxParticipants = maxRef.current.value


        const newMeeting = new Meeting()

        if (isZoom === true) {
            const id = idRef.current.value
            const passcode = passcodeRef.current.value !== '' ? passcodeRef.current.value : 'None'
            newMeeting.createOnline(uuidv4(), title, date, startTime, endTime, id, passcode, isOpen, maxParticipants)
        }
        else {
            const location = locationRef.current.value
            newMeeting.createInPerson(uuidv4(), title, date, startTime, endTime, location, isOpen, maxParticipants)
        }

        props.setMeetings(prevMeetings => {
            return [...prevMeetings, newMeeting]
        })

        // // ADD NEW MEETING
        // props.setMeetings(prevTodos => {
        //     return [...prevTodos, {
        //         id: uuidv4(),
        //         title: title,
        //         date: date,
        //         startTime: startTime,
        //         endTime: endTime,
        //         meetingID: id,
        //         passcode: passcode,
        //         participants: [],
        //         notes: []
        //     }]
        // })

        // NAVIGATE CALENDAR TO NEW MEETING DATE
        props.mainCal.current.state.selectedDate = dateRef.current.state.selectedDate
        props.setCurrentDate(dateRef.current.state.viewDate)

        // EXIT THE MODAL
        handleClose()
    }

    const FormSlideOne = (props) => {

        const handleVirtual = () => {
            if (isZoom !== true)
                setIsZoom(true)
            else
                props.carouselRef.current.next()
        }

        const handlePhysical = () => {
            if (isZoom !== false)
                setIsZoom(false)
            else
                props.carouselRef.current.next()
        }

        useEffect(() => {
            if (isZoom !== null)
                props.carouselRef.current.next()
        },[isZoom])

        return (
                <BS.Card>
                    <BS.Card.Header>
                        How are you hosting your meeting?
                    </BS.Card.Header>
                    <BS.Card.Body>
                        <BS.CardDeck>
                            <BS.Button variant='outline-primary' as={BS.Card} onClick={handleVirtual} onCl>
                                <BS.Card.Img variant='top' src={virtual} />
                                <BS.Card.Body>
                                    <BS.Card.Text>
                                        I'm hosting my meeting on Zoom.
                                    </BS.Card.Text>
                                </BS.Card.Body>
                            </BS.Button>
                            <BS.Button variant='outline-primary' as={BS.Card} onClick={handlePhysical}>
                                <BS.Card.Img variant='top' src={physical} />
                                <BS.Card.Body>
                                    <BS.Card.Text>
                                        I'm hosting my meeting in person.
                                    </BS.Card.Text>
                                </BS.Card.Body>
                            </BS.Button>
                        </BS.CardDeck>
                    </BS.Card.Body>
                </BS.Card>
        )
    }

    const FormSlideTwo = (props) => {
        const [validated, setValidated] = useState(false)
        const formRef = useRef()

        const handleSubmit = () => {
            setValidated(true);
            if (formRef.current.checkValidity() === true)
                props.carouselRef.current.next()
        }

        return (
            <BS.Card>
                <BS.Card.Header>
                    Meeting Details
                </BS.Card.Header>
                <BS.Card.Body>

                    <BS.Form noValidate validated={validated} ref={formRef}>

                        {/* MEETING TITLE */}
                        <BS.Form.Group controlId='validationMeetingTitle'>
                            <BS.Form.Label>Meeting Title</BS.Form.Label>
                            <BS.Form.Control
                                required
                                ref={titleRef}
                                type='text'
                                autocomplete='off'
                            />
                            <BS.Form.Control.Feedback type='invalid'>
                                Please give your meeting a title.
                            </BS.Form.Control.Feedback>
                        </BS.Form.Group>

                        <BS.Form.Row>

                            {/* MEETING DATE */}
                            <BS.Form.Group as={BS.Col} md='4' controlId='validationDate'>
                                <BS.Form.Label>Meeting Date</BS.Form.Label>
                                <Datetime
                                    ref={dateRef}
                                    inputProps={{required: true}}
                                    timeFormat={false}
                                    closeOnSelect={true}
                                    initialValue={props.currentDate}
                                    isValidDate={day => day.isAfter(moment().subtract( 1, 'day' ))}
                                />
                            </BS.Form.Group>

                            {/* MEETING START TIME */}
                            <BS.Form.Group as={BS.Col} md='4' controlId='validationStartTime'>
                                <BS.Form.Label>Start Time</BS.Form.Label>
                                <Datetime
                                    ref={startTimeRef}
                                    inputProps={{required: true}}
                                    dateFormat={false}
                                />
                            </BS.Form.Group>

                            {/* MEETING END TIME */}
                            <BS.Form.Group as={BS.Col} md='4' controlId='validationEndTime'>
                                <BS.Form.Label>End Time</BS.Form.Label>
                                <Datetime
                                    inputProps={{required: true}}
                                    ref={endTimeRef}
                                    dateFormat={false}
                                />
                            </BS.Form.Group>
                        </BS.Form.Row>
                        <div className='form-buttons'>
                            <BS.Button onClick={() => props.carouselRef.current.prev()} variant='secondary'>Back</BS.Button>
                            <BS.Button onClick={handleSubmit}>Next</BS.Button>
                        </div>
                    </BS.Form>

                </BS.Card.Body>
            </BS.Card>
        )
    }

    const FormSlideThree = (props) => {
        const [validated, setValidated] = useState(false)
        const formRef = useRef()

        const handleSubmit = () => {
            setValidated(true);
            if (formRef.current.checkValidity() === true)
                props.carouselRef.current.next()
        }
        if (isZoom) {
            return (
                <BS.Card>
                    <BS.Card.Header>
                        Zoom Information
                    </BS.Card.Header>
                    <BS.Card.Body>

                        <BS.Form noValidate validated={validated} ref={formRef}>

                            {/* ZOOM MEETING ID */}
                            <BS.Form.Group controlId='validationMeetingTitle'>
                                <BS.Form.Label>Zoom Meeting ID</BS.Form.Label>
                                <BS.Form.Control
                                    required
                                    ref={idRef}
                                    type='text'
                                    autocomplete='off'
                                />
                                <BS.Form.Control.Feedback type='invalid'>
                                    Please specify a Meeting ID.
                                </BS.Form.Control.Feedback>
                            </BS.Form.Group>

                            {/* ZOOM PASSCODE */}
                            <BS.Form.Group controlId='validationMeetingTitle'>
                                <BS.Form.Label>Zoom Meeting Passcode</BS.Form.Label>
                                <BS.Form.Control
                                    ref={passcodeRef}
                                    type='text'
                                    autocomplete='off'
                                />
                                <BS.Form.Text className='text-muted'>
                                    if applicable
                                </BS.Form.Text>
                            </BS.Form.Group>

                            <div className='form-buttons'>
                                <BS.Button onClick={() => props.carouselRef.current.prev()}
                                           variant='secondary'>Back</BS.Button>
                                <BS.Button onClick={handleSubmit}>Next</BS.Button>
                            </div>
                        </BS.Form>

                    </BS.Card.Body>
                </BS.Card>
            )
        }
        else return (
            <BS.Card>
                <BS.Card.Header>
                    Meeting Location
                </BS.Card.Header>
                <BS.Card.Body>

                    <BS.Form noValidate validated={validated} ref={formRef}>

                        {/* PHYSICAL LOCATION */}
                        <BS.Form.Group controlId='validationMeetingTitle'>
                            <BS.Form.Label>Location</BS.Form.Label>
                            <BS.Form.Control
                                required
                                ref={locationRef}
                                type='text'
                                autocomplete='off'
                            />
                            <BS.Form.Control.Feedback type='invalid'>
                                Please specify your meeting location.
                            </BS.Form.Control.Feedback>
                        </BS.Form.Group>

                        <div className='form-buttons'>
                            <BS.Button onClick={() => props.carouselRef.current.prev()}
                                       variant='secondary'>Back</BS.Button>
                            <BS.Button onClick={handleSubmit}>Next</BS.Button>
                        </div>
                    </BS.Form>

                </BS.Card.Body>
            </BS.Card>
        )
    }

    const FormSlideFour = (props) => {
        const [validated, setValidated] = useState(false)
        const [maxDisabled, setMaxDisabled] = useState(true)
        const formRef = useRef()

        return (
            <BS.Card>
                <BS.Card.Header>
                    Additional Options
                </BS.Card.Header>
                <BS.Card.Body>

                    <BS.Form ref={formRef}>
                        <BS.Form.Row>
                            {/* MEETING TITLE */}
                            <BS.Form.Group as={BS.Col} controlId='validationMeetingTitle'>
                                {/*<BS.Form.Label>Participants</BS.Form.Label>*/}
                                <BS.Form.Check
                                    ref={openRef}
                                    id='open-meeting'
                                    type='switch'
                                    label='This is an open meeting.'
                                    onChange={() => setMaxDisabled(!maxDisabled)}
                                />
                                {console.log(openRef.current)}
                                <BS.Form.Text className='text-muted'>
                                    Open meetings allow other users to join as participants.
                                </BS.Form.Text>
                            </BS.Form.Group>

                            <BS.Form.Group as={BS.Col} controlId='validationMeetingTitle'>
                                <BS.Form.Label>Maximum participants</BS.Form.Label>
                                <BS.Form.Control
                                    ref={maxRef}
                                    id='max-participants'
                                    type='text'
                                    autocomplete='off'
                                    disabled={maxDisabled}
                                    value={maxDisabled ? '' : undefined}
                                />
                                <BS.Form.Text className='text-muted'>
                                    Leave blank for no maximum
                                </BS.Form.Text>
                            </BS.Form.Group>
                        </BS.Form.Row>

                        <div className='form-buttons'>
                            <BS.Button onClick={() => props.carouselRef.current.prev()} variant='secondary'>Back</BS.Button>
                            <BS.Button onClick={handleAddMeeting} variant={'success'}>Create Meeting</BS.Button>
                        </div>
                    </BS.Form>

                </BS.Card.Body>
            </BS.Card>
        )
    }

    const FormCarousel = () => {
        const carouselRef = useRef(null);

        useEffect(() => {
            console.log('access carouselNode', carouselRef.current)
        })

        return <BS.Carousel
            interval={null}
            wrap={false}
            controls={false}
            indicators={false}
            keyboard={false}
            ref={carouselRef}
        >

            <BS.Carousel.Item>
                <FormSlideOne carouselRef={carouselRef} />
            </BS.Carousel.Item>

            <BS.Carousel.Item>
                <FormSlideTwo carouselRef={carouselRef} />
            </BS.Carousel.Item>


            <BS.Carousel.Item>
                <FormSlideThree carouselRef={carouselRef} />
            </BS.Carousel.Item>

            <BS.Carousel.Item>
                <FormSlideFour carouselRef={carouselRef} />
            </BS.Carousel.Item>
        </BS.Carousel>

    }

    return (
        <>
            {/* BUTTON TO TOGGLE DISPLAY MODAL */}
            <BS.Button variant='primary' onClick={handleShow} block>New Meeting</BS.Button>

            {/* START DISPLAY MODAL */}
            <BS.Modal
                show={modalShow}
                onHide={handleClose}
                size='lg'
                aria-labelledby='contained-modal-title-vcenter'
                backdrop="static"
                centered
            >

                <BS.Modal.Header closeButton>
                    <BS.Modal.Title id='contained-modal-title-vcenter'>
                        Schedule a New Meeting
                    </BS.Modal.Title>
                </BS.Modal.Header>

                <BS.Modal.Body>

                    <FormCarousel />

                </BS.Modal.Body>
            </BS.Modal>
        </>
      //   <>
      //       {/* BUTTON TO TOGGLE DISPLAY MODAL */}
      //       <BS.Button variant='primary' onClick={handleShow} block>New Meeting</BS.Button>
      //
      //       {/* START DISPLAY MODAL */}
      //       <BS.Modal
      //           show={modalShow}
      //           onHide={handleClose}
      //           size='lg'
      //           aria-labelledby='contained-modal-title-vcenter'
      //           centered
      //       >
      //
      //           <BS.Modal.Header>
      //               <BS.Modal.Title id='contained-modal-title-vcenter'>
      //                   Schedule a New Meeting
      //               </BS.Modal.Title>
      //           </BS.Modal.Header>
      //
      //           <BS.Modal.Body>
      //
      //               <BS.Tabs defaultActiveKey="zoom-meeting" id="form-selector">
      //                   <BS.Tab eventKey="zoom-meeting" title="Schedule A Virtual Meeting">
      //
      //                       <BS.Form>
      //
      //                           {/* MEETING TITLE */}
      //                           <BS.Form.Group controlId='text'>
      //                               <BS.Form.Label>Meeting Title</BS.Form.Label>
      //                               <BS.Form.Control
      //                                   ref={titleRef}
      //                                   type='text'
      //                                   placeholder='My Awesome Zoom Meeting'
      //                                   autocomplete='off'
      //                               />
      //                           </BS.Form.Group>
      //
      //                           {/* MEETING DATE */}
      //                           <BS.Form.Group controlId='datetime'>
      //                               <BS.Form.Label>Meeting Date</BS.Form.Label>
      //                               <Datetime
      //                                   ref={dateRef}
      //                                   timeFormat={false}
      //                                   closeOnSelect={true}
      //                                   initialValue={props.currentDate}
      //                                   isValidDate={day => day.isAfter(moment().subtract( 1, 'day' ))}/>
      //                           </BS.Form.Group>
      //
      //                           {/* MEETING START TIME */}
      //                           <BS.Form.Group controlId='datetime'>
      //                               <BS.Form.Label>Start Time</BS.Form.Label>
      //                               <Datetime ref={startTimeRef} dateFormat={false} />
      //                           </BS.Form.Group>
      //
      //                           {/* MEETING END TIME */}
      //                           <BS.Form.Group controlId='datetime'>
      //                               <BS.Form.Label>End Time</BS.Form.Label>
      //                               <Datetime ref={endTimeRef} dateFormat={false} />
      //                           </BS.Form.Group>
      //
      //                           {/* MEETING ZOOM ID */}
      //                           <BS.Form.Group controlId='text'>
      //                               <BS.Form.Label>Zoom Meeting ID</BS.Form.Label>
      //                               <BS.Form.Control
      //                                   ref={idRef}
      //                                   type='text'
      //                                   placeholder='012 3456 7890'
      //                                   autocomplete='off'
      //                               />
      //                           </BS.Form.Group>
      //
      //                           {/* MEETING PASSCODE */}
      //                           <BS.Form.Group controlId='text'>
      //                               <BS.Form.Label>Zoom Meeting Passcode</BS.Form.Label>
      //                               <BS.Form.Control
      //                                   ref={passcodeRef}
      //                                   type='text'
      //                                   placeholder='S3cr3t-M33ting'
      //                                   autocomplete='off'
      //                               />
      //                               <BS.Form.Text className='text-muted'>
      //                                   if applicable
      //                               </BS.Form.Text>
      //                           </BS.Form.Group>
      //
      //                       </BS.Form>
      //
      //                   </BS.Tab>
      //                   <BS.Tab eventKey="physical-meeting" title="Schedule A Physical Meeting">
      //                       Physical Meeting
      //                   </BS.Tab>
      //               </BS.Tabs>
      //
      //
      //
      //           </BS.Modal.Body>
      //
      //           {/* ACTION BUTTONS */}
      //           <BS.Modal.Footer>
      //               <BS.Button variant='primary' onClick={handleAddMeeting}>Add Meeting</BS.Button>
      //               <BS.Button variant='danger' onClick={handleClose}>Cancel</BS.Button>
      //       </BS.Modal.Footer>
      //   </BS.Modal>
      // </>
    )
}

export default NewMeetingInterface
