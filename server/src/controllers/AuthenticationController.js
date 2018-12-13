const { User, UsersGroups, Groups, Sessions } = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const uuidv5 = require('uuid/v5')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecrect, {
    expiresIn: ONE_WEEK
  })
}

function upsert (Model, values, condition) {
  return Model
    .findOne({ where: condition })
    .then(obj => {
      if (obj) {
        return obj.update(values)
      } else {
        return Model.create(values)
      }
    })
}

module.exports = {
  async getAll (req, res) {
    try {
      const groups = await Groups.findAll()
      res.send(groups)
    } catch (error) {
      res.status(500).send({
        error: 'An error has occured while trying to fetch the groups'
      })
    }
  },
  async register (req, res) {
    try {
      const user = await User.create({
        email: req.body.email,
        password: req.body.password
      })

      await UsersGroups.create({
        user_id: user.id,
        group_id: req.body.group
      })
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      console.log(err)
      res.status(400).send({
        error: 'This email has been already registered'
      })
    }
  },
  async login (req, res) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({
        where: {
          email: email
        }
      })
      if (!user) {
        return res.status(403).send({
          error: 'You have provided incorrect login information!1'
        })
      }
      const sessionId = uuidv5(req.headers['x-forwarded-for'] + ' ' + user.id || req.connection.remoteAddress + ' ' + user.id, uuidv5.URL)
      const isPasswordValid = await user.comparePassword(password)
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'You have provided incorrect login information!2'
        })
      }

      const groups = await UsersGroups.findAll({
        include: [
          {
            model: Groups
          }
        ],
        where: {
          user_id: user.id
        }
      })
      const userfiltered = {
        id: user.id,
        email: user.email,
        sessionId: sessionId
      }

      const scjw = jwtSignUser(user.toJSON())
      const userData = {
        session_id: sessionId,
        ip_address: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        user_agent: req.headers['user-agent'],
        user_id: user.id,
        email: email,
        scjw: scjw
      }

      await upsert(Sessions, {
        session_id: sessionId,
        ip_address: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        user_agent: req.headers['user-agent'],
        last_activity: Math.round((new Date()).getTime() / 1000),
        user_data: JSON.stringify(userData)
      }, { session_id: sessionId })

      res.send({
        user: userfiltered,
        group: groups[0].Group,
        token: scjw
      })
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'You have provided incorrect login information!'
      })
    }
  }
}
