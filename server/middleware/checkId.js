const db = require('../db/knexfile');

module.exports = async function (req, res, next) {
  if (req.method === 'OPTIONS') {
    next();
    return;
  }

  try {
    let user = await db('users').where({ id: req.params.id });
    if (user.length === 0) {
      return res.status(404).json({ message: 'Пользователя с таким id нет' });
    }
    next();
  } catch (e) {
    return res.status(404).json({
      message: 'Что-то пошло не так, попробуйте позже',
      error: e,
    });
  }
};
