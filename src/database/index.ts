import * as mongoose from 'mongoose';
import config from './config';

export const connectDatabase = () =>
  new Promise(async (resolve, reject) => {
    try {
      await mongoose.connect(config.db_url, resolve);
    } catch (e) {
      reject(e);
    }
  });
