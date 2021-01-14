import React, { useEffect } from 'react';
import Preview from './components/preview/Preview'
import Chats from './components/chats/Chats'
import ChatView from './components/chat-view/ChatView'
import Login from './components/login/Login'
import './App.css';
import WebcamCapture from './components/webcam-capture/WebcamCapture'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {auth} from './firebase'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser, login, logout } from './features/appSlice';

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(()=>{
    const unsubscribe=auth.onAuthStateChanged((authUser)=>{
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
    return()=>{
      unsubscribe();
    }
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
                <Route path="/webcam">
                  <WebcamCapture />
                </Route>
                <Route path="/preview">
                  <Preview />
                </Route>
                <Route exact path="/">
                  <Chats />
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
