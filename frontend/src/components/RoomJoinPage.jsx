

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export const RoomJoinPage = () => {
    const [roomNumber, setRoomNumber] = useState('');
    const navigate = useNavigate();

    const joinRoom = () => {
        // Redirect the user to the chat room
        navigate(`/chat/${roomNumber}`);
    };

    return (
     
            <div className='bg-slate-600 flex flex-col gap-10 justify-center items-center h-screen'>
                <img src="logo.webp" alt="Incogni-Chat Logo" className='h-5/12 w-1/4 mt-2 '/>
                <div className=' font-serif text-gray-400 flex flex-col justify-center items-center'>
                    <h1 className='text-2xl'>Welcome to Incogni - Chat</h1>
                    <h2 className='text-xl'>Text and Video Call Freely</h2>
                </div>

                <div className='flex flex-col gap-2  w-1/2 '>
                    <input className='outline-white bg-slate-500 text-white p-2 rounded-md'
                        type="text"
                        value={roomNumber}
                        onChange={(e) => setRoomNumber(e.target.value)}
                        placeholder="Enter Room Number"
                    />
                    <button onClick={joinRoom} className='rounded-md bg-blue-600 hover:bg-blue-700 font-mono font-semibold text-white p-2'>Join Room</button>
                </div>
            </div>

      

    );
};