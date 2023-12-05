 
import React, { useState } from 'react';
import ChatApp from './ChatApp';
import { MdNearbyError } from "react-icons/md";
import { TbApiApp } from "react-icons/tb";
import './Mobile.css';  

// The Mobile Component renders with a mobile phone like shape
const Mobile= () => {
    const [showChatApp, setShowChatApp] = useState(false);
    const toggleChatApp = () => setShowChatApp(!showChatApp);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => { setIsModalOpen(!isModalOpen)};

    return (
        <div className="mobile-container">
            <div className="app-buttons">
                <div className="app-icon app" data-tooltip="Test overlay" onClick={toggleModal}>
                    <TbApiApp />
                </div>
                <div className="app-icon orange" data-tooltip="Charging outlet error" onClick={toggleChatApp}>
                    <MdNearbyError />
                </div>
            </div>
            <div className="mobile-screen">
                {showChatApp && <ChatApp />}
            </div>

            {isModalOpen &&  (
                <div className="flyout-modal">
                    {/* Todo - content for the overlay will go here */}
                    {/* <button onClick={toggleModal}>Close</button> */}
                </div>
            )}
        </div>
    );
};

export default Mobile;