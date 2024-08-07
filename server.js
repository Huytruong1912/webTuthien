const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/registerEndpoint', (req, res) => {
    const { email, password } = req.body;
    const filePath = path.join(__dirname, 'users.json');

    fs.readFile(filePath, (err, data) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error reading file.' });
        }

        let users = JSON.parse(data);
        if (users.some(user => user.email === email)) {
            return res.status(400).json({ success: false, message: 'User already exists.' });
        }

        users.push({ email, password });
        fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error saving user data.' });
            }

            res.json({ success: true });
        });
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});