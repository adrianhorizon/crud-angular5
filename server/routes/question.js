import express from 'express'

const app = express.Router()

// el middleware llama una const la cual podemos reutilizar
const currentUser = {
  firstName: 'Adrian',
  lastName: 'Caminos',
  email: 'camilod568@gmail.com',
  password: 'luna4568'
}

function questionMiddleware(req, rex, next) {
  // busca por el id
  const { id } = req.params
  // busca en la preguntas cuyo id se igual
  req.question = questions.find(({ _id }) => _id === +id) 
  // otra forma de enontrar en question id questions.find(question => question._id === +id)
  // const q = questions.find(({ _id }) => _id === +id)
  next()
}

function userMiddleware(req, rex, next) {
    req.user = currentUser
    next()
  }

const question = {
  _id: 1,
  title: '¿Como reutilizo un componente en android?',
  description: 'Miren esta es mi pregunta',
  createdAt: new Date(),
  icon: 'devicon-android-plain colored',
  answers: [],
  user: {
    firstName: 'Adrian',
    lastName: 'Caminos',
    email: 'camilod568@gmail.com',
    password: 'luna4568'
  }
}

// pregunta repetida 10 veces en este array
const questions = new Array(10).fill(question)

// cuando acceda a api/question devolvemos array de preguntas recibe req y res
app.get('/', (req, res) => res.status(200).json(questions))

// cuando acceda api/question/:id
app.get('/:id', questionMiddleware, (req, res) => {
  res.status(200).json(req.question)
})

// cuando envia POST api/question
app.post('/', userMiddleware, (req, res) => {
  const question = req.body
  question._id = +new Date()
  question.user = req.user
  question.createdAt = new Date()
  question.answers = []
  questions.push(question)
  res.status(201).json(question)
})
// enviar datos de la respuesta y seteamos desde el id y cliente
app.post('/:id/answers', questionMiddleware, userMiddleware, (req, res) => {
    const answer = req.body
    const q = req.question
    answer.createdAt = new Date()
    answer.user = req.user
    // hacemos un push
    q.answers.push(answer) 
    // enviamos las respuestas a los clientes
    res.status(201).json(answer)
})

export default app
