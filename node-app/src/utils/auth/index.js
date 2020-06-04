import httpStatusCodes from 'http-status-codes';
import * as jwt from 'jsonwebtoken';
import config from '../../config';

export const newToken = (user) => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp,
  });
};

export const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });

export const protect = async (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res
      .status(httpStatusCodes.UNAUTHORIZED)
      .json({ message: "You don't have access to this resource" })
      .end();
  }
  const token = bearer.split('Bearer ')[1].trim();
  let payload;
  try {
    payload = await verifyToken(token);
  } catch (e) {
    return res
      .status(httpStatusCodes.UNAUTHORIZED)
      .json({ message: "You don't have access to this resource" })
      .end();
  }
  const { id, role } = payload;
  req.user = { id, role };
  next();
};
