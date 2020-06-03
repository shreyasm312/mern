import dotEnv from 'dotenv';
import * as pkg from '../../package.json';
dotEnv.config();
const config = {
  nodeEnv: process.env.NODE_ENV ? process.env.NODE_ENV : 'production',
  secrets: {
    jwt: process.env.JWT_SECRET,
    jwtExp: 60,
  },
  app: {
    title: pkg.name,
    version: pkg.version,
    description: pkg.description,
    url: 'http://localhost:' + process.env.PORT + '/',
    contactEmail: 'shreyasm312@gmail.com',
  },
  port: Number(process.env.PORT),
  logging: {
    consoleLevel: 'debug',
  },
  db: {
    uri: process.env.MONGO_URI,
  },  
};

export default config;
