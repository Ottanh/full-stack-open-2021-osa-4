
const listHelper = require('../utils/lista_apustaja')

var _ = require('lodash')



test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})


describe('total likes', () => {

  const blogs = [
    {
      title: "React patterns",
      author: "Michael Chan",
      likes: 7
    },
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 5,
    },
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    },
    {
      title: "First class tests",
      author: "Robert C. Martin",
      likes: 10,

    }
  ]


  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes([blogs[1]])
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(34)
  })

})


describe('favorite', () => {

  const blogs = [
    {
      title: "React patterns",
      author: "Michael Chan",
      likes: 7
    },
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 5,
    },
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    },
    {
      title: "First class tests",
      author: "Robert C. Martin",
      likes: 10,

    }
  ]

  test('favoriteBlog', () => {

    const result = listHelper.favoriteBlog(blogs)

    const expected = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    }

    expect(result).toEqual(expected)

  })

  test('totalBlogs', () => {

    const result = listHelper.totalBlogs(blogs)

    const expected = {
      author: "Edsger W. Dijkstra",
      blogs: 2
    }

    expect(result).toEqual(expected)
  })

  test('mostLikes', () => {

    const result = listHelper.mostLikes(blogs)

    const expected = {
      author: 'Edsger W. Dijkstra',
      likes: 17
    }

    expect(result).toEqual(expected)
  })


})

