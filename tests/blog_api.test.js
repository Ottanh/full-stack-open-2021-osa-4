
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    likes: 7,
    url: "www.sammakko.fi"
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "www.lepakko.fi"
  }
  
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})



test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(2)
})

test('blogs identified by id', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})

test('blog added with POST', async () => {

  const newBlog = {
    title: "First class tests",
    author: "Robert C. Martin",
    likes: 10,
    url: "www.lammas.fi"
  }

  await api.post('/api/blogs')
  .send(newBlog)
  .expect(201)
  .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r.title)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(contents).toContain(
    'First class tests'
  )
})

test('trying to add blgo with missing title and url returns 400', async () => {

  const newBlog = {
    author: "Robert C. Martin",
    likes: 10
  }

  await api.post('/api/blogs')
  .send(newBlog)
  .expect(400)
})

test('if likes has no value then there is 0 likes', async () =>{
  const response = await api.get('/api/blogs')
  expect(response.body[1].likes).toBe(0)
})

afterAll(() => {
  mongoose.connection.close()
})