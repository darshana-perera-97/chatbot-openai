const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

// Endpoint to receive and display text
app.post('/api/receive-text', (req, res) => {
  const receivedText = req.body.text;

  // Log the received text to the console (you can store it in a database, etc., in a real application)
  console.log('Received text:', receivedText);

  // Return the received text in the response
  res.json({ receivedText });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
