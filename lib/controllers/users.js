const { Router } = require('express');

const UserService = require('../services/UserService');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const user = await UserService.create(req.body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  })

  .post('/session', async (req, res, next) => {
    try {
      const user = await UserService.logIn(req.body);
      res
        .cookie(process.env.COOKIE_NAME, user.authToken())
        .send({ message: 'Login successful!', user });
    } catch (error) {
      next(error);
    }
  });
