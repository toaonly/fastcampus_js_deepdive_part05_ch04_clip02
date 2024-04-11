import jsonServer from 'json-server'

const server = jsonServer.create()
const router = jsonServer.router('db/db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)

server.post('/user/signin', (req, res) => {
  let resData = { status: 201, result: true }

  if (!req.body) {
    resData = { status: 404, result: false }
  } else {
    const { id, password } = req.body
    const users = router.db.getState().users
    const user = users.find(user => user.id === id && user.password === password)

    resData = { status: user ? 201 : 401, result: user ? true : false }
  }

  res.status(resData.status).json({ ressult: resData.result })
})

server.use(router)

server.listen(3000, () => {
  console.log(`\nRunning a server on localhost:3000\n`)
})
