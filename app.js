const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to our API!', app: 'natours' });
});

app.post('/', (req, res) => {
  res.send('you can post to the endpoint');
});

const port = 3000;
app.listen(port, () => {
  console.log(`app is running at ${port}...`);
});
