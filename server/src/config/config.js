module.exports = {
  port: process.env.PORT || 8087,
  db: {
    database: process.env.DB_NAME || 'netperform',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'netproduct25',
    options: {
      dialect: 'mysql',
      host: process.env.HOST || 'localhost'/* ,
      storage: './tabtracker.sqlite' */
    }
  },
  authentication: {
    jwtSecrect: process.env.JWT_SECRECT || 'secrect'
  }
}
