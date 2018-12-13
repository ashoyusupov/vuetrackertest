const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config/config')
const db = {}

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
)

fs
  .readdirSync(__dirname)
  .filter((file) =>
    file !== 'index.js'
  )
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

db.sequelize = sequelize
db.Sequelize = Sequelize

db.Groups = require('../models/Groups')(sequelize, Sequelize)
db.UsersGroups = require('../models/UsersGroups')(sequelize, Sequelize)

db.UsersGroups.belongsTo(db.Groups, { foreignKey: 'group_id', targetKey: 'id' })
db.Groups.hasMany(db.UsersGroups, { foreignKey: 'group_id', targetKey: 'id' })
module.exports = db
