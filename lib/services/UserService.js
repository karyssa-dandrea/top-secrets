const bcryptjs = require('bcryptjs');
const bcrypt = require('bcryptjs/dist/bcrypt');
// const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = class UserService {
  static async create({ firstName, lastName, email, password }) {
    const passwordHash = await bcryptjs.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );

    const user = await User.insert({
      firstName,
      lastName,
      email,
      passwordHash,
    });

    return user;
  }

  static async logIn({ email, password }) {
    const user = await User.getByEmail(email);

    if (!user) throw new Error('Email does not have an account');
    const passwordsMatch = bcrypt.compareSync(password, user.passwordHash);
    if (!passwordsMatch) throw new Error('invalid email/password');

    return user;
  }
};
