import React from 'react'

import * as BS from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import CopiedBadge from './copiedBadge'
import {Api} from '../api/api'


const GroupMember = (props) => {
    const api = new Api()

    const [copyAlert, setCopyAlert] = React.useState(false)


    // REMOVE PARTICIPANT HANDLER
    const handleRemove = () => {
        // // FILTER PARTICIPANT OUT OF THE PARTICIPANTS LIST
        // const filtered = props.group.members.filter((member) => {
        //     return member.id !== props.member.id
        // })
        //
        // // UPDATE MEETING PARTICIPANTS AND MEETING STATE
        // props.group.members = filtered
        // props.setGroups(groups => { return [...groups] })

        api.removeGroupMember(props.member.id).then(x => props.updateGroups())
    }

    return(
        <>
            {/* DISPLAY GROUP MEMBER */}
            <BS.Badge variant={'dark'} className={'participant-label'} pill>{props.member.first + ' ' + props.member.last}</BS.Badge>



            <BS.OverlayTrigger
                trigger='hover'
                placement='top'
                overlay={
                    <BS.Tooltip id={`tooltip-top`}>
                        Click to Copy
                    </BS.Tooltip>
                }
            >
                <CopyToClipboard text={props.member.email} onCopy={() => setCopyAlert(!copyAlert)}>
                    <BS.Button as={BS.Badge} variant={'outline-primary'} pill className={'shadow-none'}>{props.member.email}</BS.Button>
                </CopyToClipboard>
            </BS.OverlayTrigger>


            <BS.OverlayTrigger
                trigger='hover'
                placement='right'
                overlay={
                    <BS.Tooltip id={`tooltip-right`}>
                        Click to Remove
                    </BS.Tooltip>
                }
            >
                <BS.Button variant='link' size='sm' onClick={handleRemove}>
                    <Icon.PersonX/>
                </BS.Button>
            </BS.OverlayTrigger>

            <CopiedBadge copyAlert={copyAlert} setCopyAlert={(i) => setCopyAlert(i)} />
        </>
    )
}

export default GroupMember
