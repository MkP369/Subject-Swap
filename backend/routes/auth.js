const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Profiles = require('../models/Profiles');

const jwtkey = 'jwtsecretkey';
router.get("/test", async (req, res) => {
  const allUsers = await Profiles.find();  
  res.json(allUsers);
});
function authcheck(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ success: false, message: 'Token not provided' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Invalid token format' });
  }

  try {
    const decoded = jwt.verify(token, jwtkey);
    req.user = decoded;
    next(); 
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Token invalid' });
  }
}
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password, age, board, phone, userClass, language } = req.body;

    
    const ifexist = await User.findOne({ $or: [{username}, {email}] });
    if (ifexist) return res.status(400).json({ errors: { username: "Username or Email already taken" }});

   
    const hash = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hash,
      age,
      board,
      phone,
      userClass,
      language
    });
    await user.save();
    await  Profiles.create({
      userId: user._id,
      username,
      email,
      age,
      board,
      phone,
      userClass,
      language
    });

    const token = jwt.sign({ id: user._id, username: user.username }, jwtkey);

    res.json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      },
      token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
 router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, username: user.username }, jwtkey, );

    res.json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
router.get('/profile', authcheck, async (req, res) => {
  try {
    //const user = await User.findById(req.user.id).select('-password');
    const user = await Profiles.findOne({ userId: req.user.id});
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    
    res.json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});
router.patch('/profile', authcheck, async (req, res) => {
  try {
    const userProfile = await Profiles.findOne({ userId: req.user.id });

    if (!userProfile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }

    const allowedFields = [
      'username',
      'email',
      'age',
      'board',
      'phone',
      'userClass',
      'language',
      'availability', 'chatOnly', 'strongSubjects',
      'weakSubjects', 'profileImage'
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        userProfile[field] = req.body[field];
      }
    });

    await userProfile.save();

    res.json({ success: true, message: 'Profile updated successfully', profile: userProfile });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});
module.exports = router;