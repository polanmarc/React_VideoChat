import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const Receiver = () => {
    const [imageData, setImageData] = useState('');
    const [filter, setFilter] = useState('');
    const imgRef = useRef();

    useEffect(() => {
        const serverRef = io('http://localhost:3001');

        serverRef.on('imgChat', (data) => {
            setImageData(data);
        });

        serverRef.on('filter', (data) => {
            setFilter(data);
        });

        return () => {
            serverRef.disconnect();
        };
    }, []); 

    useEffect(() => {
        if (imageData) {
            imgRef.current.src = imageData;
            imgRef.current.className = filter;
        }
    }, [imageData, filter]);    

    return (
        <div id='content-receiver'>
            {imageData ? (
                <img ref={imgRef} className={`image ${filter}`} alt="Received Image" />
            ) : (
                <p>No se están recibiendo imágenes</p>
            )}
        </div>
    );
};

export default Receiver;
