const { User } = require('../models/user')

module.exports = {
  async listUserAsync(req, res, next) {
    try {
      const users = await User.find({})
      res.send(users)
    } catch (err) {
      res.send({ error: err.message, message: 'Could not load all the users' })
    }
  },
  async getUserAsync(req, res, next) {
    const { username, name, surname } = req.body
    const userId = req.params.id

    const query = {
      $or: [{ _id: userId }, username, name, surname],
    }
    User.find(query, (err, foundUsers) => {
      if (err) {
        res.send({ error: err.message, message: 'Error fetching users' })
      }
      if (foundUsers) {
        res.status(200).send(foundUsers)
      } else {
        res.send({ error: 'no products found' })
      }
    }).sort({ createdAt: -1 })
  },

  async editUserAsync(req, res, next) {
    const userId = req.params.id
    const itemsToEdit = req.body
  },
}