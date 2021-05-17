import { Active, Character, setting, Inventory } from '../setting'
import { ActiveItemInv } from './active_item_inv'
import { checkInItem } from './check'
import { copyObj } from './funk'

export const Usability = (item, items, active, char) => {
    const fetchData = []
    const newItems = []
    let newActive = false

    if(item.param.item === Active.cell) { // юзабилити типа - еликсиры

        items.forEach(v => {
            if(v.id === item.id) {
                v.param.quantity = v.param.quantity - 1
                if(v.param.quantity > 0) {
                    newItems.push(v)
                    newActive = active
                }
            } else {
                newItems.push(v)
            }
        });
        
        if(newActive === false) {
            const res = ActiveItemInv(newItems)
            newActive = res.active
        }

        fetchData.push(newActive)
     
        return { items: newItems, activeAll: newActive, fetchData}
    }

    if(Character.includes(item.param.item)) { // юзабилити типа - снаряжения

        const cell = item.param.item // ячейка куда класть итем

        const chrckCell = checkCellChar(char[cell], items, item)

        if(chrckCell.cell === false && chrckCell.status === false) { // надевание итема
            items.forEach(v => {
                if(v.id === item.id) {

                    v.cell = char[cell].cell
                    v.sq = chrckCell.index
                    fetchData.push(v)
                }
            })
            const res = ActiveItemInv(items)
            
            return { items, activeAll: res.active, fetchData }
        } 
        
        if(!!chrckCell.cell === true && chrckCell.status === false) { //замена ячейки
            const cellIn = chrckCell.cell 

            const copyIn = copyObj(cellIn) 
            const copyIs = copyObj(item) 

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

            return { items, activeAll: active, fetchData }
        }

        if(chrckCell.status === true) { // снятие ячейки в инвентарь
            const activeCell = checkActive(item, active)
            if(activeCell) {
                const sq = activeCell[0]
                items.forEach(v => {
                    if(item.id === v.id) {
                        v.cell = Inventory
                        v.sq = sq
                        fetchData.push(v)
                    }
                })

                const activeNew = active.concat(activeCell)

                return { items, activeAll: activeNew, fetchData }
            }
        }
    }
}

const checkCellChar = (char, items, item) => {

    let status = false // нуден для проверкидля снятия итема с персонажа

    let cell = []
    let index = 0

    const maxCell = char.cellActive

    for(let i = 0; i < maxCell; i++) {
        // eslint-disable-next-line
        items.forEach(v => {
            if(v.cell === char.cell && i === v.sq) { // проверка  на пустую ячейку персонажа
                cell.push(v)
                index = v.sq
            }
 
            if(v.cell === char.cell & item.sq === v.sq && item.id === v.id) { // проверка на то что снимаем итем
                status = true
            }
        })
    }
    
    if(cell.length === 0) { // пучтые ячейки
        cell = false
    } else {
        if(cell.length < maxCell) { // проверка на другую пустую ячейку пермонажа
         
            const indexs = []
            cell.forEach(v => {
                indexs.push(v.sq)
            })

            for(let i = 0; i <  maxCell; i++) {
                if(indexs.includes(i) === false) {
                    index = i
                    break
                }
            }

            cell = false
        }
    
        if(cell.length === maxCell) { // проверка на другую пустую ячейку пермонажа
            cell = cell[0]
            index = 0
        }
    }

    return { cell, index, status }
}

const checkActive = (item, active) => { // нахождение ячеек которые будем занимать

    const field = setting.fieldW * setting.fieldH

    let index = false

    for(let i = 0; i < field; i++) {

        if(active.includes(i) === false) {
            const cellIn = ActiveItemInv([{ // получаем ячейки которые будем занимать
                width: item.width,
                height: item.height,
                sq: i,
                cell: Inventory
            }])

            let status = true

            const statusIn = checkInItem(cellIn.active, active, { // проверка на границы
                width: item.width,
                height: item.height,
                sq: i,
                cell: Inventory
            })

            if(statusIn) {
                cellIn.active.forEach(v => {
                    if(active.includes(v)) status = false
                })
    
                if(status) {
                    index = cellIn
                }
            }
        }

        if(index) break
    }

    return index.active
}