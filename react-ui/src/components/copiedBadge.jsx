import React from 'react'

import * as BS from 'react-bootstrap'

const CopiedBadge = (props) => {
    return (
        <BS.Toast
            style={{display: 'inline'}}
            onClose={() => props.setCopyAlert(false)}
            show={props.copyAlert}
            delay={1000}
            autohide
            className='copied-alert'
        >
            Copied to Clipboard
        </BS.Toast>
    )
}

export default CopiedBadge
