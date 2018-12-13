const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = {
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      ),
      group: Joi.required()
    }

    const { error } = Joi.validate(req.body, schema)

    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'Your email is not a valid'
          })
          break
        case 'password':
          res.status(400).send({
            error: 'Your password is not a valid'
          })
          break
        case 'group':
          res.status(400).send({
            error: 'Group must be chosen'
          })
          break
        default:
          res.status(400).send({
            error: 'Invalid registration'
          })
          break
      }
    } else {
      next()
    }
  }
}
