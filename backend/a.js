const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors()); // Enable CORS
app.use(bodyParser.json());

app.post('/api/displayText', (req, res) => {
  console.log('Request received');
  const { text } = req.body;
  console.log('Received text:', text);
  res.json({ message: `Text received: ${text}` });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
