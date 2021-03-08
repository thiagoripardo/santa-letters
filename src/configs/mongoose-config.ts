import mongoose from 'mongoose';

const mongooseConnetion = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      user: `${process.env.MONGODB_USER}`,
      pass: `${process.env.MONGODB_PASSWORD}`,
      dbName: `${process.env.MONGODB_DATABASE_NAME}`,
      // bufferCommands: false,
      // bufferMaxEntries: 0,
    });
  } catch (err) {
    console.error(err);
  }
}

export default mongooseConnetion;