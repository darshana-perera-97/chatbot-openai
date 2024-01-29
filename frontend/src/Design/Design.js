import React, { useState, useRef, useEffect } from "react";
import sproutLogo from "./Assets/sproutProductLogo.png";
import homeWindowIcon from "./Assets/homeWindowIcon.jpeg";
import cancel from "./Assets/cancel.png";
import minimize from "./Assets/minimize.png";
import maximize from "./Assets/maximize.png";
import onlineText from "./Assets/onlineText.png";
import chatIconSprout from "./Assets/chatIconSprout.png";
import chatIconUser from "./Assets/chatIconUser.png";
import sendIcon from "./Assets/sendIcon.png";
import "./App.css";

const Design = () => {
  const [isChatOpen, setChatOpen] = useState(true);
  const [isFullScreen, setFullScreen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", message: "Hello there!" },
    { sender: "person", message: "Hello there!" },
    {
      sender: "bot",
      message:
        "List Items will be showing here like this <br/><ul><li>Product features</li><li>Account management</li><li>FAQs</li></ul> last line is here",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const chatContentRef = useRef(null);

  const toggleChat = () => {
    setChatOpen(!isChatOpen);
  };

  const toggleFullScreen = () => {
    setFullScreen(!isFullScreen);
  };

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSend = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { sender: "person", message: newMessage }]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // prevent the default behavior (form submission)
      handleSend();
    }
  };

  // useEffect to scroll down when a new message is added
  useEffect(() => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={`SproutApp ${isFullScreen ? "fullScreen" : ""}`}>
      {/* Main content of your app */}
      <div className="content">{/* <h1>Your App Content</h1> */}</div>

      {/* Chat Icon */}
      {!isChatOpen && (
        <div className="sproutChatIcon" onClick={toggleChat}>
          <img src={homeWindowIcon} alt="Chat Icon" />
        </div>
      )}
      {/* Floating Chat Window */}
      {isChatOpen && (
        <div className={`sproutChatWindow ${isFullScreen ? "fullScreen" : ""}`}>
          <div className="sproutHeader">
            {/* <img src={sproutLogo} alt="Sprout Logo" /> */}
            <div className="botDetails">
              <img src={sproutLogo} alt="Sprout Logo" />
              <h2>Bot Name here</h2>
            </div>
            <div>
              <div className="controllerSet">
                <img src={minimize} alt="cancel Button" onClick={toggleChat} />
                <img
                  src={maximize}
                  alt="cancel Button"
                  onClick={toggleFullScreen}
                />
                <img src={cancel} alt="cancel Button" onClick={toggleChat} />
              </div>
              {/* <img
                src={onlineText}
                alt="cancel Button"
                className="online-text"
              /> */}
            </div>
          </div>
          <div className="sproutChatContent" ref={chatContentRef}>
            <div className="chatDate">
              <p>Today, 08th January 2024</p>
            </div>
            {messages.map((message, index) => (
              <div key={index} className={`sproutChatBubble ${message.sender}`}>
                <div className={`SinglesproutChatBubble`}>
                  <p>
                    <span
                      className="chatText"
                      dangerouslySetInnerHTML={{ __html: message.message }}
                    />
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="sproutChatInput">
            <input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />

            <img src={sendIcon} alt="Chat Icon" onClick={handleSend} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Design;
