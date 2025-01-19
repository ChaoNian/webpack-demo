const express = require('express')
const app = express();

app.get('/api/useer', (req,res) => {
    res.json([
        {
            is: 1, name: 'bob'
        }
    ])
})
app.listen(3000, () => {
    '3000: 启动'
})