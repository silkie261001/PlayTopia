const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const postRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log({ username, email, password });

    console.log('user register request came');

    //check if user exists
    // const userExists = await User.exists({ mail: mail.toLowerCase() });

    // if (userExists) {
    //   return res.status(409).send('This Email already exists.');
    // }

    // encrypt password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // create user document and save in database
    const user = await User.create({
      username,
      email: email,
      password: encryptedPassword,
    });

    // create JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        email: email,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: '24h',
      }
    );

    res.status(201).json({
      userDetails: {
        email: user.email,
        token: token,
        username: user.username,
      },
    });
  } catch (err) {
    // catch (err) {
    //   return res.status(500).send('Error occured. Please try again');
    // }
    console.log('register fail =>', err);
    return res.status(400).send('error, try again');
  }
};

module.exports = postRegister;
