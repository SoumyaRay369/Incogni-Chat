import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HeaderSection } from './components/HeaderSection';
import { MessageSection } from './components/MessageSection';
import { ConversationSection } from './components/ConversationSection';
import { RoomJoinPage } from './components/RoomJoinPage';

function App() {
    const [messages, setMessages] = useState([]);

    const addMessage = (newMessage) => {
        console.log('Adding new message:', newMessage);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<RoomJoinPage />} />
                <Route path="/chat/:roomNumber" element={
                    <>
                        <div className="flex flex-col max-h-screen">
                            <HeaderSection />
                            <ConversationSection messages={messages} />
                            <MessageSection addMessage={addMessage} />
                        </div>
                    </>
                } />
            </Routes>
        </Router>
    );
}

export default App;
