import React from 'react'
import './Chat.css'
import { Avatar } from '@material-ui/core'
import StopRoundedIcon from '@material-ui/icons/StopRounded';
import ReactTimeago from 'react-timeago';


function Chat({id, username, timestamp, read, imageUrl, profilePic}) {
    console.log(timestamp)
    return (
        <div className='chat'>
            <Avatar className='chat__avatar' src={profilePic} />
            <div className='chat__info'>
                <h4>{username}</h4>
                <p>Tap to view - <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()}/></p>
            </div>
            {!read && <StopRoundedIcon className='chat__readIcon' />}
        </div>
    )
}

export default Chat

