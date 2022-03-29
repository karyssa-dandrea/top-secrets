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

  .post('/login', async (req, res, next) => {
    try {
      const user = await UserService.login(req.body);
      res
        .cookie(process.env.COOKIE_NAME, user.authToken())
        .send({ message: 'Login successful!', user });
    } catch (error) {
      next(error);
    }
  });
