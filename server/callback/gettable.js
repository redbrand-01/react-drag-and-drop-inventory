import { tableItem } from '../table/tableItem.js'

export const gettable = (req, res) => {
    res.status(200).json(tableItem)
}