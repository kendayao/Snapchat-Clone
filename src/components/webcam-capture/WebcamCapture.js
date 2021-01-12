import React, {useRef, useCallback, useState} from 'react'
import Webcam from 'react-webcam'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { useDispatch } from 'react-redux';
import { setCameraImage } from '../../features/cameraSlice';

// video size
const videoConstraints = {
    width: 250,
    height: 400,
    facingMode: "user"
  };

function WebcamCapture() {
    const webcamRef = useRef(null)
    const dispatch = useDispatch()

    const capture=useCallback(()=>{
        const imageSrc = webcamRef.current.getScreenshot();
        dispatch(setCameraImage(imageSrc));
    }, [webcamRef])

    return (
        <div className='webcamCapture'>
            <Webcam 
                audio={false}
                height={400}
                ref={webcamRef}
                screenshotFormat='image/jpeg'
                width={250}
                videoConstraints={videoConstraints}
            />

            <RadioButtonUncheckedIcon className='webcamCapture__button' onClick={capture} fontSize='large' />
        </div>
    )
}

export default WebcamCapture
