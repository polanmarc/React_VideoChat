import React, { useState, useRef } from 'react';
import io from 'socket.io-client';

const Missatges = () => {
    const [message, setMessage] = useState('');
    const [receivedMessages, setReceivedMessages] = useState([]);
    const [user, setUser] = useState('');
    const [connected, setConnected] = useState(false);
    const [editMode, setEditMode] = useState(null); 
    const socketRef = useRef();

    const generateMessageId = () => {
        return Date.now().toString() + Math.random().toString(36).substr(2, 9);
    };

    const handleSendMessage = () => {
        if (message.trim() !== '') {
            if (editMode !== null) {
                handleEditMessage(editMode.id, message);
                setEditMode(null);
            } else {
                const messageId = generateMessageId();
                const messageWithUser = { id: messageId, text: `${user}: ${message}` };
                socketRef.current.emit('messageChat', messageWithUser);
            }
            setMessage('');
        }
    };

    const handleConnect = () => {
        if (user.trim() !== '') {
            setUser(user.trim());
            setConnected(true);
            socketRef.current = io('http://localhost:3001');

            socketRef.current.on('messageChat', (message) => {
                setReceivedMessages((prevMessages) => [...prevMessages, message]);
            });

            socketRef.current.on('editMessageChat', (editedMessage) => {
                setReceivedMessages((prevMessages) => {
                    return prevMessages.map((msg) =>
                        msg.id === editedMessage.id ? { ...msg, text: editedMessage.text } : msg
                    );
                });
            });

            socketRef.current.on('deleteMessageChat', (deletedMessageId) => {
                setReceivedMessages((prevMessages) =>
                    prevMessages.filter((msg) => msg.id !== deletedMessageId)
                );
            });
        }
    };

    const handleDisconnect = () => {
        if (socketRef.current) {
            socketRef.current.disconnect();
        }
        setConnected(false);
        setUser('');
        setReceivedMessages([]);
    };

    const handleEditMessage = (id, newText) => {
        socketRef.current.emit('editMessageChat', { id, text: newText });
    };

    const handleDeleteMessage = (id) => {
        socketRef.current.emit('deleteMessageChat', id);
    };

    const handleEditMode = (id, text) => {
        const messageUser = text.split(':')[0].trim();
        if (messageUser === user) {
            setEditMode({ id, text });
            setMessage(text);
        } else {
            alert('No puedes editar este mensaje porque es de otro usuario.');
        }
    };

    const handleDeleteMode = (id, text) => {
        const messageUser = text.split(':')[0].trim();
        if (messageUser === user) {
            handleDeleteMessage(id);
        } else {
            alert('No puedes eliminar este mensaje porque es de otro usuario.');
        }
    };

    return (
        <div id='mensaje-content'>
            <h1>Mensajes</h1>
            {!connected ? (
                <div>
                    <input type="text" name="user" value={user} onChange={(e) => setUser(e.target.value)} />
                    <button onClick={handleConnect}>Conectar</button>
                </div>
            ) : (
                <div>
                    <input type="text" name="message" value={message} onChange={(e) => setMessage(e.target.value)} />
                    <button onClick={handleSendMessage}>
                        {editMode !== null ? 'Guardar Cambios' : 'Enviar'}
                    </button>
                    <button onClick={handleDisconnect}>Desconectar</button>
                </div>
            )}
            <div id='printearMensajes'>
                {receivedMessages.map((msg) => (
                    <div className='content-mensaje' key={msg.id}>
                        <div className='mensage-texto'>
                            {editMode !== null && editMode.id === msg.id ? (
                                <p>{msg.text}</p>
                            ) : (
                                <p>{msg.text}</p>
                            )}
                        </div>
                        <div className='botones-mensaje'>
                            {!editMode ? <button onClick={() => handleEditMode(msg.id, msg.text)}>Editar</button> : null}
                            {!editMode ? <button onClick={() => handleDeleteMode(msg.id, msg.text)}>Eliminar</button> : null}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Missatges;
