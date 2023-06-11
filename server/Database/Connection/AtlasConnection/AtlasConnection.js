import mongoose from 'mongoose';

let isConnectionEstablished = false;

const AtlasConnection = () => {
  if (isConnectionEstablished) {
    console.log('MongoDB connection already established');
    return;
  }

  mongoose.set('strictQuery', true);

  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      isConnectionEstablished = true;
      console.log('Connection to MongoDB Atlas is successful');
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB Atlas:', err);
    });
    return isConnectionEstablished;
};

export default AtlasConnection;
