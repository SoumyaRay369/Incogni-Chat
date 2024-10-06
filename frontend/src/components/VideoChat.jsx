import { useRef, useEffect, useState } from "react";
import { Peer } from 'peerjs';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';

const socket = io('http://localhost:4000'); // Adjust this URL based on your backend address
//incogni-chat.onrender.com
export const VideoChat = () => {
  const [peer, setPeer] = useState(null);
  const { roomNumber } = useParams();
  const videoRef = useRef(null);
  const videoRef2 = useRef(null);

  useEffect(() => {
    // Initialize Peer instance once
    const newPeer = new Peer();
    setPeer(newPeer);

    newPeer.on('open', (id) => {
      console.log('My peer ID is: ' + id);
      socket.emit('joinRoom', roomNumber, id); // Inform backend of the room and peer ID
    });

    newPeer.on('call', (call) => {
      console.log('Receiving a call...');
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((stream) => {
          call.answer(stream); // Answer the call with your own stream
          console.log('Answered the call');

          call.on('stream', (remoteStream) => {
            if (videoRef2.current) {
              videoRef2.current.srcObject = remoteStream;
            }
          });
        })
        .catch((err) => {
          console.error('Failed to get local stream', err);
        });
    });

    socket.on('newPeer', (peerId) => {
      console.log('New peer joined:', peerId);
      // Automatically call the new peer
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }

          const call = newPeer.call(peerId, stream);
          call.on('stream', (remoteStream) => {
            if (videoRef2.current) {
              videoRef2.current.srcObject = remoteStream;
            }
          });

          call.on('error', (err) => {
            console.error('Call error:', err);
          });
        })
        .catch((err) => {
          console.error('Failed to get local stream', err);
        });
    });

    return () => {
      if (newPeer) {
        newPeer.destroy();
      }
    };
  }, [roomNumber]);

  return (
    <div className="flex flex-col items-center justify-center gap-y-5 h-screen bg-gradient-to-br from-indigo-900 to-sky-600">
      <div className="flex flex-col gap-y-5 items-center">
        <video ref={videoRef} autoPlay className="border border-gray-400 rounded-xl w-1/2"></video>
        <video ref={videoRef2} autoPlay className="border border-gray-400 rounded-xl w-1/2"></video>
      </div>
    </div>
  );
};
