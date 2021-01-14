import React, {useState} from 'react'
import './Login.css'
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal'
import CloseIcon from '@material-ui/icons/Close';
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
    const [username, setUsername]=useState('');
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');

    const signInWithGoogle=()=>{
        auth.signInWithPopup(provider)
        .then(result=>{
            dispatch(login({
                username: result.user.displayName,
                profilePic: result.user.photoURL,
                id: result.user.uid
            }))
            setOpenLogIn(false)
        }).catch(error=>alert(error.message))
    }

    const signUp = (event) =>{
      event.preventDefault();
      auth.createUserWithEmailAndPassword(email, password)
      .then(authUser=>{
        authUser.user.updateProfile({
          displayName: username
        }).then(()=>{
            dispatch(login({
              username: authUser.user.displayName,
              profilePic: authUser.user.photoURL,
              id: authUser.user.uid
          })
        )
      })
    })
      .catch((error)=>alert(error.message))
    }

    const logIn = (event) =>{
      event.preventDefault();
      auth.signInWithEmailAndPassword(email, password).catch(error=>alert(error.message))
        setEmail('')
        setPassword('')
        setOpenLogIn(false)
    }


    return (
        <div className='login'>
    <Modal
        open={openLogIn}
        // on close listens to clicks outside the modal. materialize built that for us
        onClose={()=>setOpenLogIn(false)}
      >
         <div style={modalStyle} className={classes.paper}>
           <div className="login__modalContainer">
             <CloseIcon onClick={()=>setOpenLogIn(false)} fontSize='small' className='login__modalCloseIcon'/>
            <center>
              <img className="login__modalImage" src="https://lakeridgenewsonline.com/wp-content/uploads/2020/04/snapchat.jpg" alt="snapchat logo" /> 
            </center>
            <form className='login__modalForm'>
            <p className='login__modalFormTitle'>Log into Snapchat</p>
              <label htmlFor='email'>EMAIL</label>
              <input id='email' type='email' value={email} onChange={event=>setEmail(event.target.value)}></input>
              <label htmlFor='password'>PASSWORD</label>
              <input id='password' type='password' value={password} onChange={event=>setPassword(event.target.value)}></input>
              <p className='login__modal-p'>*You may use the following credentials to login or click on signup to create your own*</p>
              <p className='login__modal-p'>email: cool_coder@email.com password: 12341234</p>
              <button className="login__modalButton" type="submit" onClick={logIn}>Log In</button>
            </form>
            <button className="login__modalGoogleLogIn" onClick={signInWithGoogle}>Log in with google</button>
            <p className="login__modalText">Don't have an account?<span className="login__modal-link" onClick={()=>{setOpenSignUp(true);setOpenLogIn(false)}}> Sign Up</span></p>
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
           <CloseIcon onClick={()=>setOpenSignUp(false)} fontSize='small' className='login__modalCloseIcon'/>
            <center>
              <img className="login__modalImage" src="https://lakeridgenewsonline.com/wp-content/uploads/2020/04/snapchat.jpg" alt="snapchat logo" /> 
            </center>
            <form className='login__modalForm'>
            <p className='login__modalFormTitle'>Sign Up for Snapchat</p>
            <label htmlFor='username'>USERNAME</label>
              <input id='username' type='text' value={username} onChange={event=>setUsername(event.target.value)}></input>
                <label htmlFor='email'>EMAIL</label>
              <input id='email' type='email' value={email} onChange={event=>setEmail(event.target.value)} ></input>
              <label htmlFor='password'>PASSWORD</label>
              <input id='password' type='password' value={password} onChange={event=>setPassword(event.target.value)}></input>
              <p className='login__modal-p'>*You may use the following credentials to login or sign up with a new account*</p>
              <p className='login__modal-p'>email: cool_coder@email.com password: 12341234</p>
              <button className="login__modalButton" type="submit" onClick={signUp}>Sign Up</button>
              <p className="login__modalText">Already have an account?<span className="login__modal-link" onClick={()=>{setOpenLogIn(true);setOpenSignUp(false)}}> Log In</span></p>
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
