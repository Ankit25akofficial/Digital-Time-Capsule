# ⏳ Digital Time Capsule

A modern, minimalist web application that lets you send messages to your future self. Lock your memories in time with date-based access control.

## ✨ Features

- 🔒 **Time-Locked Messages** - Messages only unlock after the specified date
- 🆔 **Unique Capsule IDs** - Each capsule gets a unique identifier
- 🎨 **Modern Dark UI** - Clean blue and black theme with smooth animations
- 🔐 **Secure** - XSS protection and input validation
- 📱 **Responsive** - Works on mobile and desktop
- 🚀 **RESTful API** - Full API support for integration

## 🛠️ Tech Stack

**Backend:**
- Node.js
- Express.js
- UUID v4
- JSON file storage

**Frontend:**
- Vanilla JavaScript
- HTML5
- CSS3 (Inter font)
- Animated grid background

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/time-capsule.git
cd time-capsule
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
node server.js
```

4. Open your browser:
```
http://localhost:3000
```

## 🔌 API Endpoints

### Create Capsule
```http
POST /create
Content-Type: application/json

{
  "message": "Your message here",
  "unlockDate": "2026-02-14T11:30:00"
}
```

**Response:**
```json
{
  "id": "unique-capsule-id",
  "message": "Capsule created successfully"
}
```

### Retrieve Capsule
```http
GET /capsule/:id
```

**Response (Locked):**
```json
{
  "error": "Capsule is locked",
  "unlockDate": "2026-02-14T11:30:00",
  "isLocked": true
}
```

**Response (Unlocked):**
```json
{
  "id": "capsule-id",
  "message": "Your message",
  "unlockDate": "2026-02-14T11:30:00",
  "createdAt": "2026-02-14T05:47:58.772Z",
  "isLocked": false
}
```

## 📁 Project Structure

```
time-capsule/
├── server.js           # Express backend
├── capsules.json       # Data storage
├── package.json        # Dependencies
├── public/
│   ├── index.html      # Main HTML
│   ├── style.css       # Styles
│   └── script.js       # Frontend logic
└── test_api.md         # API testing guide
```

## 🎨 Design Features

- **Dark Theme** - Pure black background with blue accents
- **Animated Grid** - Moving grid pattern background
- **Glowing Effects** - Blue glow on cards and buttons
- **Smooth Transitions** - Micro-animations throughout
- **Glassmorphism** - Modern card design

## 🧪 Testing

See `test_api.md` for detailed API testing instructions using Postman or cURL.

## 📝 License

MIT License - feel free to use this project!

## 👤 Author

Created with ❤️ by [Your Name]

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

**Note:** This project uses JSON file storage. For production use, consider using a proper database.
