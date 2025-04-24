import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import { CustomError } from './app/utils/CustomError';

// 'Medigo' server is running
const server = async () => {
  try {
    await mongoose.connect(config.database_uri as string);

    app.listen(config.port, () => {
      console.log(`Medigo App is listening port at ${config.port}`);
    });
  } catch (error : any) {
    throw new CustomError(400, `${error.message}`);
  }
};

server();
