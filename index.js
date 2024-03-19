const express = require('express');
const sendMail = require('./sendMail');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// const app = express();
// const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'templates')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});
app.post('/submit', (req, res) => {
    // Extract form data from the request body
    const formData = req.body;

    // Send the email
    sendMail(formData)
        .then(() => res.send('Thank you!'))
        .catch(() => res.status(500).send('Failed to send email'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
