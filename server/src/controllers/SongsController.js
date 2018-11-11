const { Song } = require('../models')
const db = require('../models')

db.sequelize.getQueryInterface().showAllSchemas().then((tableObj) => {
  console.log('// Tables in database', '==========================')
  console.log(tableObj)
})

module.exports = {
  async index (req, res) {
    try {
      const songs = await Song.findAll({
        limit: 10
      })
      res.send(songs)
    } catch (error) {
      res.status(500).send({
        error: 'An error has occured while trying to fetch the songs'
      })
    }
  },
  async post (req, res) {
    try {
      const song = await Song.create(req.body)
      res.send(song)
    } catch (error) {
      res.status(500).send({
        error: 'An error has occured while trying to create the songs'
      })
    }
  }
}
