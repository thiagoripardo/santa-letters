import mongoose, { Mongoose } from 'mongoose';

let cachedDb: Mongoose;

export default function mongooseConnetion() {
  if (cachedDb && cachedDb.connection.readyState) {
    return Promise.resolve(cachedDb);
  }
  
  return mongoose.connect(`${process.env.MONGODB_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    user: `${process.env.MONGODB_USER}`,
    pass: `${process.env.MONGODB_PASSWORD}`,
    dbName: `${process.env.MONGODB_DATABASE_NAME}`,
    // bufferCommands: false,
    // bufferMaxEntries: 0,
  }).then((client: Mongoose) => { cachedDb = client; return cachedDb; });
}