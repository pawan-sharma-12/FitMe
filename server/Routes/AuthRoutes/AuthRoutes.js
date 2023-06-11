import express from 'express';
import User from '../../Database/Models/User/User.js';
const router = express.Router();
import bcrypt from 'bcryptjs';
import authenticate from '../../middleware/TokenAuthentication.js'


router.get('/', (req, res) => {
    res.send('hello from auth router');
})

router.post('/register', async (req, res) => {
  try {
    const { userName, email, phone, password } = req.body;

    if (!userName || !email || !phone || !password) {
      return res.status(422).json({ error: "All parameters are required" });
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(409).json({ error: "Email already exists" });
    }

    const newUser = new User({ userName, email, phone, password });
    const token = await newUser.generateToken();
    const savedUser = await newUser.save();

    if (!savedUser) {
      return res.status(500).json({ error: "Failed to save user data" });
    }
    res.cookie('jwtoken', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    res.status(201).json({ message: "User registration successful", user: savedUser });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred during user registration" });
  }
});

  router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Validate request body
      if (!email || !password) {
        return res.status(422).json({ error: "Email and password are required" });
      }
  
      // Find the user based on the email
      const user = await User.findOne({ email });
  
      // Check if the user exists
      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
  
      // Compare the password with the stored hash
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      // Check if the password is valid
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
  
      // Generate and assign a token
      const token = await user.generateToken();
      // console.log('token during login', token);
      // Set the token as a cookie
      res.cookie('jwtoken', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      });
  
      // Return success message
      res.json({ message: "Login successful", user: user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred during login" });
    }
  });
  
// router.get('/home',authenticate,(req,res)=>{
//   res.status(201).send(req.rootUser);
// })
export default router;