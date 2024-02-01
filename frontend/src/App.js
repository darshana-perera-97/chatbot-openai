import React, { useState } from "react";
import axios from "axios";
import Design from "./Design/Design";

function App() {
  const [inputText, setInputText] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async () => {
    try {
      const result = await axios.post("http://localhost:3001/api/displayText", {
        text: inputText,
      });

      console.log("Server Response:", result.data); // Add this line

      setResponse(result.data.message);
    } catch (error) {
      console.error("Error sending text:", error);
    }
  };
  const handleSubmit2 = async () => {
    try {
      const result = await axios.post("http://localhost:3001/chat", {
        text: inputText,
      });

      console.log(result.data.messages1); // Add this line
    } catch (error) {
      console.error("Error sending text:", error);
    }
  };

  return (
    // <div>
    //   <h1>React Node.js Test</h1>
    //   <input
    //     type="text"
    //     value={inputText}
    //     onChange={(e) => setInputText(e.target.value)}
    //   />
    //   <button onClick={handleSubmit}>Send Text</button>
    //   <button onClick={handleSubmit2}>Send Text</button>
    //   {response && <p>Server Response: {response}</p>}
    // </div>
    <div>
      <Design />
    </div>
  );
}

export default App;

// import React from 'react'

// export default function App() {
//   return (
//     <div>App</div>
//   )
// }
