
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')




usersRouter.get('/api/users', async (request, response) => {

  const usersResponse = await User.find({})
    .populate('blogs', { url: 1, title: 1, author: 1 , likes: 1})
  response.json(usersResponse)
})


usersRouter.post('/api/users', async (request, response, next) => {
  const body = request.body


  if(!Boolean(body.password)) {
    return response.status(400)
    .send({ error: 'password undefined'})
  }
  if(body.password.length <= 3) {
    return response.status(400)
    .send({ error: 'password has to be at least 3 charecters long'})
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)

})


module.exports = usersRouter