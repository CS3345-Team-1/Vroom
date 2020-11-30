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

const LOCAL_STORAGE_KEY_G = 'vroom.groups'


const Groups = (props) => {

    const [groups, setGroups] = useState([
        new Group(1111, 'Study Group',
    [
                new User('1', 'test1@email.com', 'Bob', 'Test', [], []),
                new User('2', 'test2@email.com', 'Alice', 'Test', [], []),
                new User('3', 'test3@email.com', 'Steve', 'Test', [], []),
                new User('4', 'test4@email.com', 'Jane', 'Test', [], []),
                new User('5', 'test5@email.com', 'John', 'Test', [], [])
            ]
        ),
        new Group(1112, 'Study Group 2',
            [
                new User('6', 'test1@email.com', 'Bob2', 'Test', [], []),
                new User('7', 'test2@email.com', 'Alice2', 'Test', [], []),
                new User('8', 'test3@email.com', 'Steve2', 'Test', [], []),
                new User('9', 'test4@email.com', 'Jane2', 'Test', [], []),
            ]
        )
    ])

    const tabRef = useRef()

    // useEffect(() => {
    //     const storedGroups = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_G))
    //     if (storedGroups) setGroups(storedGroups)
    // }, [])
    //
    // useEffect(() => {
    //     localStorage.setItem(LOCAL_STORAGE_KEY_G, JSON.stringify(groups))
    // }, [groups])

    // REMOVES A DELETED GROUP FROM LIST
    const handleDelete = (id) => {
        const newGroups = [...groups]
        setGroups(newGroups.filter(group => group.id !== id))
    }

    const GroupList = (props) => {
        return (
            <BS.Col sm={4}>
                <NewGroupInterface setGroups={(i) => setGroups(i)} tabRef={tabRef} />
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
        return (
            <BS.Toast className={'meeting-toast'}>
                <BS.Toast.Header closeButton={false}>
                    <Icon.PeopleFill />
                    &nbsp;Group Members
                    <div className={'ml-auto'}>
                        <NewGroupMemberInterface group={props.group} setMembers={(i) => setMembers(i)} />
                        <BS.OverlayTrigger
                            trigger='hover'
                            placement='top'
                            overlay={
                                <BS.Tooltip id={`tooltip-top`}>
                                    Delete Group
                                </BS.Tooltip>
                            }
                        >
                            <BS.Button as={BS.Badge}
                                variant={'outline-danger'}
                                className={'shadow-none'}
                                size={'sm'}
                                pill
                            >
                                <Icon.X/>
                            </BS.Button>
                        </BS.OverlayTrigger>
                    </div>
                </BS.Toast.Header>
                <BS.Toast.Body>
                    <div className={'group-body'}>
                        <div>
                            {members.length > 0 ?
                                members.map((member) =>
                                    <div>
                                        <GroupMember member={member} group={props.group} setGroups={(i) => setGroups(i)} />
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
                        <BS.Tab.Pane eventKey={'#' + group.id}>
                            <GroupDetail group={group} />
                        </BS.Tab.Pane>
                    )
                }
            </>
        )
    }

    return (
        <div id='content'>
            <BS.Card>
                <NavBar />
                <BS.Card.Body>
                    <div id='groups-header'>
                        <h4 id='meeting-list-header'>Contact Groups</h4>
                    </div>

                    <BS.Tab.Container id="list-group-tabs-example" defaultActiveKey="#1" ref={tabRef}>
                        <BS.Row>
                            <GroupList />
                            <BS.Tab.Content className={'group-content'}>
                                <BS.Tab.Pane eventKey={'#1'}>
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
