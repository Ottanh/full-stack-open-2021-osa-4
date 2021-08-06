
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/api/blogs', async (request, response) => {


  const blogsResponse = await Blog.find({})
  response.json(blogsResponse)
})

blogsRouter.post('/api/blogs', async (request, response) => {
  const blog = new Blog(request.body)

  if(!blog.title || !blog.url) {
    return response.status(400).json({
      error: 'title or url missing'
    })
  }

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/api/blogs/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
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

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
  
})

module.exports = blogsRouter