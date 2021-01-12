import React from 'react';
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

function App() {
  return (
    <div className="app">
      <Router>
        <div className='app__body'>
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
      </Router>
    </div>
  );
}

export default App;
