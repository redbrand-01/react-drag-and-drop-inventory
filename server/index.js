import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import * as path from 'path'

import route from './route.js'

const app = express()
app.use(express.json({ extended: false }));
app.use(morgan("dev"));

app.use(cors());

const root = path.resolve("build");
app.use(express.static(root));
app.use('/api', route)

app.get("*", (req, res) => {
    res.sendFile("index.html", { root });
});

const PORT = 4000

app.listen(PORT, () => {
    console.log(`сервер запущен на порте: ${PORT}`)
})