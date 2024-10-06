import { MongoClient, MongoClientOptions } from 'mongodb';
import mongoose, { Mongoose } from 'mongoose';

// MongoDB URI from environment variables
const uri: string = process.env.MONGODB_URI || '';

if (!uri) {
  throw new Error('Please add your MongoDB URI to the environment variables');
}

let clientPromise: Promise<MongoClient>;

export const connectMongo = async (): Promise<MongoClient> => {
  if (!uri) {
    return new MongoClient("");
  }
  try {
    if (mongoose.connection.readyState >= 1) {
      return new MongoClient(uri);
    }

    const mongooseConnection= await mongoose.connect(uri);
    const client = mongooseConnection.connection.getClient();
    return client as MongoClient ;

  } catch (err) {
    console.error('Error connecting to MongoDB using Mongoose:', err);
    throw new Error('Failed to connect with Mongoose');
  }
};
// Persist MongoClient connection across HMR in development

if (process.env.NODE_ENV === 'development') {
  if (!(global as any)._mongoClientPromise) {
    (global as any)._mongoClientPromise = connectMongo();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  clientPromise = connectMongo();
}

export default clientPromise;