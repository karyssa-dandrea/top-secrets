const { Router } = require('express');
const User = require('../models/User');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const user = await UserService.create(req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
});
