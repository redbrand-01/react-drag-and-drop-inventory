import { IndexPosition } from './index_position'
import { checkInItem, CheckCharacterItem, CheckInventoryItem } from './check'
import { ActiveItemInv } from './active_item_inv'
import { copyObj } from './funk'
import { Inventory,  Character, Active } from '../setting'

export const ItemNewPosition = (action, items, position) => {

    const fetchData = []
 
    const is = action.item
    const cell = action.cell
    const index = action.index

    if(cell === Inventory) { // инвентарь
        const result = CheckInventoryItem(is, items, index) // возращает false или ячейку на которую заменять будем

        if(result === false) { // пустая ячейка
            const { sq } = IndexPosition(index, position)

            const cellIs = ActiveItemInv([{ // получаем ячейки которые будем занимать
                width: is.width,
                height: is.height,
                sq: sq,
                cell: Inventory
            }])
            
            // если не из инвенторя сморим заняты ли ячейка
            const cellIn = ActiveItemInv(sort(items, isCharacter(is, index))) // получаем активные ячейки без начальных ячейки инвенторя
        
            const statusIn = checkInItem(cellIs.active, cellIn.active, { // проверка итема на наложение друг на друга и границы
                width: is.width,
                height: is.height,
                sq: sq
            })

            if(statusIn) {
                const activeAll = cellIn.active.concat(cellIs.active).sort() // новые активные ячейки

                items.forEach(v => {
                    if(v.id === is.id) {
                        v.sq = sq
                        v.cell = Inventory
                        fetchData.push(v)
                    }
                })
                
                return {activeAll, items, fetchData}
            }
        } else { // замена ячейки с активным итемом
            const copyIs = copyObj(is)
            const copyIn = copyObj(result)

            items.forEach(v => {
                if(v.id === copyIn.id) {
                    v.cell = copyIs.cell
                    v.sq = copyIs.sq
                    fetchData.push(v)
                }
                if(v.id === copyIs.id) {
                    v.cell = copyIn.cell
                    v.sq = copyIn.sq
                    fetchData.push(v)
                }
            })

            const activeAll = ActiveItemInv(items)

            return { activeAll: activeAll.active, items, fetchData}
        }
    }

    if (Character.includes(cell) ||  cell === Active.cell) { // персонаж
     
        const result = CheckCharacterItem(is, items, cell, index)
        if(result === "empty") { // если пустая ячейка персонажа
         
            items.forEach(v => {
                if(v.id === is.id) {
                    is.cell = cell
                    is.sq = index
                    fetchData.push(v)
                }
            })

            
            const activeAll = ActiveItemInv(items)

            return { activeAll: activeAll.active, items, fetchData}
        }

        if(result === "occupied") { // если занята ячейка персонажа
            const copyIs = copyObj(is)

            items.forEach(v => {
                if(v.cell === cell && v.sq === index) {
                    v.cell = copyIs.cell
                    v.sq = copyIs.sq
                    fetchData.push(v)
                }
                if(v.id === is.id) {
                    v.cell = cell
                    v.sq = index
                    fetchData.push(v)
                }
            })

            
            const activeAll = ActiveItemInv(items)

            return { activeAll: activeAll.active, items, fetchData}
        }
    }

}

const isCharacter = (is, index) => {  // проверяет откуда ячейка

    if(is.cell === Inventory) { // если из инвенторя то просто возращает
        return is
    } else {
        let clone = {}

        for (let key in is) {
            clone[key] = is[key];
        }
        clone.sq = index // заменяем индекс куда хоти мкласть ячейку
        
        return clone
    }
}

const sort = (items, is) => { // получить итемы без итема которого кладем
    const itemsNew = []

    items.forEach(v => {
        // eslint-disable-next-line
        if(v.id !== is.id) itemsNew.push(v)
    });

    return itemsNew
}