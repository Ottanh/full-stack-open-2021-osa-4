
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')
const userExtractor = middleware.userExtractor





blogsRouter.get('/api/blogs', async (request, response) => {

  const blogsResponse = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogsResponse)
})

blogsRouter.post('/api/blogs', userExtractor, async (request, response) => {
  const blog = new Blog(request.body)

  const user = request.user


  if(!blog.title || !blog.url) {
    return response.status(400).json({
      error: 'title or url missing'
    })
  }

  blog.user = user._id
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/api/blogs/:id', userExtractor, async (request, response) => {

  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if(!(blog.user.toString() == user.id)){
    return response.status(401).json({ error: 'wrong user' })
  }

  await Blog.deleteOne(blog)
  response.status(204).end()
})


blogsRouter.get('/api/blogs/:id', async (request, response, next) => {
  try{
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog.toJSON())
    } else {
      response.status(404).end()
    }
  } catch(exception) {
    next(exception)
  }
})


blogsRouter.put('/api/blogs/:id', async (request, response, next) => {
  const body = request.body

  const blog = await Blog.findById(request.params.id)
  blog.likes = request.body.likes

  console.log(blog.toJSON())
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .populate('user', { username: 1, name: 1 })
  response.json(updatedBlog)
  
})

module.exports = blogsRouter