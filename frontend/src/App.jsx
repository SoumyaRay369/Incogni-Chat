import { useState } from 'react';
import { HeaderSection } from './components/HeaderSection';
import { MessageSection } from './components/MessageSection';
import { ConversationSection } from './components/ConversationSection';

function App() {
    const [messages, setMessages] = useState([]);

    const addMessage = (newMessage) => {
        console.log('Adding new message:', newMessage);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    return (
        <>
            <div className="flex flex-col max-h-screen">
                <HeaderSection />
                <ConversationSection messages={messages} />
                <MessageSection addMessage={addMessage} />
            </div>
        </>
    );
}

export default App;
