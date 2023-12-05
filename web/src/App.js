// A simple ChatApp Demo (todo: upgrade macOS/xcode for react native)
import React, { useEffect, useState } from 'react';
import { FaMobileAlt } from 'react-icons/fa';  
import { apiBaseUrl } from './config';
import TypedHeader from './components/TypedHeader';
import Mobile from './components/mobile/Mobile';
import './App.css';
import './styles.css'

function App() {
    const [showMobile, setShowMobileView] = useState(false);
    const [message, setMessage] = useState('');
    useEffect(() => {
      fetch(`${apiBaseUrl}/api`)
          .then(response => response.json())
          .then(data => setMessage(atob(data.message)))
          .then(data => console.log(data))
          .catch(error => console.error('Error fetching data:', error));
    }, []);

    const toggleMobileView = () => {
        setShowMobileView(!showMobile);
    };

    const pingServer = () => {};

    return (
        <div className="App">
            <header className="App-header">
                {message.length === 0 ? (
                    <div className="circle-icon-yellow"></div>
                ) : (
                    <div className="circle-icon-green"></div>
                )}
                <div className="icon-container" onClick={toggleMobileView}>
                  <FaMobileAlt />  
                </div>
                
            </header>

            {showMobile && <Mobile />}

            {!showMobile && 
                <main>
                    <h1 className="th-h1">
                    Welcome to Mobile Simulator!
                    </h1>
                        <TypedHeader></TypedHeader>
            
                </main>
            }
        </div>
    );
}

export default App;