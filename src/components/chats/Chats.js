import React, {useState, useEffect} from 'react'
import './Chats.css'
import { Avatar } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import Chat from '../chat/Chat'
import { db } from '../../firebase'
import {selectUser} from '../../features/appSlice'
import {auth} from '../../firebase'
import { useSelector } from 'react-redux'


function Chats() {

    const [posts, setPosts]=useState([]);
    const user = useSelector(selectUser)

    useEffect(()=>{
        db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot=>
            setPosts(snapshot.docs.map(doc=>({
                id: doc.id,
                data: doc.data()
            })))
        )
    },[])

    console.log(posts)

    return (
        <div className='chats'>
            <div className='chats__header'>
                <Avatar src={user.profilePic} onClick={()=>auth.signOut()} className='chats__avatar'/>
                <div className='chats__search'>
                    <SearchIcon />
                    <input placeholder="Friends" type="text"/>
                </div>
                <ChatBubbleIcon />
            </div>
            <div className='chats__posts'>
                {posts.map(post=>(
                    <Chat
                        key={post.id}
                        id={post.id}
                        username={post.data.username}
                        timestamp={post.data.timestamp}
                        imageUrl={post.data.imageUrl}
                        read={post.data.read}
                        profilePic={post.data.profilePic}
                    />
                ))}
            </div>
        </div>
    )
}

export default Chats
