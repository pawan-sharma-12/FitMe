import express from 'express';
import GetYogaPoses from '../../Machine Learning/YogaPoseModel/GetYogaPoses.js'
const router = express.Router();
import Session from '../../Database/Models/Session/Session.js';
import User from '../../Database/Models/User/User.js';
import jwt from 'jsonwebtoken';

const app = express();

// GET /recommendations endpoint
router.post('/recommendations', async (req, res) => {
  // Retrieve the features from the query parameters
  const { features } = req.body;

  const yogaPoses = await GetYogaPoses(features);
  console.log('yoga poses in /recom... ',yogaPoses);
  // Set the path to the get_recommendations.py file
  res.status(201).json({ 'yoga_poses': yogaPoses });
});
router.post('/savesession', async (req, res) => {
  try {
    const yoga_poses = req.body.yoga_poses;
    // const posesObject = JSON.parse(yoga_poses);
    // const stringPoses = yoga_poses.map((pose) => pose.toString());
    // console.log('datatype of ',typeof posesObject);


    // Retrieve user email from cookies or authentication middleware
    const jwtoken = req.cookies.jwtoken; // Assuming the token is stored in the 'jwtoken' cookie
    console.log('yoga_poses', yoga_poses );

    //  return res.status(201).json({ message: jwtoken });

    // Decode the token to extract the user's email
    const decodedToken = jwt.verify(jwtoken, process.env.SECRET_KEY);
    const id = decodedToken._id;

    // console.log('decodectoken',decodedToken);

    // Find the user in the database using the email
    const user = await User.findOne({ _id: id });


    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new session instance
    const session = {
      yoga_poses: yoga_poses, // Use the yoga_poses array directly
      created_at: new Date(),
    };
    console.log('session ', session);
    // Add the session to the user's sessions array
    await user.sessions.push(session);

    // Save the user to update the sessions array
    await user.save();

    res.status(200).json({ message: 'Session saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to save session' });
  }
});

router.get('/recentsession',async (req,res)=>{
  try {

    const jwtoken = req.cookies.jwtoken;
    const decodedToken = jwt.verify(jwtoken, process.env.SECRET_KEY);
    const id = decodedToken._id;
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const recent_session = await user.sessions[user.sessions.length - 1];
    res.status(201).json(recent_session)
  } catch (error) {
    res.status(500).json({ message: error });
  }
})

export default router;
