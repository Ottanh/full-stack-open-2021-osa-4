
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')




beforeEach(async () => {
  await User.deleteMany({})
  let userObj = User({
    name: "Mikko",
    username: "Mallikas",
    password: "salasana123"
  })
  await userObj.save()

  const newUser = {
    name: "Lauri",
    username: "Pekka",
    password: "skhk"
  }

  await api.post('/api/users')
    .send(newUser)

})

test('user added correctly with POST', async () => {

  const newUser = {
    name: "Lauri",
    username: "Tuomas",
    password: "skh1212k"
  }

  await api.post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/users')
  const contents = response.body.map(r => r.name)

  expect(contents).toContain('Lauri')

})

test('add user with missing password returns 400', async () => {

  const newUser = {
    name: "Lauri",
    username: "Sammakko"
  }
  
  await api.post('/api/users')
  .send(newUser)
  .expect(400)
})

test('add user with too short password returns 400', async () => {

  const newUser = {
    name: "Lauri",
    username: "Sammakko",
    password: "Sa"
  }
  
  await api.post('/api/users')
  .send(newUser)
  .expect(400)
})

test('add user with too short username returns 400', async () => {

  const newUser = {
    name: "Lauri",
    username: "Sa",
    password: "Samm"
  }
  
  await api.post('/api/users')
  .send(newUser)
  .expect(400)
})

test('add user with not unique username returns 400', async () => {

  const newUser = {
    name: "Mikko",
    username: "Mallikas",
    password: "32312313"
  }
  
  await api.post('/api/users')
  .send(newUser)
  .expect(400)
})

test('add user with no username returns 400', async () => {

  const newUser = {
    name: "Sammakko",
    password: "123123"
  }
  
  await api.post('/api/users')
  .send(newUser)
  .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})