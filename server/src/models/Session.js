module.exports = (sequelize, DataTypes) => {
  const Sessions = sequelize.define('Sessions', {
    session_id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    ip_address: DataTypes.STRING,
    user_agent: DataTypes.STRING,
    last_activity: DataTypes.INTEGER,
    user_data: DataTypes.TEXT
  })

  return Sessions
}
