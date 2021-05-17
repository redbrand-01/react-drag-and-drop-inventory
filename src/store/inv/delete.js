import { ActiveItemInv } from './active_item_inv'

export const DeleteItem = (id, items) => { // удаление обьекта
    const fetchData = []
    const itemsNew = []

    items.forEach(v => {
        if(v.id !== id) {
            itemsNew.push(v)
        } else {
            fetchData.push(v)
        }
    });
    
    const result = ActiveItemInv(itemsNew)

    return { items: itemsNew, activeAll: result.active, fetchData }
}