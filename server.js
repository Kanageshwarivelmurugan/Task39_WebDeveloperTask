const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const app = express();
const server = http.createServer(app);
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const mentorRoute = require('./routes/mentorRoute');
const studentRoute = require('./routes/studentRoute');

dotenv.config();

connectDB();

const corsOptions = {
  origin: 'http://localhost:5173',  // Allow only frontend from this URL
  methods: 'GET,POST,PUT,DELETE',  // Restrict allowed HTTP methods
  allowedHeaders: 'Content-Type',  // Allow specific headers
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use('/api/mentors', mentorRoute);
app.use('/api/students', studentRoute);

app.get('/', (req, res) => {
  res.send('Welcome to WebDeveloperTask');
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
