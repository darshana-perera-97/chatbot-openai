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
import axios from "axios";
import "./App.css";

const Design = () => {
  const [isChatOpen, setChatOpen] = useState(true);
  const [isFullScreen, setFullScreen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! How can I assist you today?",
    },
  ]);
  const handleSubmit2 = async () => {
    try {
      const result = await axios.post("http://localhost:3001/chat", {});

      console.log(result.data.messages1); // Add this line

      setMessages(result.data.messages1);
    } catch (error) {
      console.error("Error sending text:", error);
    }
  };
  React.useEffect(() => {
    handleSubmit2();
  }, []);
  const intervalId = setInterval(() => {
    handleSubmit2();
  }, 10000);

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
      setMessages([
        ...messages,
        {
          role: "user",
          content: newMessage,
        },
      ]);
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
    <div>
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
          <div
            className={`sproutChatWindow ${isFullScreen ? "fullScreen" : ""}`}
          >
            <div className="sproutHeader">
              {/* <img src={sproutLogo} alt="Sprout Logo" /> */}
              <div className="botDetails">
                <img src={sproutLogo} alt="Sprout Logo" />
                <h2>Bot Name here</h2>
              </div>
              <div>
                <div className="controllerSet">
                  <img
                    src={minimize}
                    alt="cancel Button"
                    onClick={toggleChat}
                  />
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
                <div key={index} className={`sproutChatBubble ${message.role}`}>
                  <div className={`SinglesproutChatBubble`}>
                    <p>
                      <span
                        className="chatText"
                        dangerouslySetInnerHTML={{ __html: message.content }}
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
    </div>
  );
};

export default Design;
