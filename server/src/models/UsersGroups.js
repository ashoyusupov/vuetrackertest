module.exports = (sequelize, DataTypes) => {
  const UsersGroups = sequelize.define('UsersGroups', {
    user_id: {
      type: DataTypes.INTEGER,
      unique: true
    },
    group_id: {
      type: DataTypes.INTEGER
    }
  })

  return UsersGroups
}
