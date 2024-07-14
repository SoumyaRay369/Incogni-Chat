import React from 'react';
import { MessageBlocks } from './MessageBlocks';

export const ConversationSection = ({ messages }) => {
    console.log('Rendering messages:', messages);
    return (
        <>
            <div className="overflow-y-scroll bg-slate-600 h-screen">
                {messages.map((message, index) => (
                    <MessageBlocks key={index} message={message} />
                ))}
            </div>
        </>
    );
};
