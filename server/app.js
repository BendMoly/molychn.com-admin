const Koa = require('koa')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const server = require('koa-static')
const path = require('path')
const app = new Koa()
app.use(bodyParser())
app.use(cors())
app.use(async (ctx, next) => {
  await next()
})

app.use(server(path.join(__dirname, './public')))

app.listen(3000, '0.0.0.0', () => {
  console.info('admin running at port 3000')
})
