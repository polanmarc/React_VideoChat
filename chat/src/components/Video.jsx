import React, { useRef, useState, useEffect } from 'react';
import io from 'socket.io-client';
import Receiver from './Receiver';

const Video = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [stream, setStream] = useState(false);
    const [filter, setFilter] = useState('none');
    const serverRef = useRef();

    useEffect(() => {
        serverRef.current = io('http://localhost:3001');
        return () => {
            serverRef.current.disconnect();
        };
    }, []);

    const setVideoInServer = () => {
        setInterval(() => {
            if (videoRef.current && canvasRef.current) {
                const context = canvasRef.current.getContext('2d');
                if (context) {
                    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
                    const data = canvasRef.current.toDataURL('image/jpeg');
                    serverRef.current.emit('imgChat', data);
                }
            }
        }, 40);
    }

    const startBroadcasting = async () => {
        try {
            if (!stream) {
                const userVideo = await navigator.mediaDevices.getUserMedia({ video: true });
                videoRef.current.srcObject = userVideo;
                setVideoInServer();
                setStream(true);
            }
        } catch (error) {
            console.error('Error al acceder a la cámara: ', error);
        }
    };

    const stopBroadcasting = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
            setStream(false);
        }
    }

    const handleFilterChange = (event) => {
        const newFilter = event.target.value;
        setFilter(newFilter);
        videoRef.current.className = newFilter;
        serverRef.current.emit('filter', newFilter);
    };

    const startScreenSharing = async () => {
        try {
            const userVideo = await navigator.mediaDevices.getDisplayMedia({ video: true });
            videoRef.current.srcObject = userVideo;
            setVideoInServer();
        } catch (error) {
            console.error('Error al compartir pantalla: ', error);
        }
    };

    return (
        <div>
            <h1>VideoChat</h1>
            <div style={{ marginBottom: '30px' }}>
                <button style={{ marginLeft: '30px' }} onClick={startBroadcasting}>Start Broadcast</button>
                <button style={{ marginLeft: '30px' }} onClick={stopBroadcasting}>Stop Broadcast</button>
                <button style={{ marginLeft: '30px' }} onClick={startScreenSharing}>Start Share Screen</button>
                <button style={{ marginLeft: '30px' }} onClick={stopBroadcasting}>Stop Share Screen</button>
            </div>
            <div id='video-content'>
                <video ref={videoRef} autoPlay muted className={filter}></video>
            </div>
            <div id='canvas-content'>
                <Receiver />
                <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
            </div>
            <div id='filter-content'>
                <label htmlFor="filter">Filter: </label>
                <select id="filter" onChange={handleFilterChange} value={filter}>
                    <option value="none">None</option>
                    <option value="blur">Blur</option>
                    <option value="grayscale">Grayscale</option>
                    <option value="invert">Invert</option>
                    <option value="sepia">Sepia</option>
                </select>
            </div>
        </div>
    );
};

export default Video;
