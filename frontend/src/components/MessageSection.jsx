import { useEffect, useState } from 'react';
import io from 'socket.io-client';
const socket = io('http://127.0.0.1:4000');

export const MessageSection = ({ addMessage }) => {
    const [message, setMessage] = useState('');

    useEffect(() => {
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
    }, [addMessage]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Sending message:', message);
        socket.emit('message', message);
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
