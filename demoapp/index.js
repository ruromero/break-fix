const express = require('express')
const app = express()

const PORT = process.env.PORT || 8080

app.get('/', (req, res) => res.send('Hello Break & Fix!'))

app.listen(PORT, () => console.log('Demo application listening on port %d!', PORT))
