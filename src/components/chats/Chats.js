import React, {useState, useEffect} from 'react'
import './Chats.css'
import { Avatar } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import Chat from '../chat/Chat'
import { db } from '../../firebase'
import {selectUser} from '../../features/appSlice'
import {auth} from '../../firebase'
import { useDispatch, useSelector } from 'react-redux'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { useHistory } from 'react-router-dom';
import { resetCameraImage } from '../../features/cameraSlice';


function Chats() {

    const [posts, setPosts]=useState([]);
    const user = useSelector(selectUser);
    const dispatch=useDispatch();
    const history=useHistory();

    useEffect(()=>{
        db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot=>
            setPosts(snapshot.docs.map(doc=>({
                id: doc.id,
                data: doc.data()
            })))
        )
    },[])

    console.log(posts)

    const takeSnap = ()=>{
        dispatch(resetCameraImage());
        history.push('/')
    }

    return (
        <div className='chats'>
            <div className='chats__header'>
                <Avatar src={user.profilePic} onClick={()=>auth.signOut()} className='chats__avatar'/>
                <div className='chats__search'>
                    <SearchIcon className='chats__searchIcon' />
                    <input placeholder="Friends" type="text"/>
                </div>
                <ChatBubbleIcon className='chats_chatIcon' />
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
            <RadioButtonUncheckedIcon
                className='chats__takePicIcon'
                onClick={takeSnap}
                fontSize='large'
            />
        </div>
    )
}

export default Chats
