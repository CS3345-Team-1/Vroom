import React, {useRef} from 'react'
import * as BS from 'react-bootstrap'
import Datetime from 'react-datetime'
import NewMeetingInterface from './newMeetingInterface'


const HomeCalendar = (props) => {
    const allMeetings = props.meetings
    const dateRef = useRef()

    const formatDay = (props, thisDate, selectedDate) => {
        const filtered = allMeetings.filter(meeting => {
            return meeting.date === thisDate.format('M/D/YYYY')
        })

        if (validDates(thisDate)) return (
            <BS.OverlayTrigger
                trigger='hover'
                placement='top'
                overlay={
                    <BS.Tooltip id={'tooltip-top'}>
                        {filtered.length}
                    </BS.Tooltip>
                }
            >
                <td {...props}>
                    {thisDate.date()}
                </td>
            </BS.OverlayTrigger>
        )
        return <td {...props}>{thisDate.date()}</td>
    }

    // RETURNS DAYS ON WHICH MEETINGS ARE SCHEDULED
    const validDates = (current) => {
        const filtered = props.meetings.filter(meeting => {
            return meeting.date === current.format('M/D/YYYY')  && !meeting.isCancelled
        })

        return filtered.length > 0
    }

    return (
        <BS.Toast id='calendar-toast'>
            <BS.ToastBody id='calendar-toast-body'>
                <Datetime ref={dateRef}
                          input={false}
                          timeFormat={false}
                          isValidDate={validDates}
                          initialValue={props.currentDate}
                          onChange={date => props.setCurrentDate(date)}
                          renderDay={formatDay}
                />
                <NewMeetingInterface updateMeetings={props.updateMeetings} setMeetings={(i) => props.setMeetings(i)} currentDate={props.currentDate} setCurrentDate={(i) => props.setCurrentDate(i)} mainCal={dateRef}/>
            </BS.ToastBody>
        </BS.Toast>
    )
}

export default HomeCalendar
