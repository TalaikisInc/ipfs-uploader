const express = require('express')
const path = require('path')
const compression = require('compression');
const app = express()

app.use(compression())
app.use(express.static(path.join(__dirname, 'build')))

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

const PORT = process.env.PORT ? process.env.PORT : 3010
app.listen(PORT, '0.0.0.0', (err) => {
  if (err) {
    console.log(err)
  }
  console.info(`==> listening on http://localhost:${PORT}.`)
})
