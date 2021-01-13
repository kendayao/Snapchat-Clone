import React, { useEffect } from 'react';
import './App.css';
import WebcamCapture from './components/webcam-capture/WebcamCapture'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Preview from './components/preview/Preview'
import Chats from './components/chats/Chats'
import ChatView from './components/chat-view/ChatView'
import { selectUser, login, logout } from './features/appSlice';
import { useSelector, useDispatch } from 'react-redux'
import Login from './components/login/Login'
import {auth} from './firebase'

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      console.log(authUser)
      if(authUser){
        dispatch(login({
            username: authUser.displayName,
            profilePic: authUser.photoURL,
            id: authUser.uid
        }))
      }else{
        dispatch(logout())
      }
    })
  }, [])

  return (
    <div className="app">
      <Router>
        {!user ? (<Login />):
        <>
          <img className='app__logo' src='https://lakeridgenewsonline.com/wp-content/uploads/2020/04/snapchat.jpg' alt='snapchat logo'/>
          <div className='app__body'>
            <div className='app__bodyBackground'>
              <Switch>
                <Route path="/chats/view">
                  <ChatView />
                </Route>
                <Route path="/chats">
                  <Chats />
                </Route>
                <Route path="/preview">
                  <Preview />
                </Route>
                <Route exact path="/">
                  <WebcamCapture />
                </Route>
              </Switch>
            </div>
          </div>
        </>
        }
      </Router>
    </div>
  );
}

export default App;
