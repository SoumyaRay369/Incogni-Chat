import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';

// Assuming your socket server is running on localhost:4000
// const socket = io('https://incogni-chat.onrender.com/');
const socket = io('http://localhost:4000');

export const MessageSection = ({ addMessage }) => {
    const [message, setMessage] = useState('');
    const { roomNumber } = useParams(); // Capture the room number from the URL



    useEffect(() => {
        // Join the room when the component mounts
        socket.emit('joinRoom', roomNumber);
    
        socket.on('message', (message) => {
            console.log('Received message from server:', message);
            try {
                addMessage(message);
            } catch (error) {
                console.log(error);
            }
        });
    
        // Clean up the socket connection when the component unmounts
        return () => {
            socket.off('message');
        };
    }, [addMessage, roomNumber]);
    

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Sending message to room:', roomNumber, 'Message:', message);
        // Include the room number when emitting the message
        socket.emit('message', message, roomNumber);
        setMessage('');
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="flex items-center bg-slate-700 rounded-sm pr-2">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="rounded-md focus:outline-none py-3 px-2 w-screen text-white font-light font-mono bg-slate-700 overflow-y-visible"
                    placeholder="Send Message"
                />
                <button type="submit" className="flex-1 bg-slate-500 text-white font-light font-mono py-1 px-2 rounded-xl focus:bg-slate-500">
                    Send
                </button>
            </form>
        </>
    );
};
