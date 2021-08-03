
const blogsRoputer = require('express').Router()
const Blog = require('../models/blog')


blogsRoputer.get('/api/blogs', async (request, response) => {


  const blogsResponse = await Blog.find({})
  response.json(blogsResponse)
})

blogsRoputer.post('/api/blogs', async (request, response) => {
  const blog = new Blog(request.body)

  if(!blog.title || !blog.url) {
    return response.status(400).json({
      error: 'title or url missing'
    })
  }

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

module.exports = blogsRoputer