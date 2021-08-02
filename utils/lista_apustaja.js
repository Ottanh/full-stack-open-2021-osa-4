var lodash = require('lodash')



const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {

  const summa = (sum, item) => {
    return sum + item.likes
  }

  return blogs.reduce(summa,0)

}


const favoriteBlog = (blogs) => {

  var fav = 0

  for(let i = 0; i < blogs.length; i++) {
    var likes = blogs[i].likes
    var temp_favorite = blogs[fav].likes
    if(likes > temp_favorite){
      fav = i
    }
  }

  const favBlog = {
    title: blogs[fav].title,
    author: blogs[fav].author,
    likes: blogs[fav].likes
  }

  return favBlog

}

const totalBlogs = (blogs) => {

  const mostBlogs = {
    author: '',
    blogs: 0
  }

  const authors = lodash.map(blogs, 'author')
  const count = lodash.countBy(authors)

  for(const author in count) {

    if(count[author] > mostBlogs.blogs) {
      mostBlogs.author = author
      mostBlogs.blogs = count[author]

    }
  }

  return mostBlogs

}

const mostLikes = (blogs) => {

  const mostLikes = {
    author: '',
    likes: 0
  }

  let likes = {}
  blogs.forEach(element => {
    likes[element.author] = (likes[element.author] || 0) + element.likes
  })

  for(const author in likes){
    
    if(likes[author] > mostLikes.likes) {
      mostLikes.author = author
      mostLikes.likes = likes[author]

    }
  }

  return mostLikes

}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  totalBlogs,
  mostLikes
}