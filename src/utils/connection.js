import mongoose from "mongoose";
const { MONGOUSERNAME, MONGOUSERPASSWORD } = process.env;

const connecttionStr = `mongodb+srv://${MONGOUSERNAME}:${MONGOUSERPASSWORD}@cluster0.acvase5.mongodb.net/foodapp
?retryWrites=true&w=majority&appName=Cluster0`;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { con: null, promise: null };
}

const dbConnect = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  // If a connection does not exist, we check if a promise is already in progress. If a promise is already in progress, we wait for it to resolve to get the connection
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(connecttionStr, opts).then((mongoose) => {
      console.log("db connected successfully");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
  return cached.conn;
};

export default dbConnect;
