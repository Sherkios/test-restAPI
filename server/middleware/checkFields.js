// const db = require('../db/knexfile');

module.exports = async function (req, res, next) {
  if (req.method === 'OPTIONS') {
    next();
    return;
  }

  try {
    const name = req.body.name,
      email = req.body.email,
      password = req.body.password,
      stringData = [];

    if (name) {
      if (!(typeof name === 'string')) {
        stringData.push('Имя');
      }
    }
    if (password) {
      if (!(typeof password === 'string')) {
        stringData.push('Пароль');
      }
    }
    if (email) {
      if (!(typeof email === 'string')) {
        stringData.push('Почта');
      }
    }

    if (stringData.length !== 0) {
      let output = stringData.join(', ');

      return res.status(400).json({
        message: `Необходимо передать в виде строки данные из следующих полей: ${output}`,
        fields: stringData,
      });
    }

    next();
  } catch (e) {
    return res.status(404).json({
      message: 'Что-то пошло не так, попробуйте позже',
      error: e,
    });
  }
};
