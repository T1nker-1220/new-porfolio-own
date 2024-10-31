const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/portfolio', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define a simple schema and model for contact messages
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
});

const Contact = mongoose.model('Contact', contactSchema);

// Route to handle contact form submissions
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;
    const newContact = new Contact({ name, email, message });
    
    try {
        await newContact.save();
        // Log to a file
        fs.appendFileSync('contact_log.txt', `${new Date()}: ${name}, ${email}, ${message}\n`);
        res.status(201).send('Message sent successfully');
    } catch (error) {
        res.status(500).send('Error sending message');
    }
});

// Add this route to your server.js
app.get('/api/contacts', async (req, res) => {
  try {
      const contacts = await Contact.find();
      res.json(contacts);
  } catch (error) {
      res.status(500).send('Error retrieving contacts');
  }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});