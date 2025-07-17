const express = require('express');
const http = require('http');
const path = require('path');
const multer = require('multer');
const { Server } = require('socket.io');
const fs = require('fs');
<<<<<<< HEAD
=======
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
>>>>>>> adcbce6 (Add all project files including backend models)
const { time, timeStamp } = require('console');

const messagesFile = path.join(__dirname, 'messages.json');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

const users = {};
<<<<<<< HEAD

const usersFile = path.join(__dirname, 'users.json');
=======
app.use(express.static('public'));
const usersFile = path.join(__dirname, 'users.json');
const mangourl = 'mongodb://localhost:27017/subjectswap';


app.use(cors());
app.use(express.json());
const PORT = 8000;
app.use('/api', authRoutes);


mongoose.connect(mangourl)
  .then(() => {
    console.log('db connected');
    
  })
  .catch(err => {
    console.error(' db not connection' , err);
  });
>>>>>>> adcbce6 (Add all project files including backend models)

function loadAllUsers(){
  if(!fs.existsSync(usersFile)) return {};
  return JSON.parse(fs.readFileSync(usersFile));
}

function saveAllUsers(data){
  fs.writeFileSync(usersFile, JSON.stringify(data, null, 2));
}

function loadMessages() {
  if (!fs.existsSync(messagesFile)) return {};
  return JSON.parse(fs.readFileSync(messagesFile));
}

function saveMessages(allMessages) {
  fs.writeFileSync(messagesFile, JSON.stringify(allMessages, null, 2));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/chat', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/get-messages', (req, res)=>{
  const {user1, user2} = req.query;
  const allMessages = loadMessages();
  const key = [user1, user2].sort().join("-");
  res.json(allMessages[key] || []);
});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({storage});

const imageStorage = multer.diskStorage({
  destination:(req, file, cb)=>cb(null, 'uploads/'),
  filename:(req, file, cb)=>cb(null, `${Date.now()}-${file.originalname}`)
});
const uploadImage = multer({storage: imageStorage});

const fileStorage = multer.diskStorage({
  destination:(req, file, cb)=>cb(null, 'uploads/'),
  filename:(req, file, cb)=>cb(null, `${Date.now()}-${file.originalname}`)
});
const uploadFile = multer({storage: fileStorage});

app.post('/chat', upload.single('profile'), (req, res) =>{
  const {username} = req.body;
  const profilePic = req.file ? `uploads/${req.file.filename}` : null;
  res.json({ username, profilePic });
});

app.post('/upload-message-file', uploadFile.single('file'), (req, res)=>{
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  const fileUrl = `/uploads/${req.file.filename}`;
  const fileType = req.file.mimetype;
  const originalName = req.file.originalname;

  res.json({fileUrl, fileType, originalName});
});

io.on('connection', (socket) => {
  socket.on('register-user', ({ username, profilePic }) => {
    console.log(`${username} joined`);
    users[socket.id] = { username, profilePic };
    const allUsers = loadAllUsers();
    allUsers[username] = {
      profilePic: profilePic || allUsers[username]?.profilePic || null,
      online: true
    }
    saveAllUsers(allUsers);

    io.emit('user-list', allUsers);

    const allMessages = loadMessages();
    const myUsername = username;

    for (const key in allMessages) {
      const participants = key.split("-");
      if (participants.includes(myUsername)) {
        const otherUser = participants.find(u => u !== myUsername);
        const history = allMessages[key];

        history.forEach(msg => {
          if (msg.from === otherUser) {
            socket.emit('private-message', msg);
          }
        });
      }
    }
  });

  socket.on('send-private-message', ({ to, from, message, fileUrl, fileType, originalName }) => {
    const allMessages = loadMessages();
    const participants = [from, to].sort().join("-");
    if(!allMessages[participants]) allMessages[participants] = [];

    allMessages[participants].push({from, message, fileUrl, fileType, originalName, timeStamp:Date.now()});
    saveMessages(allMessages);

    const targetSocketId = Object.keys(users).find(id => users[id].username === to);

    if(targetSocketId){
      socket.to(targetSocketId).emit('private-message', {from, message, fileUrl, fileType, originalName, timeStamp: Date.now()});
    }
  });

  socket.on('disconnect', () => {
    const user = users[socket.id];

    if(user){
      console.log(`${user.username} disconnected`);
      const allUsers = loadAllUsers();
      if(allUsers[user.username]){
        allUsers[user.username].online = false;
        saveAllUsers(allUsers);
      }
    }
    delete users[socket.id];
    io.emit('user-list', loadAllUsers());
  });
});

server.listen(8000, () => {
  console.log('Server running on http://localhost:8000');
});
