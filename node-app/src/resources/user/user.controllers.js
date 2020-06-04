import httpStatusCodes from 'http-status-codes';
import { User } from './user.model';
import { newToken } from '../../utils/auth';

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  let errors = [];
  if (!(email && password && name)) {
    errors.push({ error: 'Please fill in all fields' });
  }

  if (password && password.length < 6) {
    errors.push({ error: 'Password should be atleast 6 characters long' });
  }

  if (errors.length > 0) {
    res.status(httpStatusCodes.BAD_REQUEST).send(errors);
    return;
  }
  try {
    const user = await User.create(req.body);
    return res.status(httpStatusCodes.CREATED).send(user);
  } catch (e) {
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send({ error: e }).end();
  }
};

export const signin = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(httpStatusCodes.BAD_REQUEST).send({ error: 'need email and password' });
  }
  const invalid = { error: 'Invalid email and password combination' };
  try {
    const user = await User.findOne({ email: req.body.email }).select('email password name').exec();
    if (!user) {
      return res.status(httpStatusCodes.NOT_FOUND).send(invalid);
    }

    const match = await user.checkPassword(req.body.password);

    if (!match) {
      return res.status(httpStatusCodes.NOT_FOUND).send(invalid);
    }
    user.loginTime = Date.now();
    const updatedUser = await user.save();
    const { _id, name, email } = updatedUser;
    const token = newToken(updatedUser);
    return res.status(httpStatusCodes.CREATED).send({ id: _id, email, name, token });
  } catch (e) {
    res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send({ error: e }).end();
  }
};

export const updateUser = async (req, res) => {
  const { name } = req.body;
  const { userId } = req.params;
  if (!(name && userId)) {
    return res
      .status(httpStatusCodes.BAD_REQUEST)
      .send({ error: 'need name or id for editing the user' });
  }
  try {
    const user = await User.findById({ _id: userId });
    if (!user) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({ message: 'Not Found' });
    } else {
      user.name = name;
      await user.save();
      return res.status(httpStatusCodes.CREATED).send({ data: 'name was updated' });
    }
  } catch (error) {
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: error });
  }
};
export const deleteUser = async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(httpStatusCodes.BAD_REQUEST).send({ error: 'need id for deleting the user' });
  }
  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    if (!user) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({ message: 'User not found' });
    }
    return res.status(httpStatusCodes.OK).json({ message: 'Deleted' });
  } catch (error) {
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: error });
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const docs = await User.find().exec();
    if (!docs) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({ message: 'Resource not found' });
    }
    return res.status(httpStatusCodes.OK).json({ data: docs });
  } catch (error) {
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: error });
  }
};
