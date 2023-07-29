const express = require('express')
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

app.use(cors())
//app.use(express.json())
app.use(express.static('build'))

let blogs = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

let users = [
  {

  }
]

let jopas = {
  "haloo": "terve",
  "katti": "maku"
}

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/blogs', (req, res) => {
  res.json(blogs)
})
app.get('/api/jopas', (req, res) => {
  res.json(jopas)
})

app.post('/api/login', async (request,response)=>{
  const {username, password} = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const user = {
    username: username,
    password: passwordHash
  }

  users = users.concat(user)

  response.json(user)

})

const generateId = () => {
  const maxId = blogs.length > 0
    ? Math.max(...blogs.map(b => b.id))
    : 0
  return maxId + 1
}

app.post('/api/blogs', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const blog = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId(),
  }

  blogs = blogs.concat(blog)

  response.json(blog)
})

app.get('/api/blogs/:id', (request, response) => {
  const id = Number(request.params.id)
  const blog = blogs.find(blog => blog.id === id)

  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }

})

app.delete('/api/blogs/:id', (request, response) => {
  const id = Number(request.params.id)
  blogs = blogs.filter(blog => blog.id !== id)

  response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})