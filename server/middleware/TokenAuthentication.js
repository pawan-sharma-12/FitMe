import User from '../Database/Models/User/User.js'
import jwt from "jsonwebtoken"

const authenticate = async(req,res,next) => {
  try {
    const token = req.cookies.jwtoken;
    console.log('token is ' ,token);
    // const verifyToken = jwt.verify(token,process.env.SECRET_KEY)
    // console.log('the value in *******************\n' + verifyToken);
    // const rootUser = User.findOne({_id:verifyToken._id,"tokens.token":token});
    // if(!rootUser){throw new Error('user Not Found')};
    // req.token = token;
    // req.rootUser = rootUser;
    // req.userId = rootUser._id;
    next();
  } catch (err) {
    res.status(401).send('unauthorized! token not provided')
    // console.log('error is ',err);
  }

}

export default authenticate