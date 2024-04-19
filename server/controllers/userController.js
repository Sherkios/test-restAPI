

class UserController {
  async createUser(req, res) {

  }

  async getUsers(req, res) {
    res.json(
      {
        id: "1",
        name: "name",
        email: "email",
        password: "password",
      }
    );
  }

  async updateUser(req, res) {

  }

  async deleteUser(req, res) {
    
  }
  
}

module.exports = new UserController();