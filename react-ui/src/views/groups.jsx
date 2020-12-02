import HomeCalendar from '../components/homeCalendar'
import MeetingList from '../components/meetingList'
import * as BS from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'
import React, {useEffect, useRef, useState} from 'react'
import { Group } from '../models/group'
import Meeting from '../components/meeting'
import NewGroupInterface from '../components/newGroupInterface'
import NewGroupMemberInterface from '../components/newGroupMemberInterface'
import GroupMember from '../components/groupMember'
import {User} from '../models/user'
import NavBar from '../components/navBar'
import {Api} from '../api/api'
import {LOCAL_STORAGE_KEY} from '../config'
import { useHistory } from 'react-router-dom'


const LOCAL_STORAGE_KEY_G = 'vroom.groups'


const Groups = (props) => {
    const api = new Api()
    const history = useHistory()

    const [loaded, setLoaded] = useState(false)
    const [groups, setGroups] = useState()

    const [readGroups, setReadGroups] = useState()

    useEffect(() => {
        api.getGroups(localStorage.getItem(LOCAL_STORAGE_KEY)).then(x => setReadGroups(x))
    }, [])

    useEffect(() => {
        if (readGroups) {
            let parsedGroups = []
            readGroups.map(g => parsedGroups.push(new Group().parseDetail(g)))
            setGroups(parsedGroups)
        }
    }, [readGroups])

    useEffect(() => {
        if (groups)
            setLoaded(true)
    }, [groups])

    const tabRef = useRef()

    const updateGroups = () => {
        api.getGroups(localStorage.getItem(LOCAL_STORAGE_KEY)).then(x => setReadGroups(x))
    }

    // useEffect(() => {
    //     const storedGroups = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_G))
    //     if (storedGroups) setGroups(storedGroups)
    // }, [])
    //
    // useEffect(() => {
    //     localStorage.setItem(LOCAL_STORAGE_KEY_G, JSON.stringify(groups))
    // }, [groups])

    useEffect(() => {
        console.log(tabRef)
    }, [tabRef])

    const GroupList = (props) => {
        return (
            <BS.Col sm={4} className={'groups-list'}>
                <NewGroupInterface updateGroups={updateGroups} setGroups={(i) => setGroups(i)} tabRef={tabRef} />
                <BS.ListGroup as={BS.Toast} variant={'flush'} className={'group-tabs mb-3'}>
                    {groups.map((group) =>
                        <BS.ListGroup.Item action href={'#' + group.id}>
                            <div className={'groups-list-item'}>
                                <span>{group.name}</span>
                            </div>
                        </BS.ListGroup.Item>
                    )}
                </BS.ListGroup>
            </BS.Col>
        )
    }

    const GroupDetail = (props) => {
        const [members, setMembers] = useState(props.group.members)

        const handleDelete = () => {
            api.deleteGroup(props.group.id).then(x => updateGroups())
            history.push('/groups')
        }

        const DeleteButton = () => {
            const [show, setShow] = useState(false)
            const target = useRef(null)

            const popover = (
                <BS.Popover id='popover-basic'>
                    <BS.Popover.Title as='h3'>Delete Group?</BS.Popover.Title>
                    <BS.Popover.Content>
                        <BS.Button variant={'danger'} size={'sm'} onClick={handleDelete} block>
                            Yes, delete.
                        </BS.Button>
                        <BS.Button variant={'secondary'} size={'sm'} block>
                            Wait, nevermind.
                        </BS.Button>
                    </BS.Popover.Content>
                </BS.Popover>
            )

            return(
                // <BS.OverlayTrigger trigger='focus' placement='left' overlay={popover}>
                //     <BS.OverlayTrigger
                //         trigger='hover'
                //         placement='top'
                //         overlay={
                //             <BS.Tooltip id={`tooltip-top`}>
                //                 Delete Group
                //             </BS.Tooltip>
                //         }
                //     >
                //         <BS.Button as={BS.Badge}
                //                    // onClick={handleDelete}
                //                     ref={target}
                //                    variant={'outline-danger'}
                //                    className={'shadow-none'}
                //                    size={'sm'}
                //                    pill
                //         >
                //             <Icon.X/>
                //         </BS.Button>
                //     </BS.OverlayTrigger>
                // </BS.OverlayTrigger>
                <BS.OverlayTrigger
                    trigger='hover'
                    placement='top'
                    overlay={
                        <BS.Tooltip id={`tooltip-top`}>
                            Delete Group
                        </BS.Tooltip>
                    }
                >
                <BS.OverlayTrigger trigger='focus' placement='left' overlay={popover}>
                    <BS.Button ref={target} variant='link' size='sm' className={'shadow-none'}>
                        <Icon.XCircle />
                    </BS.Button>
                </BS.OverlayTrigger>
                </BS.OverlayTrigger>
            )
        }

        return (
            <BS.Toast className={'meeting-toast'}>
                <BS.Toast.Header closeButton={false}>
                    <Icon.PeopleFill />
                    &nbsp;Group Members
                    <div className={'ml-auto'}>
                        <NewGroupMemberInterface updateGroups={updateGroups} group={props.group} setMembers={(i) => setMembers(i)} />
                        {/*<BS.OverlayTrigger*/}
                        {/*    trigger='hover'*/}
                        {/*    placement='top'*/}
                        {/*    overlay={*/}
                        {/*        <BS.Tooltip id={`tooltip-top`}>*/}
                        {/*            Delete Group*/}
                        {/*        </BS.Tooltip>*/}
                        {/*    }*/}
                        {/*>*/}
                        {/*    <DeleteButton />*/}
                        {/*</BS.OverlayTrigger>*/}
                        <DeleteButton />

                    </div>
                </BS.Toast.Header>
                <BS.Toast.Body>
                    <div className={'group-body'}>
                        <div>
                            {members.length > 0 ?
                                members.map((member) =>
                                    <div>
                                        <GroupMember updateGroups={updateGroups} member={member} group={props.group} setGroups={(i) => setGroups(i)} />
                                    </div>
                                )
                                :
                                <>No members in this group yet.</>
                            }
                        </div>
                    </div>
                </BS.Toast.Body>
            </BS.Toast>
        )
    }

    const GroupTabs = (props) => {
        return (
            <>
                {
                    groups.map((group) =>
                        <BS.Tab.Pane eventKey={'#' + group.id}  className={'ml-3 mr-3'}>
                            <GroupDetail group={group} />
                        </BS.Tab.Pane>
                    )
                }
            </>
        )
    }

    if(!loaded) return <></>

    return (
        <div id='content'>
            <BS.Card>
                <NavBar active='groups' />
                <BS.Card.Body>
                    <div id='groups-header'>
                        <h4 id='meeting-list-header'>Contact Groups</h4>
                    </div>

                    <BS.Tab.Container id="list-group-tabs-example" defaultActiveKey="#1" ref={tabRef}>
                        <BS.Row>
                            <GroupList />
                            <BS.Tab.Content className={'group-content'}>
                                <BS.Tab.Pane eventKey={'#1'} className={'ml-3 mr-3'}>
                                    <BS.Toast className={'meeting-toast'}>
                                        <BS.Toast.Body>
                                            Select a group to see its members, or click <strong>New Group</strong>.
                                        </BS.Toast.Body>
                                    </BS.Toast>
                                </BS.Tab.Pane>
                                <GroupTabs />
                            </BS.Tab.Content>
                        </BS.Row>
                    </BS.Tab.Container>
                </BS.Card.Body>
            </BS.Card>
        </div>
    )
}

export default Groups
