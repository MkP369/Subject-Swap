const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const jwtkey = 'jwtsecretkey';
router.get("/test", async (req, res) => {
  const allUsers = await User.find();  
  res.json(allUsers);
});

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

module.exports = router;