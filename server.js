const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;
const CAPSULES_FILE = path.join(__dirname, 'capsules.json');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
const readCapsules = () => {
    try {
        if (!fs.existsSync(CAPSULES_FILE)) {
            return [];
        }
        const data = fs.readFileSync(CAPSULES_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading capsules:', err);
        return [];
    }
};

const writeCapsules = (capsules) => {
    try {
        fs.writeFileSync(CAPSULES_FILE, JSON.stringify(capsules, null, 2));
    } catch (err) {
        console.error('Error writing capsules:', err);
    }
};

app.post('/create', (req, res) => {
    const { message, unlockDate, title } = req.body;

    if (!message || !unlockDate) {
        return res.status(400).json({ error: 'Message and unlock date are required' });
    }

    const newCapsule = {
        id: uuidv4(),
        message,
        unlockDate,
        title: title || 'Untitled Capsule',
        createdAt: new Date().toISOString()
    };

    const capsules = readCapsules();
    capsules.push(newCapsule);
    writeCapsules(capsules);

    res.status(201).json({ id: newCapsule.id, message: 'Capsule created successfully' });
});

app.get('/capsule/:id', (req, res) => {
    const { id } = req.params;
    const capsules = readCapsules();
    const capsule = capsules.find(c => c.id === id);

    if (!capsule) {
        return res.status(404).json({ error: 'Capsule not found' });
    }

    const now = new Date();
    const unlockDate = new Date(capsule.unlockDate);

    if (now < unlockDate) {
        return res.status(403).json({
            error: 'Capsule is locked',
            unlockDate: capsule.unlockDate,
            title: capsule.title,
            isLocked: true
        });
    }

    res.json({
        id: capsule.id,
        message: capsule.message,
        unlockDate: capsule.unlockDate,
        title: capsule.title,
        createdAt: capsule.createdAt,
        isLocked: false
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
