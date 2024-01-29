const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: "-open API key-",
});

const app = express();
const port = 3001;
const messages1 = [
  {
    role: "system",
    content:
      "You are a boy called Darshana Perera. And 26 years old who is working in hSenid Mobile Solutions.",
  },
  {
    role: "user",
    content: "hi\n",
  },
  {
    role: "assistant",
    content: "Hello! How can I assist you today?",
  },
];

app.use(cors()); // Enable CORS
app.use(bodyParser.json());

const runOpenAIChat = async () => {
  var assistantReply = "";
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages1,
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    // Check if response.choices is defined and not empty
    if (response.choices && response.choices.length > 0) {
      // Extract the assistant's reply content from the first choice's message object
      assistantReply = response.choices[0].message.content;
      // console.log(response.choices[0]);
      console.log("Assistant's Reply:", assistantReply);
    } else {
      console.error("Unexpected response format:", response);
      assistantReply = "Im not well today. Please text me later ";
    }
  } catch (error) {
    console.error("Error:", error.message);
    assistantReply = "Im not well today. Please text me later ";
  }
  console.log(assistantReply);
  const tmp = {
    role: "assistant",
    content: assistantReply,
  };
  messages1.push(tmp);
  console.log(messages1);
};

app.post("/api/displayText", (req, res) => {
  console.log("Request received");
  const { text } = req.body;
  console.log("Received text:", text);
  res.json({ message: `Text received: ${text}` });
  const tmp = {
    role: "user",
    content: text,
  };
  messages1.push(tmp);
  runOpenAIChat();
});
app.post("/chat", (req, res) => {
  const { text } = req.body;
  res.json({ messages1 });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
