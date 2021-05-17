import { Inventory } from '../../setting'

export const sort = (act, items, index) => {
    const active = act.includes(index)
    let item = false

    items.forEach(v => {
        if(v.sq === index && v.cell === Inventory) item = v
    });

    return {active, item}
}