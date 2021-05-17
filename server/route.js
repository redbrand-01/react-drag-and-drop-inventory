import * as express from 'express'
import multer from 'multer'

import { gettable } from './callback/gettable.js'
import { updateTable } from './callback/updateTable.js'
import { deleteTable } from './callback/deleteTable.js'

const upload = multer()
const route = express.Router()

route.get("/gettable", upload.none(), gettable)
route.post("/updatetable", upload.none(), updateTable)
route.post("/deletetable", upload.none(), deleteTable)

export default route