import React, {useEffect} from 'react'
import './ChatView.css'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectSelectImage } from '../../features/appSlice'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

function ChatView() {
    const selectedImage = useSelector(selectSelectImage)
    const history = useHistory();

    useEffect (()=>{
        if(!selectedImage){
            exit();
        }
    }, [selectedImage])

    const exit = () =>{
        history.replace('/')
    }

    return (
        <div onClick={exit} className='chatView'>
            <img src={selectedImage} alt='snapchat' />
            <div className='chatView__timer'>
                <CountdownCircleTimer
                    isPlaying
                    duration={10}
                    strokeWidth={6}
                    size={50}
                    colors={[
                        ['#004777', 0.33],
                        ['#F7B801', 0.33],
                        ['#A30000', 0.33],
                    ]}
                >
                    {({ remainingTime }) => {

                        if(remainingTime===0){
                            exit();
                        }
                        return remainingTime
                    }}
                </CountdownCircleTimer>
            </div>
        </div>
    )
}

export default ChatView
