# 🔐 Secure Environment Chat Room

A modern, anonymous, and encrypted chat platform that allows users to communicate securely using room codes and unique passwords — without requiring phone numbers or email authentication.

---

## 🚀 Features

### 🔑 Anonymous Access

* No phone number or email required
* Users join using **Room Code + Password**

### 🧠 Unique Identity System

* Each password represents a **unique user identity**
* If someone logs in with another user's password → they appear as that user

### 🏠 Room-Based Chat

* Create private chat rooms
* Access controlled using room code

### 🗑️ Temporary Chat Rooms

* Chat rooms automatically **self-destruct after inactivity (30 days)**

### 🔒 Encrypted Messaging

* Messages are encrypted before being sent
* Ensures privacy and confidentiality

### 🧾 Chat Features

* Send messages
* Edit messages (CRUD)
* Delete messages
* Download chat history

---

## 🖥️ Tech Stack

### Frontend

* React.js
* HTML5 + CSS3
* Modern UI (Glassmorphism + Discord-inspired design)

### Backend *(Planned / In Progress)*

* Node.js + Express
* PostgreSQL

---

## 📂 Project Structure

```
secure-chat/
│
├── public/
│   ├── index.html
│   ├── styles.css
│   └── bg.png
│
├── src/
│   ├── components/
│   │   ├── JoinRoom.jsx
│   │   ├── ChatRoom.jsx
│   │   └── Message.jsx
│   │
│   ├── pages/
│   │   └── Home.jsx
│   │
│   ├── App.js
│   └── index.js
```

---

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/Yogurt069/SecureEnvrion-PE2.git

# Navigate into the project
cd SecureEnvrion-PE2

# Install dependencies
npm install

# Start the app
npm start
```

---

## 🧪 How It Works

1. User enters:

   * Room Code
   * Password

2. System:

   * Maps password → username
   * Joins/creates room

3. Chat:

   * Messages stored locally (frontend version)
   * Backend integration planned

---

## 🔐 Security Concept

This project uses a **password-based identity system**:

* No login system
* No personal data
* Identity = password

This makes the platform:

* Anonymous
* Lightweight
* Privacy-focused

---

## 📌 Future Improvements

* Real-time messaging (Socket.io)
* Database integration (PostgreSQL)
* Strong encryption implementation
* Multi-user live chat
* Auto-delete inactive rooms
* Online/offline indicators

---

This project is open-source and available under the MIT License.
