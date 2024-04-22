const db = require('.././db/knexfile');

class UserController {
  async createUser(req, res) {
    const name = req.body.name ? req.body.name : '';
    const password = req.body.password ? req.body.password : '';
    const email = req.body.email ? req.body.email : '';

    const requiredData = [];
    if (!name) {
      requiredData.push('Имя');
    }
    if (!password) {
      requiredData.push('Пароль');
    }
    if (!email) {
      requiredData.push('Почта');
    }

    if (requiredData.length !== 0) {
      let output = requiredData.join(', ');

      return res.status(400).json({
        message: `Необходимо заполнить следующие поля: ${output}`,
        fields: requiredData,
      });
    }
    db('users')
      .insert({ name, password, email })
      .then(id => {
        db('users')
          .select()
          .where({ id: id[0] })
          .then(user => {
            return res.status(201).json(user[0]);
          });
      })
      .catch(err => {
        if (err.message.includes('SQLITE_CONSTRAINT')) {
          return res.status(400).json({
            message: 'Данная почта уже зарегестрированна',
            fields: ['Почта'],
          });
        }
        return res.status(400).json({ message: err });
      });
  }

  async getUsers(req, res) {
    if (req.params.id) {
      db('users')
        .select()
        .where({ id: req.params.id })
        .then(user => {
          return res.json(user[0]);
        })
        .catch(() => {
          res.status(404).json({
            message: 'Что-то пошло не так, попробуйте позже',
          });
        });
    } else {
      db('users')
        .select()
        .then(users => {
          return res.json(users);
        })
        .catch(() => {
          return res.json({
            message: 'Что-то пошло не так, попробуйте позже',
          });
        });
    }
  }

  async updateUser(req, res) {
    if (Object.keys(req.body).length === 0) {
      return res.status(404).json({
        message: 'Необходимо ввести данные хотя бы в одно из следующих полей: Имя, Почта, Пароль',
        fields: ['Имя', 'Почта', 'Пароль'],
      });
    }
    db('users')
      .select({
        name: 'name',
        email: 'email',
        password: 'password',
      })
      .where({ id: req.params.id })
      .then(data => {
        db('users')
          .where({ id: req.params.id })
          .update(
            {
              name: req.body.name ? req.body.name : data[0].name,
              email: req.body.email ? req.body.email : data[0].email,
              password: req.body.password ? req.body.password : data[0].password,
            },
            ['id', 'name', 'email', 'password'],
          )
          .then(data => {
            return res.json(data);
          });
      })
      .catch(() => {
        res.status(404).json({ message: 'Что-то пошло не так, попробуйте позже' });
      });
  }

  async deleteUser(req, res) {
    db('users')
      .where({ id: req.params.id })
      .del()
      .then(() => {
        return res.json({ message: 'Пользователь был удален' });
      })
      .catch(() => {
        return res.status(404).json({ message: 'Что-то пошло не так, попробуйте позже' });
      });
  }
}

module.exports = new UserController();
