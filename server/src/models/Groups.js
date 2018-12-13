module.exports = (sequelize, DataTypes) => {
  const Groups = sequelize.define('Groups', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    descr: DataTypes.TEXT,
    permissions: DataTypes.TEXT,
    admin_users: DataTypes.INTEGER,
    default: DataTypes.INTEGER
  })

  return Groups
}
