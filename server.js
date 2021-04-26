const express = require('express');

const app = express();
app.get('/', (req, res) => res.send('API Running'));
// It will look for an env variable called port, if nothing found it will go for default port 5000
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));