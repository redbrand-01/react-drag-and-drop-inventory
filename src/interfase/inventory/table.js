import { setting } from '../setting'
import { Cell } from './cell'

export const inventoory = () => {
    const squares = []

    for (let i = 0; i < setting.fieldH; i++) {
        const td = []

        for (let j = 0; j < setting.fieldW; j++) {
            td.push(Cell)
        }
        squares.push(td)
    }

    return squares
}