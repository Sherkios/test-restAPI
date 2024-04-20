const knexConfig = require('.././db/knexfile');
const knex = require('knex')(knexConfig['development'])

module.exports = async function (req, res, next) {
  if (req.method === "OPTIONS") {
    next()
  }

  try {
    let error = false;
    await knex('users')
      .where({ id: req.params.id })
      .then((data) => {
        if (data.length == 0) {
          error = true;
        }
      });
    if (error) {
      return res.status(404).json({ message: "Пользователя с таким id нет" });
    }
    next()

  } catch (e) {
    return res.status(404).json({
      message: "Что-то пошло не так, попробуйте позже",
      error: e
    })
  }
}