import React, {useState} from 'react'
import './Login.css'
import { useDispatch } from 'react-redux';
import {Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal'
import {auth, provider} from '../../firebase'
import {login} from '../../features/appSlice'

// Modal Materila UI styling
function getModalStyle() {
    const top = 50;
    const left = 50;
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 270,
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #dbdbdb',
      borderRadius: '3px',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      outline: "none"
    },
  }));
  

function Login() {
    const dispatch = useDispatch();
    const classes=useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [openLogIn, setOpenLogIn]=useState(false);
    const [OpenSignUp, setOpenSignUp]=useState(false);

    const signIn=()=>{
        auth.signInWithPopup(provider)
        .then(result=>{
            dispatch(login({
                username: result.user.displayName,
                profilePic: result.user.photoURL,
                id: result.user.uid
            }))
        }).catch(error=>alert(error.message))
    }

//     <div className='login__container'>
//     <img src='https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg' alt='snapchat logo'/>
//     <Button variant='outlined' onClick={signIn}>Sign in</Button>
// </div>

    return (
        <div className='login'>
    <Modal
        open={openLogIn}
        // on close listens to clicks outside the modal. materialize built that for us
        onClose={()=>setOpenLogIn(false)}
      >
         <div style={modalStyle} className={classes.paper}>
           <div className="login__modalContainer">
            <center>
              <img className="login__modalImage" src="https://static.wikia.nocookie.net/logopedia/images/d/d1/Snapchat_Ghost.svg/revision/latest?cb=20171018115934" alt="snapchat logo" /> 
            </center>
            <form className='login__modalForm'>
            <p className='login__modalFormTitle'>Log into Snapchat</p>
                <label>EMAIL</label>
              <input ></input>
              <label>PASSWORD</label>
              <input ></input>
              <button className="login__modalButton" type="submit">Log In</button>
              <button className="login__modalGoogleLogIn" type="submit">Log in with google</button>
              <p className="login__modalText">Don't have an account?<span className="login__modal-link"> Sign Up</span></p>
            </form>
           </div>
         </div>
      </Modal>
      <Modal
        open={OpenSignUp}
        // on close listens to clicks outside the modal. materialize built that for us
        onClose={()=>setOpenSignUp(false)}
      >
         <div style={modalStyle} className={classes.paper}>
           <div className="login__modalContainer">
            <center>
              <img className="login__modalImage" src="https://static.wikia.nocookie.net/logopedia/images/d/d1/Snapchat_Ghost.svg/revision/latest?cb=20171018115934" alt="snapchat logo" /> 
            </center>
            <form className='login__modalForm'>
            <p className='login__modalFormTitle'>Sign Up for Snapchat</p>
            <label>USERNAME</label>
              <input ></input>
                <label>EMAIL</label>
              <input ></input>
              <label>PASSWORD</label>
              <input ></input>
              <button className="login__modalButton" type="submit">Sign Up</button>
              <p className="login__modalText">Already have an account?<span className="login__modal-link"> Sign In</span></p>
            </form>
           </div>
         </div>
      </Modal>
            <div className='login__container'>
                <img src='https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg' alt='snapchat logo'/>
                <button className='login__buttonLogIn' onClick={()=>setOpenLogIn(true)}>LOG IN</button>
                <button className='login__buttonSignUp' onClick={()=>setOpenSignUp(true)}> SIGN UP</button>
            </div>
        </div>
    )
}

export default Login
