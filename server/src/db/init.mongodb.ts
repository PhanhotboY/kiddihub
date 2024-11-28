import os from 'os';
import mongoose from 'mongoose';

import { mongodbConfig } from '../configs/config.mongodb';
import { InternalServerError } from '../api/core/errors';

const { dbHost, dbName, dbPort, dbUser, dbPwd } = mongodbConfig;

//Using Singleton pattern to init mongodb
class MongoDB {
  static instance: MongoDB;
  retryCount: number = 0;

  constructor() {
    this.handleConnectionEvent();
  }

  async connect(type?: string) {
    if (process.env.NODE_ENV === 'development') {
      mongoose.set('debug', true);
      mongoose.set('debug', { color: true });
    }

    console.log('Retrying to connect to MongoDB...', this.retryCount);
    this.retryCount++;
    await mongoose
      .connect(`mongodb://${dbUser}:${dbPwd}@${dbHost}:${dbPort}`, {
        connectTimeoutMS: 1000,
        serverSelectionTimeoutMS: 2000,
        dbName,
      })
      .catch(() => {});
    // const connectWithRetry = async function () {
    //   try {
    //     return await mongoose.connect(
    //       `mongodb://${dbUser}:${dbPwd}@${dbHost}:${dbPort}`
    //     );
    //   } catch (error) {
    //     if (retryCount < 10) {
    //       console.error(
    //         'Failed to connect to mongo on startup - retrying in 5 sec',
    //         error
    //       );
    //       setTimeout(connectWithRetry, 5000);
    //       return retryCount++;
    //     }
    //     throw new InternalServerError('Error connecting to MongoDB');
    //   }
    // };
    // await connectWithRetry();
  }

  async disconnect(type?: string) {
    await mongoose.disconnect().finally(() => {
      console.log('MongoDB disconnected');
    });
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new MongoDB();
    }

    return this.instance;
  }

  handleConnectionEvent() {
    mongoose.connection.on('error', async (e) => {
      console.log('MongoDB connection error');
      if (this.retryCount > 10) {
        throw new InternalServerError('Error connecting to MongoDB' + e);
      }
      await this.connect('mongodb');
    });

    // @ts-ignore
    mongoose.connection.on('connecting', () => {
      console.log('Connecting to MongoDB...');
    });

    // @ts-ignore
    mongoose.connection.on('connected', () => {
      console.log('MongoDB connected');
      this.retryCount = 0;
      this.logStatus();
    });

    // @ts-ignore
    mongoose.connection.on('close', () => {
      console.log('MongoDB connection closed');
      this.retryCount = 0;
    });
  }

  logStatus() {
    const numConnections = mongoose.connections.length;
    const numCores = os.cpus().length;
    const mem = process.memoryUsage().rss;
    const maxConnection = numCores * 5;

    if (numConnections === maxConnection) {
      console.log('Connection overload detected!');
    }

    console.log('Active connections::::', numConnections);
    console.log('Memory usage::::', mem / 1024 / 1024, 'MB');
  }
}

export const mongodbInstance = MongoDB.getInstance();
