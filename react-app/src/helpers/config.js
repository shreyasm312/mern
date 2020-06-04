import dotEnv from 'dotenv';
dotEnv.config();

export const config = {
  apiEndpoint: process.env.REACT_API_ENDPOINT || 'http://localhost:7001',
};
